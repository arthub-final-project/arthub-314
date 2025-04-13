'use client';

import { Container } from 'react-bootstrap';
import UploadForm from '@/components/UploadForm';

export default function UploadPage() {
  return (
    <Container className="py-5">
      <h1 className="mb-4 fw-bold text-center">Upload Artwork</h1>
      <UploadForm />
    </Container>
  );
}
