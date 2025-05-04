'use client';

import { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

type Artwork = {
  id: string;
  title: string;
  imageUrl: string;
  user: {
    email: string;
  };
};

/** The Artworks page. */
const Artworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const fetchArtworks = async () => {
      try {
        const response = await fetch('/api/gallery/upload');
        const data = await response.json();

        if (!response.ok) {
          console.error('Fetch failed:', data.error || data);
          setArtworks([]); // fallback
          return;
        }

        if (Array.isArray(data)) {
          setArtworks(data);
        } else {
          console.error('Unexpected data format:', data);
          setArtworks([]); // fallback
        }
      } catch (err) {
        console.error('Error fetching artworks:', err);
        setArtworks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  // Shows a loading spinner while fetching data, customizable here
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

  console.log('Artworks being rendered:', artworks);

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
                artistEmail={artwork.user.email}
                showDeleteButton={false}
              />
            </div>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default Artworks;
