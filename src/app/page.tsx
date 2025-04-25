'use client';

/* eslint-disable @next/next/no-img-element */
import { Container, Row, Col, Button } from 'react-bootstrap';
import CarouselComponent from '@/components/CarouseComponentl'; // Adjust the path as needed
/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Container>
        <Row>
          <h1 className="text-center text-outline">ArtHub Weekly Featured Artist Showcase</h1>
          <CarouselComponent />
        </Row>
      </Container>
      <Container
        className=" p-4"
        style={{
          maxWidth: '1200px',
          minHeight: '400px',
        }}
      >
        <Row className="mt-4">
          <h2 className="text-outline text-center ">Upcoming Events</h2>
        </Row>
        <Row>
          <Col>
            <Container
              className="border rounded p-4 my-4 bg-white"
              style={{ width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <b className="d-block mb-2">March 28-29th</b>
              <img src="/eventExample3.jpg" alt="3" className="gallery-img" />
            </Container>
          </Col>
          <Col>
            <Container
              className="border rounded p-4 my-4 bg-white"
              style={{ width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <b className="d-block mb-2">April 12th</b>
              <img src="/eventExample1.jpg" alt="3" className="gallery-img" />
            </Container>
          </Col>
          <Col>
            <Container
              className="border rounded p-4 my-4 bg-white"
              style={{ width: '300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <b className="d-block mb-2">May 16-18th</b>
              <img src="/eventexample2.jpg" alt="3" className="gallery-img" />
            </Container>
          </Col>
        </Row>
        <Row>
          <Container>
            <Row>
              <Col>
                <Container
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Button variant="info" href="/eventsPage">
                    see more events
                  </Button>
                </Container>
              </Col>
            </Row>
          </Container>
        </Row>
      </Container>
    </Container>
  </main>
);

export default Home;
