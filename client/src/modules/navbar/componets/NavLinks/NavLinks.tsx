import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./NavLinks.module.scss";

interface NavLinksProps {
  user: any;
}

export const NavLinks: React.FC<NavLinksProps> = ({ user }) => {
  return (
    <>
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <NavLink
          className={`nav-link ${styles.navLink}`}
          to="/"
          style={{ color: "var(--color-text-primary)" }}
        >
          Posts
        </NavLink>
      </li>
      {user && (
        <li className="nav-item">
          <NavLink
            className={`nav-link ${styles.navLink}`}
            to="/dashboard"
            style={{ color: "var(--color-text-primary)" }}
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </ul>

    <style>{`
      .nav-item .active {
         color: var(--color-text-primary) !important;
      }
    `}</style>
  </>
  );
};