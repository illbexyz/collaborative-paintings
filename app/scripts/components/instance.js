import React from 'react';
import Firebase from 'firebase';
import ReactFire from 'reactfire';
import Rx from 'rx';

const Instance = React.createClass({

  mixins: [ReactFire],

  getInitialState() {
    return {
      lines: []
    };
  },

  componentWillMount() {
    this.bindAsArray(
      new Firebase(`https://incandescent-torch-4479.firebaseio.com/instances/${this.props.params.instanceId}/lines`),
      'lines'
    );
  },

  componentWillReceiveProps(nextProps) {
    this.unbind('lines');
    this.bindAsArray(
      new Firebase(`https://incandescent-torch-4479.firebaseio.com/instances/${nextProps.params.instanceId}/lines`),
      'lines'
    );
  },

  componentDidMount() {
    const canvas = this.getCanvas();
    canvas.width = 500;
    canvas.height = 500;

    const mouseup = Rx.Observable.fromEvent(canvas, 'mouseup');
    const mousemove = Rx.Observable.fromEvent(document, 'mousemove');
    const mousedown = Rx.Observable.fromEvent(canvas, 'mousedown');

    const mousedrag = mousedown.flatMap(() => {
      const mouseMoveToPoint = mouseEvent => {
        mouseEvent.preventDefault();
        return {
          x: mouseEvent.offsetX,
          y: mouseEvent.offsetY
        };
      };

      const pointsToLine = (array, point) => {
        return [...array, point];
      };

      const points = mousemove
        .map(mouseMoveToPoint)
        .takeUntil(mouseup);

      return points.reduce(pointsToLine, []);
    });

    mousedrag.subscribe(this.pushLine);
    this.updateCanvas();
  },

  componentDidUpdate() {
    this.updateCanvas();
  },

  render() {
    return (
      <canvas id={`canvas-${this.props.params.instanceId}`}>
      </canvas>
    );
  },

  updateCanvas() {
    const canvas = this.getCanvas();
    const ctx = this.getCtx();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // this.state.lines
    //   .forEach((p) => {
    //     ctx.fillRect(p.x, p.y, 2, 2);
    //   });
    ctx.beginPath();
    this.state.lines.forEach( line => {
      const firstPoint = line.points[0];
      ctx.moveTo(firstPoint.x, firstPoint.y);
      line.points.forEach( point => {
        ctx.lineTo(point.x, point.y);
      });
    });
    ctx.stroke();
  },

  getCanvas() {
    return document.getElementById(`canvas-${this.props.params.instanceId}`);
  },

  getCtx() {
    return this.getCanvas().getContext('2d');
  },

  pushPoints(pos) {
    this.firebaseRefs['points'].push({
      x: pos.left,
      y: pos.top,
      color: '#000000'
    });
  },

  pushLine(line) {
    this.firebaseRefs['lines'].push({
      points: line,
      color: '#000000'
    });
  }

});

export default Instance;
