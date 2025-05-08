'use client';

import { Container, Row } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { useEffect, useState } from 'react';
import { removeArtwork } from '@/lib/artworkActions';

type Artwork = {
  id: string;
  title: string;
  imageUrl: string;
  user: {
    id: number;
    email: string;
  };
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

  const handleRemoveArtwork = async (id: string, userId: number) => {
    console.log('Attempting to remove artwork with ID:', id);
    try {
      const response = await removeArtwork(id, userId);

      if (response.success) {
        setArtworks((prevArtworks) => prevArtworks.filter((artwork) => artwork.id !== id));
      } else {
        console.error('Failed to remove artwork:', response.error);
      }
    } catch (error) {
      console.error('Error during artwork removal:', error);
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
      <Container id="artworks-page" fluid className="py-3 d-flex justify-content-center" style={{ minHeight: '100vh' }}>
        <Row
          style={{
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '5rem',
            width: '75%',
            justifyContent: 'center',
          }}
        >
          {artworks
            .filter((artwork) => artwork.user && artwork.user.email)
            .map((artwork) => (
              <div key={artwork.id} className="col-sm-6">
                <ArtworkCard
                  title={artwork.title}
                  imageUrl={artwork.imageUrl}
                  artistEmail={artwork.user?.email || ''}
                  onDelete={() => handleRemoveArtwork(artwork.id, artwork.user.id)}
                  showDeleteButton
                />
              </div>
            ))}
        </Row>
      </Container>
    </main>
  );
};

export default MyGallery;
