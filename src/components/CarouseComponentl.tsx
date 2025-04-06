'use client';

/* eslint-disable @next/next/no-img-element */
import Carousel from 'react-bootstrap/Carousel';

function CarouselFunc() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          src="/314mockupimage.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>Jane Smith</h5>
          <p>Gallery cards somewhere here</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/314mockupimage2.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>John Smith</h5>
          <p>Gallery cards somewhere here</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/314mockupimage3.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>Guy</h5>
          <p>Gallery cards somewhere here</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselFunc;
