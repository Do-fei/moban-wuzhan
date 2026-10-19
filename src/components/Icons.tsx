interface IconProps {
  size?: number
}

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export function IconHistory({ size = 20 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M4 12a8 8 0 1 0 2.3-5.6L4 8.7" />
      <path d="M4 4v4.7h4.7" />
      <path d="M12 8v4.6l3 1.8" />
    </svg>
  )
}

export function IconClue({ size = 20 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.4 15.4 4 4" />
      <path d="M8 10.5h5M10.5 8v5" />
    </svg>
  )
}

export function IconMenu({ size = 20 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

export function IconSound({ muted = false, size = 20 }: IconProps & { muted?: boolean }) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M4 9v6h4l5 4V5L8 9H4Z" />
      {muted ? (
        <>
          <path d="m17 9 4 6M21 9l-4 6" />
        </>
      ) : (
        <>
          <path d="M16.5 8.5a5 5 0 0 1 0 7" />
          <path d="M19 6a8 8 0 0 1 0 12" />
        </>
      )}
    </svg>
  )
}

export function IconClose({ size = 20 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  )
}

export function IconSave({ size = 20 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M5 4h12l2 2v14H5Z" />
      <path d="M8 4v6h8V4M8 20v-6h8v6" />
    </svg>
  )
}

export function IconInstall({ size = 20 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M12 3v11" />
      <path d="m8 10 4 4 4-4" />
      <path d="M5 17v3h14v-3" />
    </svg>
  )
}

export function IconBook({ size = 20 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M5 4h5a3 3 0 0 1 3 3v13a3 3 0 0 0-3-3H5Z" />
      <path d="M19 4h-5a3 3 0 0 0-3 3v13a3 3 0 0 1 3-3h5Z" />
    </svg>
  )
}

export function IconSettings({ size = 20 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M19 13.5v-3l-2-.6a6 6 0 0 0-.7-1.6l1-1.8-2.1-2.1-1.8 1a6 6 0 0 0-1.6-.7L11.2 3h-3l-.6 2a6 6 0 0 0-1.6.7l-1.8-1-2.1 2.1 1 1.8a6 6 0 0 0-.7 1.6l-2 .6v3l2 .6a6 6 0 0 0 .7 1.6l-1 1.8 2.1 2.1 1.8-1a6 6 0 0 0 1.6.7l.6 2h3l.6-2a6 6 0 0 0 1.6-.7l1.8 1 2.1-2.1-1-1.8a6 6 0 0 0 .7-1.6Z" />
    </svg>
  )
}

export function IconChevron({ size = 18 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}

export function IconArrow({ size = 18 }: IconProps) {
  return (
    <svg {...base} width={size} height={size}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}
