import {
  createElement,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react"

type Page = "dashboard" | "assets" | "maintenance" | "energy" | "settings"
type IconName = "grid" | "pole" | "tool" | "chart" | "settings" | "search" | "bell" | "chevron" | "bolt" | "leaf" | "alert" | "shield" | "pin" | "more" | "filter" | "plus" | "qr" | "arrow" | "route" | "check" | "clock" | "user" | "x"

const iconPaths: Record<IconName, ReactNode> = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  pole: (
    <>
      <path d="M9 21h6M12 21V7" />
      <path d="M12 7c0-2.2 1.8-4 4-4h3v4h-7Z" />
      <path d="M17 10v1M20 10v1" />
    </>
  ),
  tool: (
    <path d="M14.7 6.3a4 4 0 0 0-5-5L12 3.6 9.6 6 7.3 3.7a4 4 0 0 0 5 5l7.4 7.4a2.1 2.1 0 0 1-3 3l-7.4-7.4" />
  ),
  chart: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-4V21a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9A1.7 1.7 0 0 0 3 14H2.8v-4H3a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1a1.7 1.7 0 0 0 1.9.3A1.7 1.7 0 0 0 10 3V2.8h4V3a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v4H21a1.7 1.7 0 0 0-1.6 1Z" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
      <path d="M10 21h4" />
    </>
  ),
  chevron: <path d="m9 18 6-6-6-6" />,
  bolt: <path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z" />,
  leaf: (
    <>
      <path d="M20 4c-7 0-12 3-12 9 0 3 2 5 5 5 6 0 7-7 7-14Z" />
      <path d="M4 21c2-5 5-8 11-11" />
    </>
  ),
  alert: (
    <>
      <path d="M10.3 3.4 2 18a2 2 0 0 0 1.7 3h16.6a2 2 0 0 0 1.7-3L13.7 3.4a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  pin: (
    <>
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1" />
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
    </>
  ),
  filter: <path d="M4 5h16M7 12h10M10 19h4" />,
  plus: <path d="M12 5v14M5 12h14" />,
  qr: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <path d="M14 14h3v3h-3zM18 18h3v3h-3zM18 14h3M14 18v3" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="5" r="3" />
      <path d="M8.5 17.5 16 7M9 5H5a2 2 0 0 0-2 2v5" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  x: <path d="m6 6 12 12M18 6 6 18" />,
}

function Icon({ name, size = 18 }: { name: IconName size?: number }) {
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {iconPaths[name]}
    </svg>
  )
}

function Button({
  children,
  className = "",
  onClick,
  ariaLabel,
  type = "button",
  disabled = false,
}: {
  children: ReactNode
  className?: string
  onClick?: () => void
  ariaLabel?: string
  type?: "button" | "submit"
  disabled?: boolean
}) {
  const handleClick =
    onClick ??
    (type === "button"
      ? () =>
          window.dispatchEvent(
            new CustomEvent("nsl-notify", {
              detail: `${ariaLabel ?? "This control"} is ready for integration`,
            }),
          )
      : undefined)
  return createElement(
    "button",
    {
      className: `button ${className}`,
      onClick: handleClick,
      "aria-label": ariaLabel,
      type,
      disabled,
    },
    children,
  )
}

function TextInput({
  ariaLabel,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  autoComplete,
}: {
  ariaLabel: string
  placeholder: string
  value?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
  autoComplete?: string
}) {
  return createElement("input", {
    "aria-label": ariaLabel,
    placeholder,
    value,
    onChange,
    type,
    required,
    autoComplete,
  })
}

function Logo() {
  return (
    <div className="logo-mark" aria-label="NSL-IAMS logo">
      <Icon name="bolt" size={20} />
    </div>
  )
}

type UserSession = {
  name: string
  email: string
}

