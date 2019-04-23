import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"
import { withFirebase } from "../firebase"
import { compose } from "recompose"

const SignUpPage = () => (
  <div>
    <h1>SignUp</h1>
    <SignUpForm />
  </div>
)

const INITIAL_STATE = {
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
}

class SignUpFormBase extends Component {
  state = { ...INITIAL_STATE }

  onSubmit = event => {
    const { email, passwordOne } = this.state

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState({ ...INITIAL_STATE })
        this.props.history.push("/")
      })
      .catch(error => {
        this.setState({ error })
      })

    event.preventDefault()
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const { email, passwordOne, passwordTwo, error } = this.state
    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === ""

    return (
      <form onSubmit={this.onSubmit} className="body-wrap">
        <div class="form-group">
          <label htmlFor="email">Email</label>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
        </div>
        <div class="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <div class="form-group">
          <label htmlFor="passwordTwo">Confirm password</label>
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <div class="form-group">
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>
        </div>

        <div class="form-group">
          {error && <p>{error.message}</p>}
        </div>
      </form>
    )
  }
}

const SignUpLink = () => (
  <p className="body-wrap">
    Don't have an account? <Link to="/signup">Sign Up</Link>
  </p>
)

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase)

export { SignUpPage, SignUpForm, SignUpLink }
