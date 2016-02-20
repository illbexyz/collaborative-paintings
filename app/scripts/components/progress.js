import React from 'react';

const Progress = React.createClass({

  render() {
    return (
      <div>
        <div className="progress">
          <div className="progress-bar progress-bar-danger progress-bar-striped active" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
            <span className="sr-only">100% Complete</span>
          </div>
        </div>
      </div>
    );
  }
});

export default Progress;
