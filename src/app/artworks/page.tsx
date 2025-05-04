'use client';

import { useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import Link from 'next/link';

interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
}

const Artworks = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[] | null>(null);

  useEffect(() => {
    const fetchGallery = async () => {
      const res = await fetch('/api/gallery/list');
      if (res.ok) {
        const data = await res.json();
        setGalleryItems(data);
      } else {
        console.error('Failed to load gallery');
      }
    };
    fetchGallery();
  }, []);

  return (
    <main>
      <Container id="artworks-page" fluid className="py-3" style={{ minHeight: '110vh' }}>
        {/* Upload button row */}
        <Row className="mb-3 justify-content-end pe-4">
          <Col xs="auto">
            <Link href="/upload" passHref>
              <button type="button" className="btn btn-primary rounded-pill">Upload New Artwork</button>
            </Link>
          </Col>
        </Row>

        {/* Gallery items */}
        <Row className="justify-content-center">
          {galleryItems ? (
            galleryItems.map((item) => (
              <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <ArtworkCard title={item.title} imageUrl={item.imageUrl} />
              </Col>
            ))
          ) : (
            <Spinner animation="border" variant="light" />
          )}
        </Row>
      </Container>
    </main>
  );
};

export default Artworks;
