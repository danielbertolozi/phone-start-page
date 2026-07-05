import StockTicker from './components/StockTicker'
import Shortcuts from './components/Shortcuts'

export default function App() {
  return (
    <div
      className="flex flex-col gap-3 p-3"
      style={{ minHeight: '100dvh', backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      {/* Stock ticker at the top */}
      <StockTicker />

      {/* Website shortcuts */}
      <Shortcuts />
    </div>
  )
}
