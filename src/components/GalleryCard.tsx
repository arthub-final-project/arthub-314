/* eslint-disable @next/next/no-img-element */

'use client';

import { Card } from 'react-bootstrap';
import { GalleryItem, User } from '@/lib/validationSchemas';

const GalleryCard = ({ user, gallery }: { user: User, gallery: GalleryItem }) => (
  <Card className="h-100 shadow-sm">
    <Card.Img
      variant="top"
      src={gallery.image}
      alt={gallery.title}
      style={{ height: '250px', objectFit: 'cover' }}
    />
    <Card.Body>
      <Card.Title>{gallery.title}</Card.Title>
    </Card.Body>
    <Card.Footer className="d-flex align-items-center gap-2">
      <img
        src={user.profileImage}
        alt={user.name}
        width={32}
        height={32}
        style={{ borderRadius: '50%' }}
      />
      <small className="text-muted">{user.email}</small>
    </Card.Footer>
  </Card>
);

export default GalleryCard;
