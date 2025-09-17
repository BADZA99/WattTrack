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
    <header className="lg:px-16  px-4 bg-[var(--prev-bg)] text-white flex flex-wrap items-center py-3 shadow-lg w-full z-50 relative">
      <div className="flex-1 flex justify-between items-center w-full">
        <Link
          to="/"
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight"
        >
          WattTrack
        </Link>
        {/* Mobile menu button */}
        <button
          className="md:hidden block focus:outline-none ml-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="fill-current text-[var(--prev-yellow)]"
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      {/* Menu links */}
      <div
        className={`w-full md:w-auto transition-all duration-300 ease-in-out md:flex md:items-center md:static absolute left-0 top-full md:top-auto bg-[var(--prev-bg)] md:bg-transparent shadow-lg md:shadow-none z-40
          ${menuOpen ? "block" : "hidden"}`}
        id="menu"
      >
        <nav>
          <ul className="flex flex-col md:flex-row items-center md:justify-between text-base text-white pt-2 md:pt-0 gap-2 md:gap-0">
            {navLinks.map((link) => (
              <li key={link.to} className="w-full md:w-auto">
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `md:px-4 md:py-2 py-3 px-0 w-full block text-2xl md:text-3xl text-center transition rounded-md md:rounded-none hover:bg-[var(--prev-yellow)] hover:text-black md:hover:bg-transparent md:hover:text-[var(--prev-yellow)] ` +
                    (isActive ? " text-[var(--prev-yellow)] font-bold" : "")
                  }
                  onClick={() => setMenuOpen(false)}
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
