import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UncontrolledCarousel } from 'reactstrap'; 

function CustomCarousel() {
  return (
    <div>
      <style>{`
        .carousel-item2  {
          height: 750px;
          object-fit: cover;
          background: #23856D; 
        }
      `}</style>
      <div className=''>
        <UncontrolledCarousel
          items={[
            {
              altText: '',
              caption: '',
              key: 1,
              src: 'slider2.png'
            },
            {
              altText: '',
              caption: '',
              key: 2,
              src: 'slider2.png'
            },
            {
              altText: '',
              caption: '',
              key: 3,
              src: 'slider2.png'
            }
          ]}
        />
      </div>
    </div>
  );
}

export default CustomCarousel;
