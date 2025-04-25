'use client';

/* eslint-disable @next/next/no-img-element */
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

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
        <Carousel.Item>
          <img
            className="carousel-img"
            src="/314mockupimage.jpg"
            alt="First slide"
          />
          <h5 className="carousel-username">Jane Smith</h5>
          <Carousel.Caption className="carousel-top">
            <Container
              style={{
                maxWidth: '700px',
                minHeight: '250px',
                marginLeft: '175px',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Row className="g-0">
                <Col>
                  <Container className="ps-4 py-4 my-4">
                    <img className="gallery-img" src="/exampleArt1.png" alt="3" />
                  </Container>
                </Col>
                <Col>
                  <Container className="ps-0 py-4 my-4">
                    <img className="gallery-img" src="/understanding-abstract-art.jpg" alt="3" />
                  </Container>
                </Col>
                <Col>
                  <Container className="ps-0 py-4 my-4">
                    <img className="gallery-img" src="/exampleArt3.jpg" alt="3" />
                  </Container>
                </Col>
              </Row>
              <Button
                variant="info"
                href="/profile/janesmith"
              >
                See more from this artist
              </Button>
            </Container>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="carousel-img"
            src="/314mockupimage2.jpg"
            alt="First slide"
          />
          <h5 className="carousel-username">John Smith</h5>
          <Carousel.Caption className="carousel-top">
            <Container style={{ maxWidth: '700px', minHeight: '250px', marginLeft: '175px' }}>
              <Row className="g-0">
                <Col>
                  <Container className="ps-4 py-4 my-4">
                    <img className="gallery-img" src="/exampleArt1.png" alt="3" />
                  </Container>
                </Col>
                <Col>
                  <Container className="ps-0 py-4 my-4">
                    <img className="gallery-img" src="/understanding-abstract-art.jpg" alt="3" />
                  </Container>
                </Col>
                <Col>
                  <Container className="ps-0 py-4 my-4">
                    <img className="gallery-img" src="/exampleArt3.jpg" alt="3" />
                  </Container>
                </Col>
              </Row>
              <Button variant="info" href="/profile/janesmith">
                See more from this artist
              </Button>
            </Container>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="carousel-img"
            src="/314mockupimage3.jpg"
            alt="First slide"
          />
          <h5 className="carousel-username">Smith Smith</h5>
          <Carousel.Caption className="carousel-top">
            <Container style={{ maxWidth: '700px', minHeight: '250px', marginLeft: '175px' }}>
              <Row className="g-0">
                <Col>
                  <Container className="ps-4 py-4 my-4">
                    <img className="gallery-img" src="/exampleArt1.png" alt="3" />
                  </Container>
                </Col>
                <Col>
                  <Container className="ps-0 py-4 my-4">
                    <img className="gallery-img" src="/understanding-abstract-art.jpg" alt="3" />
                  </Container>
                </Col>
                <Col>
                  <Container className="ps-0 py-4 my-4">
                    <img className="gallery-img" src="/exampleArt3.jpg" alt="3" />
                  </Container>
                </Col>
              </Row>
              <Button variant="info" href="/profile/janesmith">
                See more from this artist
              </Button>
            </Container>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselFunc;
