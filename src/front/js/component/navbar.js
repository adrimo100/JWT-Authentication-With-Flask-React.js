import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (store.user) setLogged(true);
    else setLogged(false);
  }, [store.user]);

  let render = null;

  if (!logged)
    render = (
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <Link to="/">
            <span className="navbar-brand mb-0 h1">Home</span>
          </Link>
          <div className="ml-auto">
            <Link to="/singup">
              <button className="btn btn-danger me-2">Sing Up!</button>
            </Link>
            <Link to="/login">
              <button className="btn btn-primary">Log in!</button>
            </Link>
          </div>
        </div>
      </nav>
    );
  else
    render = (
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <Link to="/">
            <span className="navbar-brand mb-0 h1">Home</span>
          </Link>
          <div className="ml-auto">
            <Link to="/login">
              <button
                className="btn btn-secondary me-2"
                onClick={actions.logOut}
              >
                Log Out!
              </button>
            </Link>
          </div>
        </div>
      </nav>
    );

  return render;
};
