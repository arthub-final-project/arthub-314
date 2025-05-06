'use client';

/* eslint-disable @next/next/no-img-element */
import { Container, Row, Col, Button } from 'react-bootstrap';
import CarouselComponent from '@/components/CarouseComponentl';
import { useState, useEffect } from 'react';
import { UserWithStuff } from './types/UserWithStuff';

const Home = () => {
  const [users, setUsers] = useState<UserWithStuff[] | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch('/api/users/featured');
        console.log('📡 Fetched response:', res);

        if (!res.ok) {
          console.error(`❌ Failed to fetch users: ${res.status}`);
          return;
        }

        const data = await res.json();
        console.log('📦 Parsed users:', data);

        setUsers(data);
      } catch (err) {
        console.error('💥 Fetch failed:', err);
      }
    }

    fetchUsers();
  }, []);
  if (!users) return <p className="text-center">Loading...</p>;

  return (
    <main>
      <Container id="landing-page" fluid className="py-5">
        <Row className="justify-content-center">
          <div style={{
            backgroundColor: 'rgba(34, 34, 34, 0.7)',
            borderRadius: '30px',
            padding: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0)',
            maxWidth: '900px',
            marginBottom: '20px',
          }}
          >
            <h1 style={{ color: 'white' }} className="text-center">ArtHub Weekly Featured Artist Showcase</h1>
          </div>
          <CarouselComponent users={users} />
        </Row>
      </Container>
      <Container className="p-4" style={{ maxWidth: '1200px', minHeight: '400px' }}>
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
                  <Button variant="info" href="/eventsPage">
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
};

export default Home;
