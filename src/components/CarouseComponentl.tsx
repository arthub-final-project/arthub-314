'use client';

import Carousel from 'react-bootstrap/Carousel';
import { Col, Container, Row, Button } from 'react-bootstrap';
import Image from 'next/image';

// eslint-disable-next-line react/prop-types
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
  // 🔍 Initial check for empty or invalid user array
  if (!Array.isArray(users) || users.length === 0) {
    console.log('🛑 users is empty or not an array:', users);
    return (
      <div className="text-center my-5">
        <h5>No featured artists found.</h5>
        <p>DEV: Add some users with gallery items to your database to populate the carousel.</p>
      </div>
    );
  }

  // 🔍 Log full users array
  console.log('👥 USERS:', users);

  return (
    <Carousel>
      {users.map((user, index) => {
        // 🔍 Log individual user's gallery items
        console.log(`🎨 Gallery items for ${user.profile?.name || 'Unknown'}:`, user.galleryItems);

        return (
          // eslint-disable-next-line react/no-array-index-key
          <Carousel.Item key={index}>
            <Image
              src={user.profile?.image || '/placeholder.jpg'}
              alt={user.profile?.name || 'Unknown Artist'}
              className="rounded-circle"
              width={100}
              height={100}
              style={{ objectFit: 'cover' }}
            />
            <h5 className="carousel-username mt-2">{user.profile?.name || 'Unknown Artist'}</h5>

            <Carousel.Caption className="carousel-top">
              <Container style={{ maxWidth: '850px', minHeight: '250px', marginLeft: '250px' }}>
                <Row>
                  {/* Show first 3 gallery items */}
                  {user.galleryItems.slice(0, 3).map((item, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Col key={i}>
                      <Container className="p-4 my-4">
                        <Image
                          className="gallery-img"
                          src={item.imageUrl}
                          alt={item.title}
                          width={300}
                          height={300}
                          style={{ objectFit: 'cover' }}
                        />
                      </Container>
                    </Col>
                  ))}
                </Row>
              </Container>
              <Button variant="info" href={`/profile/${user.id}`}>
                See more from this artist
              </Button>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}

export default CarouselFunc;
