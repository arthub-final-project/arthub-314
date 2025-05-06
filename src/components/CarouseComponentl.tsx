'use client';

/* eslint-disable @next/next/no-img-element */
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

const artists = [
  {
    name: 'Jane Smith',
    username: 'janesmith',
    mainImage: '/314mockupimage.jpg',
    gallery: [
      '/exampleArt1.png',
      '/understanding-abstract-art.jpg',
      '/exampleArt3.jpg',
    ],
  },
  {
    name: 'John Smith',
    username: 'johnsmith',
    mainImage: '/314mockupimage2.jpg',
    gallery: [
      '/exampleArt1.png',
      '/understanding-abstract-art.jpg',
      '/exampleArt3.jpg',
    ],
  },
  {
    name: 'Smith Smith',
    username: 'smithsmith',
    mainImage: '/314mockupimage3.jpg',
    gallery: [
      '/exampleArt1.png',
      '/understanding-abstract-art.jpg',
      '/exampleArt3.jpg',
    ],
  },
];

function CarouselFunc() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Carousel
        data-bs-theme="dark"
        style={{
          backgroundColor: 'white',
          borderRadius: '10px',
          maxWidth: '1100px',
          width: '100%',
        }}
      >
        {artists.map((artist) => (
          <Carousel.Item key={artist.username}>
            <img className="carousel-img" src={artist.mainImage} alt={artist.name} />
            <h5 className="carousel-username">{artist.name}</h5>
            <Carousel.Caption className="carousel-top">
              <Container style={{ maxWidth: '700px', minHeight: '250px', marginLeft: '175px' }}>
                <Row className="g-0">
                  {artist.gallery.map((img, index) => (
                    <Col key={index}>
                      <Container className="ps-4 py-4 my-4">
                        <img className="gallery-img" src={img} alt={`Artwork ${index + 1}`} />
                      </Container>
                    </Col>
                  ))}
                </Row>
                <Button variant="info" href={`/profile/${artist.username}`}>
                  See more from this artist
                </Button>
              </Container>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default CarouselFunc;
