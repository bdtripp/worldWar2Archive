import { useState } from "react";
import { useEffect } from "react";
import Arrow from './Arrow.jsx';

export default function ImageCarousel({ imgNames }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageStyle, setImageStyle] = useState({
    maxHeight: "none",
    display: "none"
  });
  const [countDisplayStyle, setCountDisplayStyle] = useState({display: "none"});
  const [showingArrows, setShowingArrows] = useState(true);
  const [inMobile, setInMobile] = useState(false);

  const arrowStyle = { opacity: showingArrows ? .7 : 0 };

  useEffect(() => {
    updateViewSize();
    resizeImage();
    setCountDisplayStyle({display: "block"});
    setImageStyle({
      maxHeight: inMobile ? "none" : (window.visualViewport.height + "px"),
      display: "block"
    });
    const handler = () => {
      updateViewSize();
      resizeImage();
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [inMobile]);
  
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
        setShowingArrows(true);
        setArrowStyle({
          opacity: .7
        });
      }
    }
  }
  
  const updateViewSize = () => {
      setInMobile(window.innerWidth < 700);
  }

  return ( 
    <div id="image_carousel">
      <div id="image_container">
        <p 
          id="count_display" 
          style={countDisplayStyle}>{currentImageIndex + 1 + " of " + imgNames.length}
        </p>
        <img 
          id="questionnaire_image" 
          src={"/images/questionnaires/" + imgNames[currentImageIndex]} 
          style={imageStyle} 
          onClick={toggleArrows}
        />
        {imgNames.length > 1 && (
          <>
            <Arrow style={arrowStyle} direction="left" clickHandler={prevImage}/>
            <Arrow style={arrowStyle} direction="right" clickHandler={nextImage}/>
          </>
        )}
      </div>
    </div>                            
  ); 
}