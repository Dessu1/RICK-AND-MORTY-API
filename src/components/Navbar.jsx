import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav id='navbar'>
      <ul className='list-items'>
        <li className='item'>
          <NavLink to='/characters'>Personajes</NavLink>
        </li>
        <li className='item'>
          <NavLink to='/locations'>Ubicaciones</NavLink>
        </li>
        <li className='item'>
          <NavLink to='/episodes'>Episodios</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
