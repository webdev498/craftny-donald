import React, { Component } from "react"
import { FeedItem } from "./feeditem"
import { Redirect } from "react-router-dom"
import { withFirebase } from "./firebase"
import { compose } from "recompose"

class Layout extends Component {
  render() {
    return <div className="body-wrap">{this.props.children}</div>
  }
}

class FavoritesBase extends Component {
  state = {
    feedItems: []
  }

  componentDidMount() {
    if (this.props.firebase.auth.currentUser) {
      this.getFeedItems()
    }
  }

  async getFeedItems() {
    console.log(this.props)
    const userEmail = this.props.firebase.auth.currentUser.email
      .replace("@", "_")
      .replace(".", "_")
    this.props.firebase.database
      .ref(`users/${userEmail}`)
      .once("value")
      .then(data => {
        const faves = data.val()
        return Object.keys(faves).map(key => {
          faves[key].id = key
          return faves[key]
        })
      })
      .then(faveList => {
        this.setState({ feedItems: faveList })
      })
      .catch(err => {
        console.log(err)
      })
  }

  onRemove = itemId => {
    this.setState( { feedItems : this.state.feedItems.filter(item => item.id !== itemId) } );
  }

  render() {
    return this.props.firebase.auth.currentUser ? (
      <Layout>
        <div className="feed-list">
          {this.state.feedItems.length > 0 ?
          (this.state.feedItems.map(faveItem => {
            console.log(this.state.feedItems)
            return (
              <FeedItem
                key={faveItem.id}
                id={faveItem.id}
                title={faveItem.title}
                url={faveItem.url}
                author={faveItem.author}
                created_utc={faveItem.created_utc}
                score={faveItem.score}
                isFavoriteList="true"
                onRemove={this.onRemove}
              />
            )
          })) : (
            <div className="faves-empty">No favorites yet.</div>
          )}
        </div>
      </Layout>
    ) : (
      <Redirect to="/signin" />
    )
  }
}

const Favorites = compose(withFirebase)(FavoritesBase)

export { Favorites }
