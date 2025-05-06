/* eslint-disable arrow-body-style */
/* eslint-disable react/no-array-index-key */

'use client';

import Carousel from 'react-bootstrap/Carousel';
import { Col, Container, Row, Button } from 'react-bootstrap';
import Image from 'next/image';

interface User {
  id: number;
  profile?: {
    image?: string;
    name?: string;
  } | null;
  galleryItems: {
    imageUrl: string;
    title: string;
  }[];
}

function CarouselFunc({ users }: { users: User[] }) {
  if (!Array.isArray(users) || users.length === 0) {
    console.log('🛑 users is empty or not an array:', users);
    return (
      <div className="text-center my-5">
        <h5>No featured artists found.</h5>
        <p>DEV: Add some users with gallery items to your database to populate the carousel.</p>
      </div>
    );
  }

  return (
    <Carousel className="mb-5">
      {users.map((user, index) => (
        <Carousel.Item key={index}>
          {/* Force the caption to behave like normal block content */}
          <div style={{ position: 'static', textAlign: 'center' }}>
            <Container>
              {/* Gallery Images */}
              <Row className="justify-content-center mb-2">
                {user.galleryItems.slice(0, 3).map((item, i) => (
                  <Col key={i} xs={12} sm={6} md={4} className="mb-1">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={300}
                      height={300}
                      style={{
                        objectFit: 'cover',
                        borderRadius: '12px',
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    />
                    <div>
                      <p
                        className="mt-2"
                        style={{
                          color: 'white',
                          backgroundColor: 'rgba(34, 34, 34, 0.7)',
                          borderRadius: '15px',
                          padding: '10px',
                          boxShadow: '0 0 10px rgba(0, 0, 0, 0)',
                          maxWidth: '900px',
                          marginBottom: '20px',
                        }}
                      >
                        {item.title}
                      </p>
                    </div>
                  </Col>
                ))}
              </Row>
              <Row className="justify-content-center">
                <Col xs="auto">
                  <Image
                    src={user.profile?.image || '/placeholder.jpg'}
                    alt={user.profile?.name || 'Unknown Artist'}
                    className="rounded-circle"
                    width={250}
                    height={250}
                    style={{ objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      color: 'white',
                      backgroundColor: 'rgba(34, 34, 34, 0.7)',
                      borderRadius: '15px',
                      padding: '10px',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0)',
                      maxWidth: '900px',
                      marginTop: '20px',
                    }}
                  >
                    <h4 className="mt-3">{user.profile?.name || 'Unknown Artist'}</h4>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center mt-3 mb-5">
                <Col xs="auto">
                  <Button variant="info" href={`/profile/${user.id}`}>
                    See more from this artist
                  </Button>
                </Col>
              </Row>
              {/* 3. Profile Picture & Name - Now it's properly below */}
            </Container>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselFunc;
