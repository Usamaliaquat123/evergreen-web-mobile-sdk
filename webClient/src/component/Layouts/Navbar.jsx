import React, { useContext } from "react";

import { Link } from "react-router-dom";

import AuthService from "../../services/AuthService"

import { AuthContext } from "../../context/AuthContext";

import './Navbar.css'

const Navbar = () => {

  const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      console.log(
        " %c *** Navbar[onClickLogoutHandler] *** ",
        "font-size: 12px; font-weight: bold;color:green"
      );
      if (data.success) {
       
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };
  const authenticatedNavbar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-item nav-link">Home</li>
        </Link>
        <Link to="/todos">
          <li className="nav-item nav-link">Todos</li>
        </Link>
        {/* if user is admin show admin link  */}
        {user.role === "admin" ? (
          <Link to="/admin">
            <li className="nav-item nav-link">Admin</li>
          </Link>
        ) : null}
        <button
        type="button"
          className="btn btn-link nav-item nav-link "
          onClick={onClickLogoutHandler}
        >
          logout
        </button>
      </>
    );
  };
  const unauthenticatedNavbar = () => {
    return (
      <>
        <Link to="/">
          <li className="nav-item nav-link">Home</li>
        </Link>
        <Link to="/login">
          <li className="nav-item nav-link">Login</li>
        </Link>
        <Link to="/register">
          <li className="nav-item nav-link">Register</li>
        </Link>
      </>
    );
  };
  return (
    <div>
      <nav className="p-0 m-0 navbar navbar-expand-lg navbar-light bg-light ">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/">
            React Auth
          </Link>
          <ul className="mt-2 ml-auto navbar-nav mt-lg-0">
            {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
            <li className="nav-item ">
              <Link to="/" className=""></Link>
            </li>
          </ul>
          <div>
            <button type="button" className="mr-2 btn btn-success btn-sm">
              <i className="fa fa-shopping-basket "></i>0
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;