function AuthScreen({
  onAuthenticated,
}: {
  onAuthenticated: (session: UserSession) => void
}) {
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!email.includes("@")) {
      setError("Enter a valid official email address.")
      return
    }
    if (password.length < 6) {
      setError("Password must contain at least 6 characters.")
      return
    }
    const session = {
      name: mode === "signup" && name.trim() ? name.trim() : "Arjun Kapoor",
      email,
    }
    localStorage.setItem("nsl-session", JSON.stringify(session))
    onAuthenticated(session)
  }

  return (
    <div className="auth-shell">
      <div className="auth-visual">
        <div className="auth-brand">
          <Logo />
          <div>
            <strong>NSL-IAMS</strong>
            <span>National Smart Lighting Infrastructure</span>
          </div>
        </div>
        <div className="auth-message">
          <span className="eyebrow">National operations network</span>
          <strong>Intelligent infrastructure. Accountable governance.</strong>
          <p>
            Monitor every connected pole, automate field response, and recover
            warranty costs from one secure command center.
          </p>
          <div className="auth-stats">
            <div>
              <strong>14,250</strong>
              <span>Active poles</span>
            </div>
            <div>
              <strong>38.4%</strong>
              <span>Energy saved</span>
            </div>
            <div>
              <strong>98.7%</strong>
              <span>Network health</span>
            </div>
          </div>
        </div>
        <div className="auth-grid" />
      </div>
      <div className="auth-panel">
        <div className="auth-card">
          <div className="auth-mobile-brand">
            <Logo />
            <strong>NSL-IAMS</strong>
          </div>
          <span className="eyebrow">Authorized personnel only</span>
          <strong className="auth-title">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </strong>
          <p className="auth-subtitle">
            {mode === "signin"
              ? "Sign in to access the national operations dashboard."
              : "Register for secure access to infrastructure operations."}
          </p>
          <div className="auth-tabs">
            <Button
              className={mode === "signin" ? "active" : ""}
              onClick={() => {
                setMode("signin")
                setError("")
              }}
            >
              Sign in
            </Button>
            <Button
              className={mode === "signup" ? "active" : ""}
              onClick={() => {
                setMode("signup")
                setError("")
              }}
            >
              Sign up
            </Button>
          </div>
          <form className="auth-form" onSubmit={submit}>
            {mode === "signup" && (
              <label>
                <span>Full name</span>
                <TextInput
                  ariaLabel="Full name"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                  autoComplete="name"
                />
              </label>
            )}
            <label>
              <span>Official email</span>
              <TextInput
                ariaLabel="Official email"
                placeholder="name@organization.gov"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                required
                autoComplete="email"
              />
            </label>
            <label>
              <span>Password</span>
              <TextInput
                ariaLabel="Password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                type="password"
                required
                autoComplete={
                  mode === "signin" ? "current-password" : "new-password"
                }
              />
            </label>
            {error && <div className="form-error">{error}</div>}
            <Button className="primary-button auth-submit" type="submit">
              {mode === "signin" ? "Sign in securely" : "Create account"}
              <Icon name="arrow" />
            </Button>
          </form>
          <div className="auth-security">
            <Icon name="shield" />
            <span>
              Protected with government-grade encryption and audit logging.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

const navItems: { id: Page label: string icon: IconName }[] = [
  { id: "dashboard", label: "Dashboard", icon: "grid" },
  { id: "assets", label: "Assets", icon: "pole" },
  { id: "maintenance", label: "Tickets", icon: "tool" },
  { id: "energy", label: "Energy", icon: "chart" },
]

function Sidebar({
  page,
  setPage,
  user,
}: {
  page: Page
  setPage: (page: Page) => void
  user: UserSession
}) {
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  return (
    <aside className="sidebar">
      <div className="brand">
        <Logo />
        <div>
          <strong>NSL-IAMS</strong>
          <span>National infrastructure</span>
        </div>
      </div>
      <nav className="nav-group" aria-label="Main navigation">
        <span className="nav-label">Workspace</span>
        {navItems.map((item) => (
          <Button
            key={item.id}
            className={`nav-item ${page === item.id ? "active" : ""}`}
            onClick={() => setPage(item.id)}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
            {item.id === "maintenance" && <b>12</b>}
          </Button>
        ))}
      </nav>
      <nav className="nav-group secondary" aria-label="System navigation">
        <span className="nav-label">System</span>
        <Button
          className={`nav-item ${page === "settings" ? "active" : ""}`}
          onClick={() => setPage("settings")}
        >
          <Icon name="settings" />
          <span>Settings</span>
        </Button>
      </nav>
      <div className="system-health">
        <div className="health-top">
          <span>Network health</span>
          <b>98.7%</b>
        </div>
        <div className="progress">
          <i />
        </div>
        <small>All systems operational</small>
      </div>
      <div className="sidebar-profile">
        <div className="avatar">{initials}</div>
        <div>
          <strong>{user.name}</strong>
          <span>System administrator</span>
        </div>
        <Icon name="more" />
      </div>
    </aside>
  )
}

function Header({
  page,
  onMenu,
  user,
  onLogout,
  onSearchAsset,
}: {
  page: Page
  onMenu: () => void
  user: UserSession
  onLogout: () => void
  onSearchAsset: (assetId: string) => void
}) {
  const [search, setSearch] = useState("")
  const [showNotifications, setShowNotifications] = useState(false)
  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  const titles = {
    dashboard: ["Executive overview", "Real-time national lighting operations"],
    assets: [
      "Asset inventory",
      "Track and manage connected streetlight assets",
    ],
    maintenance: [
      "Maintenance ticket",
      "Automated incident response and dispatch",
    ],
    energy: [
      "Energy analytics",
      "Consumption, savings and dimming performance",
    ],
    settings: ["System settings", "Notifications, operations and preferences"],
  }
  const searchResults = search.trim()
    ? assets
        .filter((asset) =>
          `${asset.id} ${asset.ward} ${asset.status}`
            .toLowerCase()
            .includes(search.toLowerCase()),
        )
        .slice(0, 5)
    : []
  return (
    <header className="topbar">
      <Button
        className="mobile-logo"
        onClick={onMenu}
        ariaLabel="Open navigation"
      >
        <Logo />
      </Button>
      <div className="page-heading">
        <span>National Operations Center</span>
        <strong>{titles[page][0]}</strong>
        <small>{titles[page][1]}</small>
      </div>
      <div className="header-actions">
        <div className="global-search">
          <label className="search-field">
            <Icon name="search" />
            <TextInput
              ariaLabel="Search assets, tickets or locations"
              placeholder="Search assets, tickets..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <kbd>⌘ K</kbd>
          </label>
          {search && (
            <div className="search-results">
              <span className="eyebrow">Search results</span>
              {searchResults.length ? (
                searchResults.map((asset) => (
                  <Button
                    className="search-result"
                    key={asset.id}
                    onClick={() => {
                      onSearchAsset(asset.id)
                      setSearch("")
                    }}
                  >
                    <span className="metric-icon cyan">
                      <Icon name="pole" size={14} />
                    </span>
                    <div>
                      <strong>{asset.id}</strong>
                      <span>{asset.ward}</span>
                    </div>
                    <StatusBadge status={asset.status} />
                  </Button>
                ))
              ) : (
                <div className="search-empty">No matching assets found</div>
              )}
            </div>
          )}
        </div>
        <div className="notification-wrap">
          <Button
            className="icon-button"
            ariaLabel="Notifications"
            onClick={() => setShowNotifications((open) => !open)}
          >
            <Icon name="bell" />
            <i />
          </Button>
          {showNotifications && (
            <div className="notification-panel">
              <div className="notification-head">
                <div>
                  <span className="eyebrow">Operations center</span>
                  <strong>Notifications</strong>
                </div>
                <span>3 new</span>
              </div>
              {events.slice(0, 3).map((event) => (
                <Button
                  className="notification-item"
                  key={event.time}
                  onClick={() => {
                    setShowNotifications(false)
                    onSearchAsset(event.asset.split(" · ")[0])
                  }}
                >
                  <span className={`event-mark ${event.type}`}>
                    <Icon
                      name={event.type === "critical" ? "alert" : "bolt"}
                      size={14}
                    />
                  </span>
                  <div>
                    <strong>{event.title}</strong>
                    <span>{event.asset}</span>
                  </div>
                  <time>{event.time}</time>
                </Button>
              ))}
            </div>
          )}
        </div>
        <Button
          className="header-profile"
          onClick={onLogout}
          ariaLabel="Sign out"
        >
          <div className="avatar">{initials}</div>
          <div>
            <strong>{user.name}</strong>
            <span>Administrator · Sign out</span>
          </div>
          <Icon name="chevron" size={14} />
        </Button>
      </div>
    </header>
  )
}

const kpis = [
  {
    label: "Total active poles",
    value: "14,250",
    change: "+2.4%",
    note: "vs last month",
    icon: "pole" as IconName,
    tone: "cyan",
    trend: [18, 21, 19, 25, 28, 27, 33],
  },
  {
    label: "Energy saved today",
    value: "38.4%",
    change: "+5.2%",
    note: "target 35%",
    icon: "leaf" as IconName,
    tone: "green",
    trend: [18, 16, 22, 24, 29, 28, 34],
  },
  {
    label: "Active fault alerts",
    value: "12",
    change: "3 new",
    note: "high priority",
    icon: "alert" as IconName,
    tone: "red",
    trend: [28, 24, 26, 21, 23, 18, 20],
  },
  {
    label: "Warranty recovery",
    value: "$12,400",
    change: "+18.7%",
    note: "saved this month",
    icon: "shield" as IconName,
    tone: "purple",
    trend: [16, 18, 17, 21, 22, 29, 32],
  },
]

function Sparkline({ points }: { points: number[] }) {
  const line = points.map((y, i) => `${i * 16.5},${40 - y}`).join(" ")
  return (
    <svg className="sparkline" viewBox="0 0 100 32" preserveAspectRatio="none">
      <polyline
        points={line}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  )
}

function MetricCards() {
  return (
    <div className="metric-grid">
      {kpis.map((kpi) => (
        <article className={`metric-card ${kpi.tone}`} key={kpi.label}>
          <div className="metric-top">
            <span className="metric-icon">
              <Icon name={kpi.icon} />
            </span>
            <span className="change">{kpi.change}</span>
          </div>
          <span className="metric-label">{kpi.label}</span>
          <strong className="metric-value">{kpi.value}</strong>
          <div className="metric-bottom">
            <small>{kpi.note}</small>
            <Sparkline points={kpi.trend} />
          </div>
        </article>
      ))}
    </div>
  )
}

const pins = [
  { x: "15%", y: "28%", type: "ok", label: "SL-W4-181" },
  { x: "28%", y: "61%", type: "ok", label: "SL-W2-104" },
  { x: "43%", y: "38%", type: "fault", label: "SL-W4-802" },
  { x: "55%", y: "72%", type: "dim", label: "SL-W6-408" },
  { x: "69%", y: "29%", type: "ok", label: "SL-W8-211" },
  { x: "77%", y: "55%", type: "fault", label: "SL-W7-091" },
  { x: "87%", y: "22%", type: "ok", label: "SL-W5-338" },
  { x: "20%", y: "78%", type: "ok", label: "SL-W3-492" },
]

function CityMap({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`city-map ${compact ? "compact" : ""}`}>
      <div className="map-road r1" />
      <div className="map-road r2" />
      <div className="map-road r3" />
      <div className="map-road r4" />
      <div className="map-road r5" />
      {!compact &&
        pins.map((pin) => (
          <div
            className={`map-pin ${pin.type}`}
            style={{ left: pin.x, top: pin.y }}
            key={pin.label}
          >
            <Icon name="bolt" size={12} />
            <span>{pin.label}</span>
          </div>
        ))}
      {compact && (
        <div
          className="map-pin fault focus-pin"
          style={{ left: "52%", top: "48%" }}
        >
          <Icon name="bolt" size={12} />
          <span>SL-W4-802</span>
        </div>
      )}
      <div className="map-compass">
        <span>N</span>
        <i />
      </div>
      {!compact && (
        <div className="map-legend">
          <span>
            <i className="dot ok" />
            Operational
          </span>
          <span>
            <i className="dot dim" />
            Dimmed
          </span>
          <span>
            <i className="dot fault" />
            Fault
          </span>
        </div>
      )}
    </div>
  )
}

