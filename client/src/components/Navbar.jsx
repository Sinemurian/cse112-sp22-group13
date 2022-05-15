import React from "react";
import "../stylesheets/navbar.css";
//import { Route, Switch } from "react-router-dom";

//import FrontPage from "../pages/FrontPage";
//import RecipesPage from "../pages/RecipesPage";

const NavBar = () => {
  return (
    <div class="container">
      <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <a
          href="/"
          class="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none"
        >
          <img src="logo192.png" alt="Logo" width="75" height="75"></img>
        </a>

        <form
          id="form_search"
          name="form_search"
          method="get"
          action=""
          class="form-inline"
        >
          <a href="#" class="nav-link px-2 link-secondary">
            Knead It
          </a>
          <div class="input-group">
            <input class="form-control" placeholder="Search..." type="text" />
            <span class="input-group-btn">
              <button
                id="test"
                class="btn btn-outline-primary me-2"
                type="button"
              >
                Search
              </button>
            </span>
          </div>
        </form>

        <div class="col-md-3 text-end">
          <button type="button" class="btn btn-outline-primary me-2">
            Login
          </button>
          <button type="button" class="btn btn-primary">
            Sign-up
          </button>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
