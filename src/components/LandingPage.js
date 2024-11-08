import React from 'react';
import Slider from 'react-slick'; // Import Slider from react-slick
import 'slick-carousel/slick/slick.css'; // Import slick-carousel css
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel theme css
import './LandingPage.css'; // Import the custom CSS

const LandingPage = () => {
  // Slider settings
  const settings = {
    dots: true, // Enable dots
    infinite: true, // Infinite scrolling
    speed: 500, // Transition speed in milliseconds
    slidesToShow: 1, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Enable auto-scrolling
    autoplaySpeed: 3000, // Auto-scroll speed in milliseconds
    arrows: false, // Disable prev/next arrows
  };

  return (
    <div className="landing-container" style={{ marginTop: '20px' }}> {/* Add margin-top here */}
      <Slider {...settings}>
        <div>
          <img src="/clinic.jpg" alt="Slide 1" className="landing-image" />
        </div>
        <div>
          <img src="/surgery.jpg" alt="Slide 2" className="landing-image" />
        </div>
        <div>
          <img src="/final.jpg" alt="Slide 3" className="landing-image" />
        </div>
      </Slider>

      <div className="landing-content">
        <p>Find the best dental consultants for your needs and book appointments easily.</p>
      </div>
    </div>
  );
};

export default LandingPage;
