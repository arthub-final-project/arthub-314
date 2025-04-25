'use client';

import { Col, Container, Row } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

type Artwork = {
  id: number;
  title: string;
  imageUrl: string;
};

/** The Artworks page. */
const Artworks = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      const response = await fetch('/api/gallery-items'); // Fetch data from your API route
      const data = await response.json();
      setArtworks(data);
    };

    fetchArtworks();

    // Set up real-time listener. It checks for new artworks in the database and updates artworks page.
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
  }, []);

  return (
    <main>
      <Container id="artworks-page" fluid className="py-3" style={{ height: '110vh' }}>
        <Row className="justify-content-start flex-wrap">
          {artworks.map((artwork) => (
            <Col key={artwork.id} xs={6} md={3} className="mb-4">
              <ArtworkCard
                title={artwork.title}
                imageUrl={artwork.imageUrl}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </main>
  );
};

export default Artworks;
