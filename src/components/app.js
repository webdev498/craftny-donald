import React, { Component } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import { FeedList } from "./layout"
import { Favorites } from "./favorites"
import { Header } from "./header"
import { Signin, Signup, SignOutButton } from "./auth/auth"
import { withFirebase } from "./firebase"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      authUser: null
    }
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser ? this.setState({ authUser }) : this.setState({ authUser: null })
    })
  }

  componentWillUnmount() {
    this.listener()
  }

  render() {
    return (
      <Router>
        <div>
          <Header authUser={this.state.authUser} />
          <Route exact path="/" component={FeedList} />
          <Route
            path="/feed"
            render={props => <FeedList {...props} authUser={this.state} />}
          />
          <Route
            path="/favorites"
            render={props => <Favorites {...props} authUser={this.state} />}
          />
          {/* <ProtectedRoute
            path="/favorites"
            component={Favorites}
            authUser={this.state.authUser}
            firebase={this.state.firebase}
          /> */}
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={SignOutButton} />
        </div>
      </Router>
    )
  }
}

// render(
//   <FirebaseContext.Provider value={new Firebase()}>
//     <App />
//   </FirebaseContext.Provider>,
//   document.getElementById("root")
// )
export default withFirebase(App)
