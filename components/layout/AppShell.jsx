import { NavLink, Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <aside className="sidebar">
      <p className="sidebar-title">WeatherScope</p>
      <nav className="sidebar-nav">
        <NavLink to="/" end>
          Overview
        </NavLink>
        <NavLink to="/forecast">Forecast</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="topbar">
      <span className="topbar-tag">5-day / 3-hour forecast dashboard</span>
    </header>
  );
}

export default function AppShell() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="content-area">
        <Topbar />
        <div className="main-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
