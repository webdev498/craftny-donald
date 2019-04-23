import React from "react"
import { Link } from "react-router-dom"
import { withFirebase } from "../firebase"

const SignOutButton = ({ firebase }) => (
  <Link to="#" onClick={firebase.doSignOut}>Sign Out</Link>
)

export default withFirebase(SignOutButton)
