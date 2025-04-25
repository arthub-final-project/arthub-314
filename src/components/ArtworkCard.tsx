'use client';

import React from 'react';
import { Card } from 'react-bootstrap';

const ArtworkCard = () => (
  <Card
    bg="dark"
    style={{
      width: '20rem',
      padding: '0',
      borderWidth: '8px',
      borderColor: '#6b623b',
    }}
  >
    <button
      type="button"
      style={{
        display: 'block',
        background: 'none',
        border: 'none',
        padding: '0',
        cursor: 'pointer',
      }}
    >
      <Card.Img
        variant="top"
        src="/medieval.webp"
        alt="Click me"
        style={{ width: '100%', display: 'block' }}
      />
    </button>
    <Card.Body style={{ color: 'white', textAlign: 'center' }}>
      <Card.Header as="h3" style={{ paddingTop: '0px' }}>Artwork Title</Card.Header>
      <Card.Text as="h6" style={{ marginTop: '10px' }}>Artist Name</Card.Text>
    </Card.Body>
  </Card>
);

export default ArtworkCard;
