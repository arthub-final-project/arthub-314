/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Modal } from 'react-bootstrap';

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
    <Modal.Header closeButton closeVariant="white" className="art-modal-header">
      <Modal.Title>{artwork?.title}</Modal.Title>
    </Modal.Header>
    <Modal.Body className="art-modal-body text-center">
      {artwork && (
        <>
          <img
            src={artwork.imageUrl}
            alt={artwork.title}
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
