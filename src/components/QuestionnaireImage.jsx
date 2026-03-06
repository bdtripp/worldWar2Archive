import React from 'react';

export default class QuestionnaireImage extends React.Component {
  
  render() {
    var image = this.props.image;
    
    return (
      <img src={"/images/" + image}></img>
    )
  }
}