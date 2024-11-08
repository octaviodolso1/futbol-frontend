import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-900 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">
        <Link to="/" className="text-green-400">
          Fútbol App
        </Link>
      </div>
      <div className="flex space-x-4 items-center">
        <Link to="/tournaments" className="hover:text-green-400">
          Torneos
        </Link>
        {user && user.rol === "admin" && (
          <Link to="/tournaments/new" className="hover:text-green-400">
            Agregar Torneo
          </Link>
        )}
        {user ? (
          <>
            <span className="hover:text-green-400">
              Bienvenido, {user.nombre}
            </span>
            <button
              onClick={logout}
              className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-400">
              Iniciar Sesión
            </Link>
            <Link to="/register" className="hover:text-green-400">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
