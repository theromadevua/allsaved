import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDropdown } from "../../hooks/useDropdown";
import styles from './UserDropdown.module.scss'

interface UserDropdownProps {
  user: any;
  logout: () => void;
}

export const UserDropdown: React.FC<UserDropdownProps> = ({ user, logout }) => {
  const navigate = useNavigate();
  const { isOpen, toggle, close, ref } = useDropdown<HTMLLIElement>();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return (
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/login"
            style={{ color: "var(--color-text-primary)" }}
          >
            Login
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            className="nav-link"
            to="/register"
            style={{ color: "var(--color-text-primary)" }}
          >
            Register
          </NavLink>
        </li>
      </ul>
    );
  }

  return (
    <ul className="navbar-nav">
      <li
        className="nav-item dropdown"
        ref={ref}
        style={{ position: "relative" }}
      >
        <a
          href="#"
          className="nav-link dropdown-toggle"
          onClick={(e) => {
            e.preventDefault();
            toggle();
          }}
          style={{ color: "var(--color-text-primary)" }}
        >
          {user.name}
        </a>
        <div
          className={`dropdown-menu dropdown-menu-right ${isOpen ? "show" : ""}`}
          style={{
            background: "var(--color-bg-surface)",
            border: `1px solid var(--color-border-light)`,
          }}
        >
          <NavLink
            to="/profile"
            onClick={close}
            style={({ isActive }) => ({
              color: isActive ? "#ffffff" : "var(--color-text-primary)",
            })}
            className={`dropdown-item ${styles.linkHover}`}
          >
            Profile
          </NavLink>

          <NavLink
            to="/settings"
            onClick={close}
            style={({ isActive }) => ({
              color: isActive ? "#ffffff" : "var(--color-text-primary)",
            })}
            className={`dropdown-item ${styles.linkHover}`}
          >
            Settings
          </NavLink>

          <div
            className="dropdown-divider"
            style={{ borderColor: "var(--color-border-light)" }}
          ></div>
          <button
            className="dropdown-item"
            onClick={handleLogout}
            style={{ color: "var(--color-error)" }}
          >
            Logout
          </button>
        </div>
      </li>
    </ul>
  );
};
