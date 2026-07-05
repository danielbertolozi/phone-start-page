import { useMarketData } from '../hooks/useMarketData'
import { FINNHUB_API_KEY, REFRESH_INTERVAL_MS } from '../config'

function formatPrice(value, decimals = 2) {
  if (value == null) return '—'
  return value.toLocaleString('de-DE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

function TickerItem({ label, currency, quote }) {
  const { loading, error, data } = quote

  if (loading) {
    return (
      <div className="flex flex-col">
        <span className="text-xs opacity-60 uppercase tracking-widest">{label}</span>
        <span className="text-sm opacity-50 mt-0.5">Loading…</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <span className="text-xs opacity-60 uppercase tracking-widest">{label}</span>
        <span className="text-xs opacity-50 mt-0.5 text-red-300">Error</span>
      </div>
    )
  }

  const price = data?.c
  const change = data?.d
  const changePct = data?.dp
  const isPositive = change >= 0

  return (
    <div className="flex flex-col">
      <span className="text-xs opacity-60 uppercase tracking-widest">{label}</span>
      <div className="flex items-baseline gap-2 mt-0.5">
        <span className="text-lg font-semibold" style={{ color: 'var(--color-highlight)' }}>
          {currency}{formatPrice(price)}
        </span>
        <span
          className="text-xs font-medium"
          style={{ color: isPositive ? '#86efac' : '#fca5a5' }}
        >
          {isPositive ? '+' : ''}{formatPrice(change)} ({isPositive ? '+' : ''}{formatPrice(changePct)}%)
        </span>
      </div>
    </div>
  )
}

export default function StockTicker() {
  const { sap, eurbrl, refresh } = useMarketData(FINNHUB_API_KEY, REFRESH_INTERVAL_MS)

  return (
    <div
      className="w-full px-3 py-2 flex items-center justify-between gap-4"
      style={{
        backgroundColor: 'rgba(0,0,0,0.15)',
        borderRadius: '4px',
      }}
    >
      <TickerItem label="SAP · XETRA" currency="€" quote={sap} />
      <div style={{ width: '1px', alignSelf: 'stretch', backgroundColor: 'rgba(245,245,245,0.2)' }} />
      <TickerItem label="EUR/BRL" currency="" quote={eurbrl} />

      {/* Refresh button */}
      <button
        onClick={refresh}
        title="Refresh"
        className="ml-auto opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
        style={{ padding: '2px', background: 'none', border: 'none', color: 'var(--color-text)' }}
        aria-label="Refresh market data"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 4 23 10 17 10" />
          <polyline points="1 20 1 14 7 14" />
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
        </svg>
      </button>
    </div>
  )
}
