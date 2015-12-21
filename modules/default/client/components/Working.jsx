import React from 'react';
import Radium from 'radium';


var styles = {
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    flex: 1,
  },
  title: {
    color: '#eee',
    fontSize: 50,
    justifyContent: 'center',
    alignSelf: 'center',
  },
};

var Working = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
  },

  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>{this.props.text}</h1>
      </div>
    );
  },
});

export default Radium(Working);
