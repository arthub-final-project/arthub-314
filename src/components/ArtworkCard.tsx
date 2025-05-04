'use client';

import React from 'react';
import { Card } from 'react-bootstrap';

interface ArtworkCardProps {
  title: string;
  imageUrl: string;
}

const ArtworkCard = ({ title, imageUrl }: ArtworkCardProps) => (
  <Card
    bg="dark"
    style={{
      width: '20rem',
      padding: '0',
      borderWidth: '8px',
      borderColor: '#6b623b',
    }}
  >
    <Card.Img
      variant="top"
      src={imageUrl}
      alt={title}
      style={{ width: '100%', display: 'block' }}
    />
    <Card.Body style={{ color: 'white', textAlign: 'center' }}>
      <Card.Header as="h3" style={{ paddingTop: '0px' }}>{title}</Card.Header>
    </Card.Body>
  </Card>
);

export default ArtworkCard;
