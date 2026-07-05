// Outline-only SVG icons for each shortcut site

function IntervalsIcon() {
  // intervals.icu — cycling/training platform. Icon: a stylized heartrate/pulse waveform
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
      <polyline points="2 12 6 12 8 5 11 19 14 9 16 14 18 12 22 12" />
    </svg>
  )
}

function GoogleIcon() {
  // Google — stylized "G" outline
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M17 12h-5v0a5 5 0 1 0 1.9-3.95" />
    </svg>
  )
}

function DuckDuckGoIcon() {
  // DuckDuckGo — duck silhouette outline
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
      {/* Body */}
      <ellipse cx="12" cy="14" rx="6" ry="5" />
      {/* Head */}
      <circle cx="16" cy="7" r="3" />
      {/* Bill */}
      <path d="M18.5 7.5 L21 8 L18.8 9" />
      {/* Eye */}
      <circle cx="17" cy="6.5" r="0.5" fill="currentColor" />
      {/* Neck connecting head to body */}
      <path d="M14 9.5 Q13 11 12 12" />
    </svg>
  )
}

function LemonIcon() {
  // lemon-manuals.la — lemon shape outline
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
      {/* Lemon shape */}
      <path d="M12 3 C7 3 4 7 4 12 C4 17 7 21 12 21 C17 21 20 17 20 12 C20 7 17 3 12 3 Z" />
      {/* Pointed ends like a lemon */}
      <path d="M12 3 C13 1.5 14 2 13.5 3" strokeLinecap="round" />
      <path d="M12 21 C11 22.5 10 22 10.5 21" strokeLinecap="round" />
      {/* Leaf */}
      <path d="M12 3 Q15 1 16 4" />
    </svg>
  )
}

const SHORTCUTS = [
  {
    label: 'Intervals',
    url: 'https://intervals.icu',
    Icon: IntervalsIcon,
  },
  {
    label: 'Google',
    url: 'https://www.google.com',
    Icon: GoogleIcon,
  },
  {
    label: 'DuckDuckGo',
    url: 'https://duckduckgo.com',
    Icon: DuckDuckGoIcon,
  },
  {
    label: 'Lemon',
    url: 'https://lemon-manuals.la',
    Icon: LemonIcon,
  },
]

export default function Shortcuts() {
  return (
    <div className="w-full grid grid-cols-4 gap-2">
      {SHORTCUTS.map(({ label, url, Icon }) => (
        <a
          key={url}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 px-1 transition-opacity active:opacity-60"
          style={{
            backgroundColor: 'rgba(0,0,0,0.12)',
            borderRadius: '4px',
            color: 'var(--color-text)',
            textDecoration: 'none',
          }}
        >
          <Icon />
          <span className="text-xs text-center leading-tight opacity-80">{label}</span>
        </a>
      ))}
    </div>
  )
}
