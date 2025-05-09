import React from 'react';
import { Modal } from 'react-bootstrap';
import Image from 'next/image';

type ArtworkModalProps = {
  artwork: {
    imageUrl: string;
    title: string;
    artistEmail?: string;
  } | null;
  onClose: () => void;
};

const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, onClose }) => (
  <Modal show={!!artwork} onHide={onClose} size="xl" centered>
    <Modal.Header closeButton>
      <Modal.Title>{artwork?.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="text-center">
      {artwork && (
        <>
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            width={800}
            height={600}
            style={{ maxWidth: '100%', height: 'auto', objectFit: 'contain' }}
          />
          {artwork.artistEmail && (
            <div className="mt-3 text-muted">
              By:
              <br />
                {artwork.artistEmail}
            </div>
          )}
        </>
      )}
    </Modal.Body>
  </Modal>
);

export default ArtworkModal;
