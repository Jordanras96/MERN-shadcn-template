import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

// Propriétés acceptées pour le composant Navbar
const propTypes = {
  logoSrc: PropTypes.string,
};

// Définition du chemin du logo
const logoSrc = "https://d3cy9zhslanhfa.cloudfront.net/media/3800C044-6298-4575-A05D5C6B7623EE37/4B45D0EC-3482-4759-82DA37D8EA07D229/webimage-8A27671A-8A53-45DC-89D7BF8537F15A0D.png";

// Composant Navbar transformé avec Tailwind CSS
const Navbar = () => {
  return (
    <div>
      <nav className="bg-gray-100 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <NavLink className="text-xl font-bold text-blue-500" to="/">
            <img
              className="w-1/4"
              src={logoSrc}
              alt="Logo"
            />
          </NavLink>
          <button
            className="lg:hidden focus:outline-none"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="block h-3 w-3 border-t border-blue-500"></span>
            <span className="block h-3 w-3 border-t border-blue-500 mt-1"></span>
            <span className="block h-3 w-3 border-t border-blue-500 mt-1"></span>
          </button>
          <div
            className="hidden lg:flex lg:flex-grow lg:items-center lg:w-auto"
            id="navbarSupportedContent"
          >
            <ul className="list-none lg:flex">
              <li className="nav-item">
                <NavLink
                  className="nav-link text-blue-500 hover:text-blue-700 px-4 py-2"
                  to="/create"
                >
                  Create Record
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = propTypes;

export default Navbar;