const events = [
  {
    time: "02:14:08",
    title: "Voltage drop detected",
    asset: "SL-W4-802 · Ward 4",
    type: "critical",
  },
  {
    time: "02:12:41",
    title: "Dimming schedule applied",
    asset: "Zone 8 · 428 assets",
    type: "info",
  },
  {
    time: "02:09:16",
    title: "Power restored",
    asset: "SL-W2-104 · Ward 2",
    type: "success",
  },
  {
    time: "02:06:53",
    title: "Current spike above limit",
    asset: "SL-W7-091 · Ward 7",
    type: "warning",
  },
  {
    time: "01:58:22",
    title: "Ambient sensor triggered",
    asset: "Zone 3 · 1,204 assets",
    type: "info",
  },
]

function Telemetry() {
  return (
    <section className="panel telemetry">
      <div className="panel-title">
        <div>
          <span className="eyebrow live">
            <i />
            Live
          </span>
          <strong>Telemetry stream</strong>
        </div>
        <Button className="ghost-button">
          View all <Icon name="arrow" size={14} />
        </Button>
      </div>
      <div className="event-list">
        {events.map((event) => (
          <div className="event" key={event.time}>
            <span className={`event-mark ${event.type}`}>
              <Icon
                name={
                  event.type === "critical" || event.type === "warning"
                    ? "alert"
                    : event.type === "success"
                      ? "check"
                      : "bolt"
                }
                size={15}
              />
            </span>
            <div>
              <strong>{event.title}</strong>
              <span>{event.asset}</span>
            </div>
            <time>{event.time}</time>
          </div>
        ))}
      </div>
    </section>
  )
}

function EnergyChart() {
  return (
    <section className="panel energy-panel">
      <div className="panel-title">
        <div>
          <span className="eyebrow">Energy analytics</span>
          <strong>Consumption today</strong>
        </div>
        <Button className="select-button">
          Today <Icon name="chevron" size={13} />
        </Button>
      </div>
      <div className="chart-stats">
        <div>
          <strong>2,842</strong>
          <span>kWh consumed</span>
        </div>
        <div>
          <strong>1,768</strong>
          <span>kWh saved</span>
        </div>
        <div className="chart-legend">
          <span>
            <i className="dot standard" />
            Standard
          </span>
          <span>
            <i className="dot smart" />
            Smart dimmed
          </span>
        </div>
      </div>
      <div className="chart-wrap">
        <div className="y-axis">
          <span>4k</span>
          <span>3k</span>
          <span>2k</span>
          <span>1k</span>
          <span>0</span>
        </div>
        <svg
          viewBox="0 0 600 170"
          preserveAspectRatio="none"
          aria-label="Energy consumption chart"
        >
          <defs>
            <linearGradient id="smartFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--cyan)" stopOpacity=".22" />
              <stop offset="100%" stopColor="var(--cyan)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <g className="grid-lines">
            <path d="M0 8H600M0 46H600M0 84H600M0 122H600M0 160H600" />
          </g>
          <path
            className="standard-line"
            d="M0 140 C50 126 75 96 120 110 S185 64 235 79 S300 42 350 55 S430 22 480 35 S550 18 600 20"
          />
          <path
            fill="url(#smartFill)"
            d="M0 151 C50 145 80 132 120 136 S185 110 235 119 S300 92 350 104 S430 70 480 82 S550 57 600 60 V170H0Z"
          />
          <path
            className="smart-line"
            d="M0 151 C50 145 80 132 120 136 S185 110 235 119 S300 92 350 104 S430 70 480 82 S550 57 600 60"
          />
        </svg>
        <div className="x-axis">
          <span>00:00</span>
          <span>04:00</span>
          <span>08:00</span>
          <span>12:00</span>
          <span>16:00</span>
          <span>20:00</span>
          <span>24:00</span>
        </div>
      </div>
    </section>
  )
}

