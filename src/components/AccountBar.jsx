import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import { logOut } from '../modules/auth'

class AccountBar extends Component {
  logout = async () => {
    const response = await logOut()
    if (!response.authenticated){
      this.props.globalAuthHandler(false)
      this.props.goToPage('search')
    } else {
      console.log("Something went wrong")
    }
  }

  render() {
    let { goToPage, authenticated } = this.props
    let buttons;
    if ( authenticated ) {

      buttons = <a id="logout-link" onClick={() => this.logout()}>Log out {JSON.parse(sessionStorage.getItem("credentials")).uid}</a>
    } else {
      buttons = (
        <nav>
          <a id="login-link" onClick={() => goToPage('login')}>Login</a> |
          <a id="signup-link" onClick={() => goToPage('signup')}> Sign Up</a>
        </nav>
      )
    }

    return (
      <Container id="account-bar" align="right" style={{padding: "20px"}}>
        {buttons}
      </Container>
    )
  }
}

export default AccountBar;