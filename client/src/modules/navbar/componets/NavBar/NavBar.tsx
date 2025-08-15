import { NavLink } from "react-router-dom";
import { useAuth } from "../../../../hooks/useAuth";
import { NavLinks } from "../NavLinks/NavLinks";
import { UserDropdown } from "../UserDropdown/UserDropdown";
import { useState } from "react";
 
const BootstrapNavbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  (false);

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        color: 'var(--color-text-primary)',
        boxShadow: 'var(--box-shadow-sm)',
      }}
    >
      <NavLink className="navbar-brand" to="/" style={{ color: 'var(--color-text-primary)' }}>
        Home
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${isCollapsed ? 'show' : ''}`}>
        <NavLinks user={user} />
        <UserDropdown user={user} logout={logout} />
      </div>
    </nav>
  );
};

export default BootstrapNavbar;