function Dashboard({ goAssets }: { goAssets: () => void }) {
  const [showAsset, setShowAsset] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const dispatchTechnician = () => {
    setShowAsset(false)
    setShowToast(true)
    window.setTimeout(() => setShowToast(false), 5000)
  }
  return (
    <div className="page-content">
      <MetricCards />
      <div className="dashboard-grid">
        <section className="panel map-panel">
          <div className="panel-title">
            <div>
              <span className="eyebrow">National grid</span>
              <strong>Live asset network</strong>
            </div>
            <div className="map-actions">
              <Button className="select-button">
                <Icon name="filter" size={14} /> All wards
              </Button>
              <Button className="icon-button">
                <Icon name="more" />
              </Button>
            </div>
          </div>
          <CityMap />
        </section>
        <Telemetry />
        <EnergyChart />
        <section className="panel attention-panel">
          <div className="panel-title">
            <div>
              <span className="eyebrow">Requires action</span>
              <strong>Critical assets</strong>
            </div>
            <Button className="ghost-button" onClick={goAssets}>
              Open inventory <Icon name="arrow" size={14} />
            </Button>
          </div>
          {["SL-W4-802", "SL-W7-091", "SL-W1-240"].map((id, i) => (
            <Button
              className={`attention-row ${i === 0 ? "interactive" : ""}`}
              key={id}
              onClick={i === 0 ? () => setShowAsset(true) : undefined}
              ariaLabel={i === 0 ? `Open asset details for ${id}` : undefined}
            >
              <span className={i === 2 ? "warning-icon" : "danger-icon"}>
                <Icon name="alert" size={15} />
              </span>
              <div>
                <strong>{id}</strong>
                <span>
                  {i === 0
                    ? "Voltage failure"
                    : i === 1
                      ? "Current spike"
                      : "Luminaire dimming"}
                </span>
              </div>
              <b>{i === 0 ? "2m" : i === 1 ? "8m" : "14m"}</b>
            </Button>
          ))}
        </section>
      </div>
      {showAsset && (
        <DashboardAssetModal
          close={() => setShowAsset(false)}
          dispatch={dispatchTechnician}
        />
      )}
      {showToast && (
        <div className="success-toast" role="status">
          <span>
            <Icon name="check" />
          </span>
          <div>
            <strong>Technician dispatched</strong>
            <small>Warranty claim auto-generated for SL-W4-802</small>
          </div>
          <Button
            className="toast-close"
            onClick={() => setShowToast(false)}
            ariaLabel="Dismiss notification"
          >
            <Icon name="x" size={15} />
          </Button>
        </div>
      )}
    </div>
  )
}

const coreAssets = [
  {
    id: "SL-W4-802",
    ward: "Ward 4 · Central",
    gps: "28.6139, 77.2090",
    watts: "120W LED",
    installed: "12 Mar 2023",
    warranty: "Active · 14 mo",
    status: "Faulty",
  },
  {
    id: "SL-W2-104",
    ward: "Ward 2 · Riverside",
    gps: "28.6221, 77.2151",
    watts: "90W LED",
    installed: "08 Jun 2023",
    warranty: "Active · 17 mo",
    status: "Active",
  },
  {
    id: "SL-W8-211",
    ward: "Ward 8 · North",
    gps: "28.6352, 77.1987",
    watts: "120W LED",
    installed: "21 Sep 2022",
    warranty: "Active · 8 mo",
    status: "Active",
  },
  {
    id: "SL-W7-091",
    ward: "Ward 7 · Market",
    gps: "28.6082, 77.2290",
    watts: "150W LED",
    installed: "16 Jan 2022",
    warranty: "Expires soon",
    status: "Faulty",
  },
  {
    id: "SL-W6-408",
    ward: "Ward 6 · South",
    gps: "28.5912, 77.2182",
    watts: "90W LED",
    installed: "03 Nov 2023",
    warranty: "Active · 22 mo",
    status: "Maintenance",
  },
  {
    id: "SL-W3-492",
    ward: "Ward 3 · Civic",
    gps: "28.6274, 77.2211",
    watts: "120W LED",
    installed: "14 Feb 2024",
    warranty: "Active · 25 mo",
    status: "Active",
  },
]

const generatedAssets = Array.from({ length: 18 }, (_, index) => {
  const ward = (index % 8) + 1
  const number = 520 + index * 7
  const statuses = ["Active", "Active", "Active", "Maintenance", "Faulty"]
  return {
    id: `SL-W${ward}-${number}`,
    ward: `Ward ${ward} · ${
      ["Central", "Riverside", "North", "Market", "Civic", "South"][index % 6]
    }`,
    gps: `${(28.58 + index * 0.0021).toFixed(4)}, ${(77.18 + index * 0.0027).toFixed(4)}`,
    watts: `${[90, 120, 150][index % 3]}W LED`,
    installed: `${String((index % 27) + 1).padStart(2, "0")} ${
      ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index % 6]
    } 2024`,
    warranty: `Active · ${12 + (index % 16)} mo`,
    status: statuses[index % statuses.length],
  }
})

const assets = [...coreAssets, ...generatedAssets]

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`status-badge ${status.toLowerCase().replace(" ", "-")}`}>
      <i />
      {status}
    </span>
  )
}

