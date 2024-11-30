import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout = ({ title, user }) => {
  return (
    <div>
      <head>
        <title>{title}</title>
        {/* Latest compiled and minified CSS */}
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          crossOrigin="anonymous"
        />
        {/* Optional theme */}
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css"
          integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.0/codemirror.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.25.0/theme/monokai.min.css"
        />
        <link rel="stylesheet" href="/stylesheets/style.css" />
        {/* JavaScript */}
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
          integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="/">
                Code4Share
              </Link>
            </div>
            <div id="navbar" className="collapse navbar-collapse">
              <ul className="nav navbar-nav">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                {user ? (
                  <li className="dropdown">
                    <a
                      href="#"
                      className="dropdown-toggle"
                      data-toggle="dropdown"
                      aria-expanded="false"
                      aria-haspopup="true"
                      role="button"
                    >
                      {user.name} <span className="caret"></span>
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <Link to="/logout">Logout</Link>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Register</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <Outlet />
        </div>
      </body>
    </div>
  );
};

export default Layout;
