'use client';

import { Card, ListGroup } from 'react-bootstrap';
import { Profile } from '@prisma/client';
import Link from 'next/link';

const SmallProfileCard = ({ profile, notes }: { profile: Profile; notes: Note[] }) => (
    <Card className="h-100">
      <Card.Header>
        <img src={profile.image} alt={`${profile.name}`} width="75" />
      </Card.Header>
      <Card.Body>
        <Card.Title>{`${profile.name || 'Unknown'} ${profile.role || 'Collector'}`}</Card.Title>
        <Card.Subtitle>{profile.followers || '0'}</Card.Subtitle>
        <Card.Text>{}</Card.Text>
        <ListGroup variant="flush">
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <Link href={`edit/${profile.id}`}>Edit</Link>
      </Card.Footer>
    </Card>
  );
  
  export default SmallProfileCard;