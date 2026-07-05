/**
 * Configuration for the phone start page.
 *
 * To get a free Finnhub API key:
 *   1. Go to https://finnhub.io/register
 *   2. Create a free account
 *   3. Copy your API key from the dashboard
 *   4. Replace 'YOUR_FINNHUB_API_KEY' below with your actual key
 */
export const FINNHUB_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY ?? 'YOUR_FINNHUB_API_KEY'

// How often to refresh market data (milliseconds). 60000 = 1 minute.
// Free tier allows 60 API calls/min, so 1min is safe for 2 symbols.
export const REFRESH_INTERVAL_MS = 60000
