'use client';

import { Col, Container, Row } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { useEffect, useState } from 'react';
import { removeArtwork } from '@/lib/artworkActions';

type Artwork = {
  id: string;
  title: string;
  imageUrl: string;
};

const MyGallery = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const res = await fetch('/api/gallery/list');
      if (res.ok) {
        const data = await res.json();
        setArtworks(data);
        setLoading(false);
      } else {
        console.error('Failed to load gallery');
      }
    };
    fetchGallery();
  }, []);

  const handleRemoveArtwork = async (id: string) => {
    // Ensure sessionStorage is available and the user is correctly fetched
    console.log('Attempting to remove artwork with ID:', id);
    if (typeof window !== 'undefined') {
      const userJson = sessionStorage.getItem('user');
      if (!userJson) {
        console.error('No user found in sessionStorage');
        return;
      }
      const user = JSON.parse(userJson);

      try {
        // Call the removeArtwork function and pass the necessary parameters
        const response = await removeArtwork(id, user.id);

        if (response.success) {
          // Update the state to remove the deleted artwork
          setArtworks((prevArtworks) => prevArtworks.filter((artwork) => artwork.id !== id));
        } else {
          console.error('Failed to remove artwork:', response.error);
        }
      } catch (error) {
        console.error('Error during artwork removal:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#1e1e1e' }}>
        <div className="text-center text-white">
          <div className="spinner-border text-light mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h2>Loading gallery...</h2>
        </div>
      </div>
    );
  }

  return (
    <main>
      <Container id="artworks-page" fluid className="py-3" style={{ height: '110vh' }}>
        <Row className="justify-content-start flex-wrap">
          {artworks.map((artwork) => (
            <Col key={artwork.id} xs={6} md={2} className="mb-4 ms-5">
              <ArtworkCard
                key={artwork.id}
                title={artwork.title}
                imageUrl={artwork.imageUrl}
                onDelete={() => handleRemoveArtwork(artwork.id)}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default MyGallery;
