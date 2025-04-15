'use client';
/* eslint-disable @next/next/no-img-element */
import { Container, Row, Col, Button } from 'react-bootstrap';
import CarouselComponent from '@/components/CarouseComponentl'; // Adjust the path as needed
/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Row>
        <h1 className="text-center">ArtHub Weekly Featured Artist Showcase</h1>
        <CarouselComponent />
      </Row>
    </Container>
    <Container className=" p-4" style={{ maxWidth: '1200px', minHeight: '400px' }}>
      <Row className="mt-4">
        <h2>Upcoming Events</h2>
      </Row>
      <Row>
        <Col>
          <Container className="border rounded p-4 my-4">
            <b className="d-block mb-2">March 28-29th</b>
            <img src="/eventexample3.jpg" alt="3" className="gallery-img" />
          </Container>
        </Col>
        <Col>
          <Container className="border rounded p-4 my-4">
            <b className="d-block mb-2">April 12th</b>
            <img src="/eventExample1.jpg" alt="3" className="gallery-img" />
          </Container>
        </Col>
        <Col>
          <Container className="border rounded p-4 my-4">
            <b className="d-block mb-2">May 16-18th</b>
            <img src="/eventexample2.jpg" alt="3" className="gallery-img" />
          </Container>
        </Col>
      </Row>
      <Row>
        <Container>
          <Row>
            <Col>
              <Container>
                <Button variant="info" href="/events">
                  see more events
                </Button>
              </Container>
            </Col>
          </Row>
        </Container>
      </Row>
    </Container>
  </main>
);

export default Home;
