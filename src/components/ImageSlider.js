// this file uses already existing files from a library used to 
// build 'carousel-like' elements in which images or other objects
// can slide from side to side. 
import styled from 'styled-components';
// contains the styles for the basic carousel functionality such as the
// arrows, dots, and slides. 
import 'slick-carousel/slick/slick.css';
// contains additional styles for sutomizing the look and feel of the carousel 
// such as the colors, fonts, and spacing. 
import 'slick-carousel/slick/slick-theme.css';
// The line import Slider from 'react-slick'; imports the Slider component 
// from the react-slick library.
// By importing Slider from react-slick, the component can be used in the React 
// application to create slick carousels or sliders with various customizable features.
import Slider from 'react-slick';

// the props are useful if properties are being passed to 'ImgSlider'
// when used inside a parent component for exmaple "<ImgSlider title="My Image Slider" />"
const ImgSlider = (props) => {
  // these properties are used by the 'Slider' component from the 
  // 'react-slick' library. 
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  return (
    <div>
      {/*all properties of the 'settings' object are passed to the 
      Carousel element.*/}
      <Carousel {...settings}>
        <Wrap>        
          <a>          
            <img src="../images/slider-badging.jpg" alt=""/>
          </a>
        </Wrap>
        <Wrap>        
          <a>          
            <img src="../images/slider-scale.jpg" alt=""/>
          </a>
        </Wrap>
        <Wrap>        
          <a>          
            <img src="../images/slider-badag.jpg" alt=""/>
          </a>
        </Wrap>
        <Wrap>        
          <a>          
            <img src="../images/slider-scales.jpg" alt=""/>
          </a>
        </Wrap>
      </Carousel>
    </div>
  )
};

const Carousel = styled(Slider)`
  margin-top: 20px;
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;

    &: hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &: before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -55px;
  }

  .slick-next {
    right: -55px;
  
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px, rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 4px;
    
    img { 
      width: 100%;
      height: 100%;
    }
  
    &:hover {
      padding: 0;
      border: 4px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
`;

export default ImgSlider;