function QRVisual() {
  const cells = [
    0, 1, 2, 3, 4, 6, 8, 9, 10, 12, 13, 14, 16, 18, 20, 22, 23, 24, 25, 26, 28,
    29, 30, 32, 34, 36, 37, 38, 40, 41, 42, 43, 44, 48, 50, 51, 52, 54, 56, 58,
    60, 61, 62, 64, 65, 66, 68, 70, 71, 72, 73, 74, 76, 78, 80, 82, 83, 84, 86,
    87, 88, 89, 90, 92, 94, 96, 98, 100, 101, 102, 103, 104, 106, 108, 109, 110,
    112, 114, 116, 117, 118, 120,
  ]
  return (
    <div className="qr-visual">
      {Array.from({ length: 121 }).map((_, i) => (
        <i className={cells.includes(i) ? "on" : ""} key={i} />
      ))}
    </div>
  )
}

function DashboardAssetModal({
  close,
  dispatch,
}: {
  close: () => void
  dispatch: () => void
}) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={close}>
      <div
        className="asset-detail-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="asset-detail-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <span className="eyebrow">Critical asset alert</span>
            <strong id="asset-detail-title">Asset ID #SL-W4-802</strong>
          </div>
          <Button
            className="icon-button"
            onClick={close}
            ariaLabel="Close asset details"
          >
            <Icon name="x" />
          </Button>
        </div>
        <div className="asset-modal-grid">
          <div className="asset-modal-map">
            <CityMap compact />
            <div className="location-line">
              <Icon name="pin" />
              <div>
                <span>GPS location</span>
                <strong>Central Avenue, Ward 4 · 28.6139, 77.2090</strong>
              </div>
            </div>
          </div>
          <div className="asset-modal-summary">
            <div className="modal-qr">
              <QRVisual />
            </div>
            <div>
              <span className="eyebrow">Fault detected · 02:14 AM</span>
              <strong>Voltage dropped to 0V</strong>
              <p>
                Smart controller is offline. AI diagnostics indicate a driver
                module failure with 94% confidence.
              </p>
            </div>
            <div className="modal-warranty">
              <Icon name="shield" />
              <div>
                <strong>Active vendor warranty</strong>
                <span>Philips Smart Core · 14 months remaining</span>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-actions">
          <Button className="secondary-button" onClick={close}>
            Cancel
          </Button>
          <Button className="primary-button" onClick={dispatch}>
            <Icon name="route" /> Dispatch technician
          </Button>
        </div>
      </div>
    </div>
  )
}

function QRModal({
  asset,
  close,
}: {
  asset: typeof assets[number]
  close: () => void
}) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={close}>
      <div
        className="qr-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="qr-title"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <span className="eyebrow">Asset identification</span>
            <strong id="qr-title">QR asset tag</strong>
          </div>
          <Button
            className="icon-button"
            onClick={close}
            ariaLabel="Close modal"
          >
            <Icon name="x" />
          </Button>
        </div>
        <div className="qr-card">
          <div className="qr-card-head">
            <Logo />
            <div>
              <strong>NSL-IAMS</strong>
              <span>Verified infrastructure asset</span>
            </div>
          </div>
          <QRVisual />
          <strong className="qr-id">{asset.id}</strong>
          <span className="qr-hint">Scan to open secure asset record</span>
        </div>
        <div className="asset-specs">
          <div>
            <span>Asset type</span>
            <strong>Smart LED pole</strong>
          </div>
          <div>
            <span>GPS coordinates</span>
            <strong>{asset.gps}</strong>
          </div>
          <div>
            <span>Specification</span>
            <strong>{asset.watts} · 230V</strong>
          </div>
          <div>
            <span>Installed</span>
            <strong>{asset.installed}</strong>
          </div>
        </div>
        <div className="modal-actions">
          <Button className="secondary-button">Download tag</Button>
          <Button className="primary-button">
            <Icon name="qr" /> Print QR label
          </Button>
        </div>
      </div>
    </div>
  )
}

