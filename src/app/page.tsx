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
];

const HomePage = () => (
  <main>
    <Container className="py-4">
      <h1 className="text-center mb-4 fw-bold display-4">
        Upcoming Special Events
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

// CalendarEventFill
// GeoAltFill
// ClockFill
