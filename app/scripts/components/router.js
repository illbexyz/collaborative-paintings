import React from 'react';
import Instances from './instances';
import Instance from './instance';
import { Router, Route, Link, browserHistory } from 'react-router';

const AppRouter = React.createClass({

  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={Instances}>
          <Route path="/instance/:instanceId" component={Instance}/>
        </Route>
        <Route path="*" component={Instances}/>
      </Router>
    );
  }

});

export default AppRouter;
