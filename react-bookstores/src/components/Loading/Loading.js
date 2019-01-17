import React from 'react';
import './styles.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-wrapper">
        <div  className="loader-bg"/>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default Loading