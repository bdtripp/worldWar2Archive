import React from 'react';

export default class Arrow extends React.Component {
  
  render() {
    var direction = this.props.direction;
    var clickHandler = this.props.clickHandler;
    var style = this.props.style;
    
    return (
      <img id={direction + "_arrow"} className= "arrow" src={"/images/" + direction + "_arrow" + ".png"} onClick={clickHandler} style={style}></img>
    )
  }
}