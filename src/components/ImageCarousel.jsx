import { useState } from "react";
import { useEffect } from "react";
import Arrow from './Arrow.jsx';

export default function ImageCarousel({ imgNames }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageStyle, setImageStyle] = useState({
    maxHeight: "none",
    display: "none"
  });
  const [arrowStyle, setArrowStyle] = useState({opacity: 0});
  const [countDisplayStyle, setCountDisplayStyle] = useState({display: "none"});
  const [showingArrows, setShowingArrows] = useState(true);
  const [inMobile, setinMobile] = useState(false);

  window.addEventListener("resize", () => {
    updateViewSize();
    resizeImage();
  });

  useEffect(() => {
    updateViewSize();
    resizeImage();
    setArrowStyle({opacity: .7});
    setCountDisplayStyle({display: "block"});
    setImageStyle({
      maxHeight: inMobile ? "none" : (window.visualViewport.height + "px"),
      display: "block"
    });
  }, []);
  
  const prevImage = () => {
    const lastIndex = imgNames.length - 1;
    const loopAround = currentImageIndex === 0;

    setCurrentImageIndex(loopAround ? lastIndex : currentImageIndex - 1);
  }
  
  const nextImage = () => {
    const lastIndex = imgNames.length - 1;
    const loopAround = currentImageIndex === lastIndex;
    setCurrentImageIndex(loopAround ? 0 : currentImageIndex + 1);
  }
  
  const resizeImage = () => {
    setImageStyle({
      maxHeight: inMobile ? "none" : window.visualViewport.height + "px",
      display: "block"
    });
  }
  
  const toggleArrows = () => {
    if (inMobile) {
      if (showingArrows) {
        setShowingArrows(false);
        setArrowStyle({
          opacity: 0
        });
      } else {
        this.setState({
          showingArrows: true,
          arrowStyle: {
            opacity: .7
          }
        });
      }
    }
  }
  
  const updateViewSize = () => {
    this.setState({
      inMobile: window.innerWidth < 700
    })
  }
  
  render() {
    var imgNames = this.props.imgNames;
    
    if (imgNames.length > 1) {
      return (  
        <div id="image_carousel">
          <div id="image_container">
            <p id="count_display" style={this.state.countDisplayStyle}>{(this.state.currentImageIndex + 1) + " of " + imgNames.length}</p>
            <img id="questionnaire_image" src={"/images/questionnaires/" + imgNames[this.state.currentImageIndex]} style={this.state.imageStyle} onClick={this.toggleArrows}/>
            <Arrow style={this.state.arrowStyle} direction="left" clickHandler={this.prevImage}/>
            <Arrow style={this.state.arrowStyle} direction="right" clickHandler={this.nextImage}/>
          </div>
        </div>                             
      ); 
    } else {
      return (  
        <div id="image_carousel">
          <div id="image_container">
            <p id="count_display" style={this.state.countDisplayStyle}>{(this.state.currentImageIndex + 1) + " of " + imgNames.length}</p>
            <img id="questionnaire_image" src={"/images/questionnaires/" + imgNames[this.state.currentImageIndex]} style={this.state.imageStyle} onClick={this.toggleArrows}/>
          </div>
        </div>                             
      ); 
    }
  }
}