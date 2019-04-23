import React from "react"
import { Redirect, Route } from "react-router-dom"
import { SignUpPage as Signup } from "./signup"
import { SignInPage as Signin } from "./signin"
import SignOutButton from "./signout"

const ProtectedRoute = ({ authUser, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authUser ? <Component {...props} /> : <Redirect to="/signin" />
    }
  />
)

export { Signin, Signup, SignOutButton, ProtectedRoute }

// Signin, Signup, Signout
