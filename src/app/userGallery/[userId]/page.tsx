'use client';

import { Container, Row } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

type Artwork = {
  id: string;
  title: string;
  imageUrl: string;
  user: {
    id: number;
    email: string;
  };
};

const UserGallery = () => {
  const { userId } = useParams();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      const res = await fetch(`/api/gallery/user/${userId}`);
      if (res.ok) {
        const data = await res.json();
        setArtworks(data);
      } else {
        console.error('Failed to load gallery');
      }
      setLoading(false);
    };

    if (userId) fetchGallery();
  }, [userId]);

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
          {artworks.map((artwork) => (
            <div key={artwork.id} className="col-sm-6">
              <ArtworkCard
                title={artwork.title}
                imageUrl={artwork.imageUrl}
                artistEmail={artwork.user?.email || ''}
                showDeleteButton={false}
              />
            </div>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default UserGallery;