function RegisterAssetModal({
  close,
  onRegister,
}: {
  close: () => void
  onRegister: (asset: typeof assets[number]) => void
}) {
  const [id, setId] = useState("")
  const [ward, setWard] = useState("")
  const [gps, setGps] = useState("")
  const [watts, setWatts] = useState("")

  const submit = (event: FormEvent) => {
    event.preventDefault()
    onRegister({
      id: id.trim().toUpperCase(),
      ward: ward.trim(),
      gps: gps.trim(),
      watts: watts.trim().toUpperCase(),
      installed: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      warranty: "Active · 24 mo",
      status: "Active",
    })
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={close}>
      <div
        className="register-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="register-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-head">
          <div>
            <span className="eyebrow">Asset registry</span>
            <strong id="register-title">Register new smart-light asset</strong>
          </div>
          <Button
            className="icon-button"
            onClick={close}
            ariaLabel="Close registration"
          >
            <Icon name="x" />
          </Button>
        </div>
        <form className="register-form" onSubmit={submit}>
          <label>
            <span>Asset tag ID</span>
            <TextInput
              ariaLabel="Asset tag ID"
              placeholder="SL-W4-803"
              value={id}
              onChange={(event) => setId(event.target.value)}
              required
            />
          </label>
          <label>
            <span>Ward and location</span>
            <TextInput
              ariaLabel="Ward and location"
              placeholder="Ward 4 · Central"
              value={ward}
              onChange={(event) => setWard(event.target.value)}
              required
            />
          </label>
          <label>
            <span>GPS coordinates</span>
            <TextInput
              ariaLabel="GPS coordinates"
              placeholder="28.6139, 77.2090"
              value={gps}
              onChange={(event) => setGps(event.target.value)}
              required
            />
          </label>
          <label>
            <span>Luminaire specification</span>
            <TextInput
              ariaLabel="Luminaire specification"
              placeholder="120W LED"
              value={watts}
              onChange={(event) => setWatts(event.target.value)}
              required
            />
          </label>
          <div className="register-note">
            <Icon name="shield" />
            <span>
              A secure QR identity and 24-month warranty record will be created
              automatically.
            </span>
          </div>
          <div className="modal-actions">
            <Button className="secondary-button" onClick={close}>
              Cancel
            </Button>
            <Button className="primary-button" type="submit">
              <Icon name="plus" /> Register asset
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Assets({
  openTicket,
  initialQuery,
}: {
  openTicket: () => void
  initialQuery: string
}) {
  const [query, setQuery] = useState(initialQuery)
  const [currentPage, setCurrentPage] = useState(1)
  const [wardFilter, setWardFilter] = useState("All wards")
  const [warrantyOnly, setWarrantyOnly] = useState(false)
  const [qrAsset, setQrAsset] = useState<typeof assets[number] | null>(null)
  const [showRegister, setShowRegister] = useState(false)
  const [assetRows, setAssetRows] = useState(() => {
    if (typeof window === "undefined") return assets
    const stored = localStorage.getItem("nsl-assets")
    if (!stored) return assets
    try {
      const saved = JSON.parse(stored) as typeof assets
      const savedIds = new Set(saved.map((asset) => asset.id))
      return [...saved, ...assets.filter((asset) => !savedIds.has(asset.id))]
    } catch {
      return assets
    }
  })
  useEffect(() => {
    setQuery(initialQuery)
    setCurrentPage(1)
  }, [initialQuery])
  const filtered = useMemo(
    () =>
      assetRows.filter(
        (asset) =>
          `${asset.id} ${asset.ward} ${asset.status}`
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (wardFilter === "All wards" || asset.ward.startsWith(wardFilter)) &&
          (!warrantyOnly || asset.warranty.startsWith("Active")),
      ),
    [assetRows, query, wardFilter, warrantyOnly],
  )
  const registerAsset = (asset: typeof assets[number]) => {
    const updated = [asset, ...assetRows]
    setAssetRows(updated)
    localStorage.setItem("nsl-assets", JSON.stringify(updated))
    setShowRegister(false)
    window.dispatchEvent(
      new CustomEvent("nsl-notify", {
        detail: `${asset.id} registered and QR identity generated`,
      }),
    )
  }
  const totalAssets = 14482 + assetRows.length - assets.length
  const pageSize = 6
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visibleAssets = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  )
  const changePage = (nextPage: number) => {
    setCurrentPage(Math.min(Math.max(nextPage, 1), totalPages))
    document
      .querySelector(".inventory-panel")
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  const cycleWard = () => {
    const wards = ["All wards", "Ward 4", "Ward 7"]
    setWardFilter(wards[(wards.indexOf(wardFilter) + 1) % wards.length])
    setCurrentPage(1)
  }
  return (
    <div className="page-content assets-page">
      <div className="summary-strip">
        <div>
          <span>Total assets</span>
          <strong>{totalAssets.toLocaleString()}</strong>
        </div>
        <div>
          <span>Operational</span>
          <strong className="green-text">14,250</strong>
        </div>
        <div>
          <span>In maintenance</span>
          <strong className="amber-text">220</strong>
        </div>
        <div>
          <span>Critical faults</span>
          <strong className="red-text">12</strong>
        </div>
        <Button
          className="primary-button"
          onClick={() => setShowRegister(true)}
        >
          <Icon name="plus" /> Register new asset
        </Button>
      </div>
      <section className="panel inventory-panel">
        <div className="inventory-toolbar">
          <label className="search-field table-search">
            <Icon name="search" />
            <TextInput
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setCurrentPage(1)
              }}
              ariaLabel="Search inventory"
              placeholder="Search by asset tag, ward or status..."
            />
          </label>
          <div>
            <Button className="select-button" onClick={cycleWard}>
              <Icon name="pin" size={14} /> {wardFilter}{" "}
              <Icon name="chevron" size={12} />
            </Button>
            <Button
              className={`select-button ${warrantyOnly ? "filter-active" : ""}`}
              onClick={() => {
                setWarrantyOnly((active) => !active)
                setCurrentPage(1)
              }}
            >
              <Icon name="shield" size={14} />{" "}
              {warrantyOnly ? "Active warranty" : "Warranty"}{" "}
              <Icon name="chevron" size={12} />
            </Button>
            <Button
              className="secondary-button"
              onClick={() => {
                setWardFilter("All wards")
                setWarrantyOnly(false)
                setQuery("")
                setCurrentPage(1)
              }}
            >
              <Icon name="filter" /> Clear filters{" "}
              <b>
                {(wardFilter !== "All wards" ? 1 : 0) + (warrantyOnly ? 1 : 0)}
              </b>
            </Button>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Asset ID</th>
                <th>Location</th>
                <th>Specification</th>
                <th>Installed</th>
                <th>Warranty</th>
                <th>Status</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {visibleAssets.map((asset) => (
                <tr key={asset.id}>
                  <td>
                    <strong>{asset.id}</strong>
                    <span>Smart pole</span>
                  </td>
                  <td>
                    <strong>{asset.ward}</strong>
                    <span>
                      <Icon name="pin" size={11} />
                      {asset.gps}
                    </span>
                  </td>
                  <td>
                    <strong>{asset.watts}</strong>
                    <span>230V · Smart core</span>
                  </td>
                  <td>{asset.installed}</td>
                  <td>
                    <span
                      className={`warranty ${
                        asset.warranty === "Expires soon" ? "ending" : ""
                      }`}
                    >
                      <Icon name="shield" size={14} />
                      {asset.warranty}
                    </span>
                  </td>
                  <td>
                    <StatusBadge status={asset.status} />
                  </td>
                  <td>
                    <div className="row-actions">
                      <Button
                        className="icon-button"
                        onClick={() => setQrAsset(asset)}
                        ariaLabel={`View QR code for ${asset.id}`}
                      >
                        <Icon name="qr" />
                      </Button>
                      <Button
                        className="icon-button"
                        onClick={
                          asset.status === "Faulty" ? openTicket : undefined
                        }
                        ariaLabel={`Actions for ${asset.id}`}
                      >
                        <Icon name="more" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <span>
            Showing {filtered.length ? (currentPage - 1) * pageSize + 1 : 0}–
            {Math.min(currentPage * pageSize, filtered.length)} of{" "}
            {filtered.length} matching assets
          </span>
          <div>
            <Button
              className="select-button"
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <Button
                  className={`page-button ${
                    currentPage === pageNumber ? "active" : ""
                  }`}
                  key={pageNumber}
                  onClick={() => changePage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              ),
            )}
            <Button
              className="select-button"
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </section>
      {qrAsset && <QRModal asset={qrAsset} close={() => setQrAsset(null)} />}
      {showRegister && (
        <RegisterAssetModal
          close={() => setShowRegister(false)}
          onRegister={registerAsset}
        />
      )}
    </div>
  )
}

const timeline = [
  {
    title: "Asset procured",
    detail: "Philips Smart Core · PO-2023-1844",
    time: "02 Mar 2023",
    done: true,
  },
  {
    title: "Installed & commissioned",
    detail: "Ward 4, Central Avenue",
    time: "12 Mar 2023",
    done: true,
  },
  {
    title: "Telemetry sensor alert",
    detail: "Voltage dropped to 0V",
    time: "Today, 02:14",
    done: true,
    current: true,
  },
  {
    title: "Technician dispatched",
    detail: "Vikram Singh · ETA 18 min",
    time: "Today, 02:18",
    done: true,
  },
  {
    title: "Warranty claim submitted",
    detail: "Auto-prepared · Awaiting inspection",
    time: "Pending",
    done: false,
  },
]

const energyZones = [
  { name: "Central district", value: "482 kWh", saved: "42%", width: "82%" },
  { name: "Riverside ward", value: "391 kWh", saved: "38%", width: "70%" },
  { name: "North corridor", value: "346 kWh", saved: "35%", width: "62%" },
  { name: "Market district", value: "298 kWh", saved: "31%", width: "54%" },
]

function Energy() {
  return (
    <div className="page-content energy-page">
      <MetricCards />
      <div className="energy-layout">
        <EnergyChart />
        <section className="panel zone-performance">
          <div className="panel-title">
            <div>
              <span className="eyebrow">Zone comparison</span>
              <strong>Energy efficiency</strong>
            </div>
            <span className="status-badge active">
              <i /> Live
            </span>
          </div>
          <div className="zone-list">
            {energyZones.map((zone) => (
              <div className="zone-row" key={zone.name}>
                <div>
                  <strong>{zone.name}</strong>
                  <span>{zone.value} consumed</span>
                </div>
                <div className="zone-track">
                  <i style={{ width: zone.width }} />
                </div>
                <b>{zone.saved} saved</b>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

type Preferences = {
  criticalAlerts: boolean
  maintenanceUpdates: boolean
  energyReports: boolean
  soundAlerts: boolean
}

function Settings() {
  const [preferences, setPreferences] = useState<Preferences>(() => {
    if (typeof window === "undefined") {
      return {
        criticalAlerts: true,
        maintenanceUpdates: true,
        energyReports: true,
        soundAlerts: false,
      }
    }
    const saved = localStorage.getItem("nsl-preferences")
    return saved
      ? JSON.parse(saved) as Preferences
      : {
          criticalAlerts: true,
          maintenanceUpdates: true,
          energyReports: true,
          soundAlerts: false,
        }
  })

  const toggle = (key: keyof Preferences) => {
    setPreferences((current) => ({ ...current, [key]: !current[key] }))
  }
  const save = () => {
    localStorage.setItem("nsl-preferences", JSON.stringify(preferences))
    window.dispatchEvent(
      new CustomEvent("nsl-notify", {
        detail: "System preferences saved successfully",
      }),
    )
  }

  const options: {
    key: keyof Preferences
    title: string
    description: string
  }[] = [
    {
      key: "criticalAlerts",
      title: "Critical fault alerts",
      description: "Immediate notifications for voltage failures and hazards.",
    },
    {
      key: "maintenanceUpdates",
      title: "Maintenance updates",
      description: "Updates when technicians are assigned or tickets change.",
    },
    {
      key: "energyReports",
      title: "Weekly energy report",
      description: "Receive a weekly summary of consumption and savings.",
    },
    {
      key: "soundAlerts",
      title: "Sound for urgent alerts",
      description: "Play an audible signal for critical night hazards.",
    },
  ]

  return (
    <div className="page-content settings-page">
      <div className="settings-layout">
        <section className="panel settings-card">
          <div className="panel-title">
            <div>
              <span className="eyebrow">Operations center</span>
              <strong>Notification preferences</strong>
            </div>
            <Icon name="bell" />
          </div>
          <div className="settings-list">
            {options.map((option) => (
              <div className="setting-row" key={option.key}>
                <div>
                  <strong>{option.title}</strong>
                  <span>{option.description}</span>
                </div>
                <Button
                  className={`toggle ${
                    preferences[option.key] ? "active" : ""
                  }`}
                  onClick={() => toggle(option.key)}
                  ariaLabel={`Toggle ${option.title}`}
                >
                  <i />
                </Button>
              </div>
            ))}
          </div>
        </section>
        <section className="panel settings-card">
          <div className="panel-title">
            <div>
              <span className="eyebrow">System profile</span>
              <strong>Network configuration</strong>
            </div>
            <Icon name="settings" />
          </div>
          <div className="settings-summary">
            <div>
              <span>Telemetry refresh</span>
              <strong>Every 10 seconds</strong>
            </div>
            <div>
              <span>Operations timezone</span>
              <strong>India Standard Time</strong>
            </div>
            <div>
              <span>Data retention</span>
              <strong>7 years · Audit policy</strong>
            </div>
            <div>
              <span>Platform version</span>
              <strong>NSL-IAMS 2.4.0</strong>
            </div>
          </div>
        </section>
      </div>
      <div className="settings-actions">
        <div>
          <Icon name="shield" />
          <span>Changes are logged in the system audit record.</span>
        </div>
        <Button className="primary-button" onClick={save}>
          <Icon name="check" /> Save settings
        </Button>
      </div>
    </div>
  )
}

function Maintenance() {
  return (
    <div className="page-content maintenance-page">
      <div className="ticket-banner">
        <div>
          <span className="critical-label">
            <Icon name="alert" size={14} /> Critical · Night hazard
          </span>
          <strong>#TK-9042</strong>
          <span>Created via automated telemetry sensor · 2 minutes ago</span>
        </div>
        <div>
          <Button className="secondary-button">
            <Icon name="more" />
          </Button>
          <Button className="primary-button">
            <Icon name="route" /> Navigate field crew
          </Button>
        </div>
      </div>
      <div className="ticket-grid">
        <div className="ticket-main">
          <section className="panel ticket-section">
            <div className="panel-title">
              <div>
                <span className="eyebrow">Affected asset</span>
                <strong>SL-W4-802 · Smart LED Pole</strong>
              </div>
              <StatusBadge status="Faulty" />
            </div>
            <CityMap compact />
            <div className="location-line">
              <Icon name="pin" />
              <div>
                <span>Pinpoint location</span>
                <strong>Central Avenue, Ward 4 · 28.6139, 77.2090</strong>
              </div>
            </div>
          </section>
          <section className="panel ticket-section">
            <div className="panel-title">
              <div>
                <span className="eyebrow">Fault diagnostic</span>
                <strong>Voltage drop to 0V</strong>
              </div>
              <span className="time-pill">
                <Icon name="clock" size={14} /> 02:14 AM
              </span>
            </div>
            <div className="diagnostic-grid">
              <div>
                <span>Last reading</span>
                <strong className="red-text">0.0 V</strong>
                <small>Expected 220–240V</small>
              </div>
              <div>
                <span>Current draw</span>
                <strong>0.0 A</strong>
                <small>Before fault: 0.52A</small>
              </div>
              <div>
                <span>Controller</span>
                <strong>Offline</strong>
                <small>Last ping 02:13:58</small>
              </div>
            </div>
            <div className="ai-diagnosis">
              <Icon name="bolt" />
              <div>
                <strong>Automated diagnosis</strong>
                <span>
                  Likely driver module failure. Confidence 94%. Replacement unit
                  recommended.
                </span>
              </div>
            </div>
          </section>
          <section className="panel technician">
            <div className="panel-title">
              <div>
                <span className="eyebrow">Assigned technician</span>
                <strong>Field response unit</strong>
              </div>
              <Button className="ghost-button">Reassign</Button>
            </div>
            <div className="tech-profile">
              <div className="large-avatar">VS</div>
              <div>
                <strong>Vikram Singh</strong>
                <span>Senior electrical technician · Unit 14</span>
                <div className="tech-meta">
                  <span>
                    <i className="dot ok" /> En route
                  </span>
                  <span>ETA 18 min</span>
                  <span>4.9 rating</span>
                </div>
              </div>
              <Button className="secondary-button">Contact</Button>
            </div>
          </section>
        </div>
        <aside className="panel lifecycle">
          <div className="panel-title">
            <div>
              <span className="eyebrow">Immutable record</span>
              <strong>Asset lifecycle audit</strong>
            </div>
            <Icon name="shield" />
          </div>
          <div className="timeline">
            {timeline.map((item) => (
              <div
                className={`timeline-item ${item.current ? "current" : ""} ${
                  !item.done ? "pending" : ""
                }`}
                key={item.title}
              >
                <span className="timeline-mark">
                  {item.done ? (
                    <Icon name="check" size={14} />
                  ) : (
                    <Icon name="clock" size={14} />
                  )}
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                  <time>{item.time}</time>
                </div>
              </div>
            ))}
          </div>
          <div className="audit-note">
            <Icon name="shield" />
            <span>
              Records cryptographically signed and compliant with national asset
              audit policy.
            </span>
          </div>
        </aside>
      </div>
      <div className="warranty-banner">
        <span className="warranty-icon">
          <Icon name="shield" />
        </span>
        <div>
          <span>AI warranty engine notice</span>
          <strong>Item is under active vendor warranty</strong>
          <p>
            Philips Smart Core coverage verified. Estimated repair cost of $186
            has been zeroed.
          </p>
        </div>
        <div className="savings">
          <span>Public funds protected</span>
          <strong>$186.00</strong>
        </div>
        <Button className="light-button">
          Review claim <Icon name="arrow" />
        </Button>
      </div>
    </div>
  )
}

export default function App() {
  const [session, setSession] = useState<UserSession | null>(() => {
    if (typeof window === "undefined") return null
    const stored = localStorage.getItem("nsl-session")
    if (!stored) return null
    try {
      return JSON.parse(stored) as UserSession
    } catch {
      return null
    }
  })
  const [page, setPage] = useState<Page>("dashboard")
  const [mobileNav, setMobileNav] = useState(false)
  const [notification, setNotification] = useState("")
  const [assetSearch, setAssetSearch] = useState("")

  useEffect(() => {
    let timer: number | undefined
    const notify = (event: Event) => {
      setNotification((event as CustomEvent<string>).detail)
      window.clearTimeout(timer)
      timer = window.setTimeout(() => setNotification(""), 4000)
    }
    window.addEventListener("nsl-notify", notify)
    return () => {
      window.removeEventListener("nsl-notify", notify)
      window.clearTimeout(timer)
    }
  }, [])

  if (!session) {
    return <AuthScreen onAuthenticated={setSession} />
  }

  const navigate = (next: Page) => {
    if (next === "assets") setAssetSearch("")
    setPage(next)
    setMobileNav(false)
    window.scrollTo(0, 0)
  }
  const logout = () => {
    localStorage.removeItem("nsl-session")
    setSession(null)
  }
  const searchAsset = (assetId: string) => {
    setAssetSearch(assetId)
    setPage("assets")
    setMobileNav(false)
    window.scrollTo(0, 0)
  }
  return (
    <div className="app-shell">
      <div
        className={mobileNav ? "nav-overlay open" : "nav-overlay"}
        onClick={() => setMobileNav(false)}
      />
      <div className={mobileNav ? "mobile-sidebar open" : "mobile-sidebar"}>
        <Sidebar page={page} setPage={navigate} user={session} />
      </div>
      <div className="desktop-sidebar">
        <Sidebar page={page} setPage={navigate} user={session} />
      </div>
      <main>
        <Header
          page={page}
          onMenu={() => setMobileNav(true)}
          user={session}
          onLogout={logout}
          onSearchAsset={searchAsset}
        />
        {page === "dashboard" && (
          <Dashboard goAssets={() => navigate("assets")} />
        )}
        {page === "assets" && (
          <Assets
            openTicket={() => navigate("maintenance")}
            initialQuery={assetSearch}
          />
        )}
        {page === "maintenance" && <Maintenance />}
        {page === "energy" && <Energy />}
        {page === "settings" && <Settings />}
      </main>
      {notification && (
        <div className="success-toast global-toast" role="status">
          <span>
            <Icon name="check" />
          </span>
          <div>
            <strong>Action completed</strong>
            <small>{notification}</small>
          </div>
          <Button
            className="toast-close"
            onClick={() => setNotification("")}
            ariaLabel="Dismiss notification"
          >
            <Icon name="x" size={15} />
          </Button>
        </div>
      )}
    </div>
  )
}
