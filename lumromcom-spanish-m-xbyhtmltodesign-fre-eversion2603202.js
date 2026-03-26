import React from 'react'
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import './style.css'
import LumromcomSpanishMXbyhtmltodesignFREEversion2603202 from './views/lumromcom-spanish-m-xbyhtmltodesign-fre-eversion2603202'
import NotFound from './views/not-found'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route
          component={LumromcomSpanishMXbyhtmltodesignFREEversion2603202}
          exact
          path="/"
        />
        <Route component={NotFound} path="**" />
        <Redirect to="**" />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
