import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UncontrolledCarousel } from 'reactstrap'; 

function CustomCarousel() {
  return (
    <div>
      <style>{`
        .carousel-item  {
          height: 750px;
          object-fit: cover; 
        }
      `}</style>
      <div className=''>
        <UncontrolledCarousel
          items={[
            {
              altText: '',
              caption: '',
              key: 1,
              src: 'slider3.jpeg'
            },
            {
              altText: '',
              caption: '',
              key: 2,
              src: 'slider3.jpeg'
            },
            {
              altText: '',
              caption: '',
              key: 3,
              src: 'slider3.jpeg'
            }
          ]}
        />
      </div>
    </div>
  );
}

export default CustomCarousel;
