import { useState, useEffect, useCallback } from "react";

const FINNHUB_BASE = "https://finnhub.io/api/v1";

// Fetch a stock quote from Finnhub
// symbol: e.g. "SAP" for XETRA SAP (Finnhub uses exchange-specific symbols)
async function fetchQuote(symbol, apiKey) {
  const url = `${FINNHUB_BASE}/quote?symbol=${encodeURIComponent(symbol)}&token=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  // Finnhub quote: { c: current, d: change, dp: % change, h: high, l: low, o: open, pc: prev close }
  if (data.c === 0 && data.d === 0)
    throw new Error("No data returned (invalid symbol or market closed?)");
  return data;
}

// Fetch forex rate from Finnhub
// symbol: e.g. "OANDA:EUR_BRL"
async function fetchForex(symbol, apiKey) {
  const url = `${FINNHUB_BASE}/quote?symbol=${encodeURIComponent(symbol)}&token=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = await res.json();
  if (data.c === 0) throw new Error("No data returned");
  return data;
}

/**
 * Hook to fetch and auto-refresh stock and forex quotes from Finnhub.
 * @param {string} apiKey - Finnhub API key
 * @param {number} refreshMs - Refresh interval in milliseconds (default: 60000)
 */
export function useMarketData(apiKey, refreshMs = 60000) {
  const [sap, setSap] = useState({ loading: true, error: null, data: null });
  const [eurbrl, setEurbrl] = useState({
    loading: true,
    error: null,
    data: null,
  });

  const fetchAll = useCallback(async () => {
    if (!apiKey || apiKey === "YOUR_FINNHUB_API_KEY") {
      const err = "Please set your Finnhub API key in src/config.js";
      setSap({ loading: false, error: err, data: null });
      setEurbrl({ loading: false, error: err, data: null });
      return;
    }

    // SAP on XETRA — Finnhub uses "SAP.XETRA" for European exchange listings
    // XETRA only supported for paying accounts, so we stick with USD stocks
    fetchQuote("SAP", apiKey)
      .then((data) => setSap({ loading: false, error: null, data }))
      .catch(() =>
        // Try Frankfurt (equivalent to XETRA for SAP)
        fetchQuote("SAP.F", apiKey)
          .then((data) => setSap({ loading: false, error: null, data }))
          .catch((err) =>
            setSap({ loading: false, error: err.message, data: null }),
          ),
      );
    if (false) {
      // disabled because OANDA doesnt has EUR_BRL
      fetchForex("OANDA:EUR_BRL", apiKey)
        .then((data) => setEurbrl({ loading: false, error: null, data }))
        .catch((err) =>
          setEurbrl({ loading: false, error: err.message, data: null }),
        );
    }
  }, [apiKey]);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, refreshMs);
    return () => clearInterval(interval);
  }, [fetchAll, refreshMs]);

  return { sap, eurbrl, refresh: fetchAll };
}
