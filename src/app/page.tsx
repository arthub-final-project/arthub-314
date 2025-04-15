'use client';

import { Col, Container, Row } from 'react-bootstrap';
import { Event } from '@/lib/validationSchemas';
import EventCard from '@/components/EventCard';

const events: Event[] = [
  {
    id: '1',
    firstName: 'Paradise Pineapple Painting with JennyBHawaii',
    lastName: '- First Saturday of Every Month',
    address: "O'AHU",
    description: 'Occurs between: May 3, 2025 - December 6, 2025\n9:00AM - 11:30AM',
    image: '/paint.png', // change this to your image path
  },
  {
    id: '2',
    firstName: 'JCCH Craft & Collectibles Fair',
    lastName: '',
    address: 'HONOLULU',
    description: 'Occurs between: May 10, 2025 - August 30, 2025\n1:00PM - 3:00PM',
    image: '/sidewalk.png',
  },
  {
    id: '3',
    firstName: 'Hawaii craftables Festival',
    lastName: '- 20th Anniversary Celebration',
    address: 'HONOLULU',
    description: 'Occurs between: May 10, 2025 - May 11, 2025\n10:00AM - 5:00PM',
    image: '/bowls.png',
  },
  {
    id: '4',
    firstName: 'Hawaii Art Exhibit',
    lastName: '- Oahu Event',
    address: 'OAHU',
    description: 'Occurs between: May 17, 2025 - May 19, 2025\n6:00PM - 9:00PM',
    image: '/exhibit.png',

  },
  {
    id: '5',
    firstName: 'Hand Crafted Art',
    lastName: '- Oahu Event',
    address: 'OAHU',
    description: 'Occurs between: May 24, 2025 - May 26, 2025\n10:00AM - 4:00PM',
    image: '/bowls.png',
  },
  {
    id: '6',
    firstName: 'Hawaii Art & Craft Collections',
    lastName: '- Oahu Event',
    address: 'OAHU',
    description: 'Occurs between: June 1, 2025 - June 3, 2025\n10:00AM - 4:00PM',
    image: '/Artssell.png',
  },
];

const HomePage = () => (
  <main>
    <Container className="py-4">
      <h1 className="text-center mb-4 fw-bold display-4">
        Upcoming Special Art Events
      </h1>

      <Row xs={1} md={2} lg={3} className="g-4">
        {events.map((event) => (
          <Col key={event.id}>
            <EventCard contact={event} />
          </Col>
        ))}
      </Row>
    </Container>
  </main>
);

export default HomePage;
