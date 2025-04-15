'use client';
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

const ArtworkCard = () => (
  <Card bg={'dark'} border={"light"} style={{ width: '20rem', padding: '0', borderWidth: '2px' }}>
    <a href="#" style={{ display: 'block' }}>
      <Card.Img
      variant="top"
      src="/medieval.webp"
      alt="Click me"
      style={{ width: '100%', display: 'block' }} 
      />
    </a>
    <Card.Body style={{ color: 'white', textAlign: 'center'}}>
      <Card.Header as="h3" style={{ paddingTop: '0px' }}>Artwork Title</Card.Header>
      <Card.Text as="h6" style={{ marginTop: '10px' }}>Artist Name</Card.Text>
    </Card.Body>
  </Card>
);

export default ArtworkCard;