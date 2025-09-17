import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/calcul", label: "Calcul" },
];

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="lg:px-16 px-4 bg-[var(--prev-bg)] text-white flex flex-wrap items-center py-3 shadow-lg">
      <div className="flex-1 flex justify-between items-center">
        <Link to="/" className="text-4xl font-bold ">
          WattTrack
        </Link>
      </div>

      <button
        className="md:hidden block focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg
          className="fill-current text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <title>menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>

      <div
        className={`${
          menuOpen ? "block" : "hidden"
        } md:flex md:items-center md:w-auto w-full`}
        id="menu"
      >
        <nav>
          <ul className="md:flex items-center justify-between text-base text-white pt-4 md:pt-0">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `md:p-4 py-3 px-0 block text-3xl transition ` +
                    (isActive ? " text-[var(--prev-yellow)] font-bold" : "")
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
