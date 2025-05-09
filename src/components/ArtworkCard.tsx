'use client';

/* eslint-disable react/require-default-props */
import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import ArtworkModal from './ArtworkModal';

type ArtworkCardProps = {
  title: string;
  imageUrl: string;
  artistEmail?: string;
  onDelete?: () => void;
  showDeleteButton: boolean;
};

const ArtworkCard: React.FC<ArtworkCardProps> = ({ title, imageUrl, artistEmail, onDelete, showDeleteButton = true }) => {
  const [selectedArtwork, setSelectedArtwork] = useState<{
    imageUrl: string;
    title: string;
    artistEmail?: string;
  } | null>(null);

  const handleImageClick = () => {
    setSelectedArtwork({ imageUrl, title, artistEmail });
  };

  const handleModalClose = () => {
    setSelectedArtwork(null);
  };

  return (
    <>
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
          onClick={handleImageClick}
        >
          <Card.Img
            variant="top"
            src={imageUrl}
            alt="Click me"
            style={{ width: '100%', display: 'block' }}
          />
        </button>
        <Card.Body style={{ color: 'white', textAlign: 'center' }}>
          <Card.Header as="h3" style={{ paddingTop: '0px' }}>{title}</Card.Header>
          <Card.Text as="h6" style={{ marginTop: '10px' }}>{artistEmail}</Card.Text>
          {showDeleteButton && onDelete && (
            <Button variant="danger" onClick={onDelete}>
              Delete
            </Button>
          )}
        </Card.Body>
      </Card>

      <ArtworkModal artwork={selectedArtwork} onClose={handleModalClose} />
    </>
  );
};

export default ArtworkCard;
