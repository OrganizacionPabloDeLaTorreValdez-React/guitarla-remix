import { Link, NavLink } from "@remix-run/react";
import CarritoImg from "../../public/img/carrito.png";

function Navegacion() {
  return (
    <nav className="navegacion">
      <NavLink
        className={({isActive}) => isActive ? 'link-active' : ''}
        to="/"
      >
        Inicio
      </NavLink>
      <NavLink
        className={({isActive}) => isActive ? 'link-active' : ''}
        to="/nosotros"
      >
        Nosotros
      </NavLink>
      <NavLink
        className={({isActive}) => isActive ? 'link-active' : ''}
        to="/guitarras"
      >
        Tienda
      </NavLink>
      <NavLink
        className={({isActive}) => isActive ? 'link-active' : ''}
        to="/posts"
      >
        Blog
      </NavLink>
      <Link
        className=""
        to="/carrito"
      >
        <img src={CarritoImg} alt="carrito de compras" />
      </Link>
    </nav>
  );
}

export default Navegacion;