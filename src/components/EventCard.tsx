import { Card } from 'react-bootstrap';
// eslint-disable-next-line import/extensions
import { Event } from '@/lib/validationSchemas';

const EventCard = ({ contact }: { contact: Event }) => (
  <Card className="h-100 position-relative overflow-hidden">
    {/* Image */}
    <Card.Img
      src={contact.image}
      alt="event"
      style={{
        height: '250px',
        objectFit: 'cover',
        width: '100%',
        borderRadius: '0', // <-- this removes the curve
      }}
    />

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

      <Card.Text>
        {contact.description}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default EventCard;
