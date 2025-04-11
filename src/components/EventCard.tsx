import { Card } from 'react-bootstrap';
// eslint-disable-next-line import/extensions
import { Event } from '@/lib/validationSchemas';

const EventCard = ({ contact }: { contact: Event }) => (
  <Card className="h-100 position-relative overflow-hidden">
    {/* Date in top left */}
    <div style={{
      position: 'absolute',
      top: '1rem',
      left: '1rem',
      backgroundColor: '#004F71', // your blue color
      color: 'white',
      padding: '0.5rem',
      textAlign: 'center',
      lineHeight: '1',
    }}
    >
      <div style={{ fontSize: '0.75rem' }}>MAY</div>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>3</div>
      <div style={{ fontSize: '0.75rem' }}>2025</div>
    </div>

    {/* Image */}
    <Card.Img src={contact.image} alt="event" />

    {/* O'ahu Banner */}
    <div style={{
      backgroundColor: '#FFC107',
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '0.5rem',
      height: '50px', // <- forces fixed height
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
    >
      {contact.address}
    </div>

    {/* Event Details */}
    <Card.Body>
      <Card.Title className="fw-bold">
        {contact.firstName}
        {' '}
        {contact.lastName}
      </Card.Title>

      <Card.Subtitle className="text-muted mb-2">
        Occurs between: May 3, 2025 - Dec 6, 2025
      </Card.Subtitle>

      <Card.Text>
        9:00AM - 11:30AM
      </Card.Text>

      <Card.Text>
        {contact.description}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default EventCard;
