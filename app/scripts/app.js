import React from 'react';
import AppRouter from './components/router';

window.React = React;
const mountNode = document.getElementById('app');

React.render(<AppRouter/>, mountNode);
