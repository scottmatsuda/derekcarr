import React, { Component } from 'react';
import DerekCarr from './DerekCarr';
import YesChart from './YesChart';
import NoChart from './NoChart';
import { withRouter, Route } from 'react-router-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Chart from 'chart.js/auto';

class App extends Component {

  render() {
    return (
       <Router>
          <Route path="/" exact={true} component={DerekCarr} />
          <Route path="/yes" exact={true} component={YesChart} />
          <Route path="/no" exact={true} component={NoChart} />
        </Router>
    );
  }
}

export default withRouter(App);