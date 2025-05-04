'use client';

import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { removeArtwork } from '@/lib/artworkActions';

type Artwork = {
  id: string;
  title: string;
  imageUrl: string;
};

/** The Artworks page. */
const Artworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    const fetchArtworks = async () => {
      const response = await fetch('/api/gallery/upload');
      const data = await response.json();
      setArtworks(data);
      setLoading(false); // Set loading to false when data is ready
    };
    fetchArtworks();
  }, []);

  /* Set up real-time listener. It checks for new artworks in the database and updates artworks page.
  const channel = supabase
    .channel('realtime:gallery_items') // Create a real-time channel
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'GalleryItem' },
      (payload) => {
        const newArtwork = payload.new as Artwork;
        setArtworks((prev) => [...prev, newArtwork]); // Add the new artwork to the state
      },
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []); */

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

export default Artworks;
