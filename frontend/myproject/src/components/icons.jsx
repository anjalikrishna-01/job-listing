// Minimal hand-rolled icon set — keeps the project dependency-free.
// Each icon accepts standard svg props (size, className, etc).

const base = (size) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
})

export const SearchIcon = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}><circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
)

export const MapPinIcon = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
)

export const BriefcaseIcon = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
)

export const ClockIcon = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3.5 2" /></svg>
)

export const DollarIcon = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}><line x1="12" y1="2" x2="12" y2="22" /><path d="M17 5.5c-1-1-2.5-1.5-5-1.5-3 0-5 1.3-5 3.5S8.5 11 12 11s5 1.5 5 3.5-2 3.5-5 3.5c-2.5 0-4-.5-5-1.5" /></svg>
)

export const MenuIcon = ({ size = 22, ...p }) => (
  <svg {...base(size)} {...p}><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
)

export const CloseIcon = ({ size = 22, ...p }) => (
  <svg {...base(size)} {...p}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
)

export const ChevronRightIcon = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}><polyline points="9 18 15 12 9 6" /></svg>
)

export const ArrowRightIcon = ({ size = 16, ...p }) => (
  <svg {...base(size)} {...p}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
)

export const CheckIcon = ({ size = 16, ...p }) => (
  <svg {...base(size)} {...p}><polyline points="20 6 9 17 4 12" /></svg>
)

export const BuildingIcon = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}><rect x="4" y="2" width="16" height="20" rx="1" /><line x1="9" y1="7" x2="9" y2="7.01" /><line x1="15" y1="7" x2="15" y2="7.01" /><line x1="9" y1="12" x2="9" y2="12.01" /><line x1="15" y1="12" x2="15" y2="12.01" /><line x1="9" y1="17" x2="9" y2="17.01" /><line x1="15" y1="17" x2="15" y2="17.01" /></svg>
)

export const UserIcon = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7" /></svg>
)

export const LogOutIcon = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
)

export const BookmarkIcon = ({ size = 18, ...p }) => (
  <svg {...base(size)} {...p}><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16Z" /></svg>
)
