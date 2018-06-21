import React, { Component } from 'react'
import '../styles/App.css'
import User from './User'
import RestaurantList from './RestaurantList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={process.env.PUBLIC_URL +  '/img/sysco_blck-wht.png'} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to MAHI</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <User />
        <RestaurantList />
      </div>
    );
  }
}

export default App;
