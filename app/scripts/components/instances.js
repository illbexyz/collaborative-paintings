import React from 'react';
import Firebase from 'firebase';
import ReactFire from 'reactfire';
import Progress from './progress';

import { Link } from 'react-router';

const Instances = React.createClass({

  mixins: [ReactFire],

  getInitialState() {
    return {
      instances: []
    };
  },

  componentWillMount: function() {
    this.bindAsArray(
      new Firebase('https://incandescent-torch-4479.firebaseio.com/instances'),
      'instances'
    );
  },

  render() {
    let element;
    if(this.stillLoading()) {
      element = <Progress/>;
    } else {
      element = (
        <ul className="sidebar-nav">
          {this.state.instances.map(this.renderItem)}
          <li><a onClick={this.pushInstance}>+</a></li>
        </ul>
      );
    }

    return (
      <div>
        <div id="sidebar-wrapper">
          {element}
        </div>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  },

  renderItem(item, index) {
    return (
      <li key={index}>
        <Link to={`/instance/${item['.key']}`}>{item['.key']}</Link>
      </li>
    );
  },

  stillLoading() {
    return this.state.instances.length == 0;
  },

  pushInstance() {
    this.firebaseRefs['instances'].push({
      lines: 0
    });
  }
});

export default Instances;
