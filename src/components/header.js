import React from "react"
import { Link } from "react-router-dom"
import SignOutButton from "./auth/signout"

const Navigation = ({ authUser }) => (
  <div className="nav-options">
    {authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />}
  </div>
)

const NavigationAuth = ({authUser}) => (
  <div className="nav-container">
    <div className="navigation-bar">
      <Link to="/feed">
        <i className="fab fa-reddit-alien" />
        /r/analog
      </Link>
      <Link to="/favorites">
        <i className="fas fa-heart" /> favorites
      </Link>
    </div>
    <div className="nav-buttons">
      <SignOutButton />
    </div>
  </div>
)

const NavigationNonAuth = () => (
  <div className="nav-container">
    <div className="navigation-bar">
      <Link to="/feed">
        <i className="fab fa-reddit-alien" />
        /r/analog
      </Link>
    </div>
    <div className="nav-buttons">
      <Link to="/signin">Sign In</Link>
    </div>
  </div>
)

const Header = props => (
  <header className="header">
    <Navigation authUser={props.authUser} />
  </header>
)

export { Header }
