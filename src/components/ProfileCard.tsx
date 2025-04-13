'use client';

import { Card, Image, Row, Col } from 'react-bootstrap';
import { Profile } from '@prisma/client';
import Link from 'next/link';

const ProfileCard = ({ profile }: { profile: Profile }) => (
  <Card className="my-4 shadow-sm rounded border-0 p-3">
    <Row className="align-items-center gx-4">
      {/* Profile Image */}
      <Col xs="auto" className="mb-5">
        <Image
          src={profile.image}
          alt={`${profile.name}'s profile`}
          roundedCircle
          width={100}
          height={100}
          className="border"
          style={{ objectFit: 'cover' }}
        />
      </Col>

      {/* Info */}
      <Col>
        <h4 className="fw-bold mb-2">{profile.name}</h4>
        <p className="text-muted small mb-2">
          {profile.contact}
          {profile.contact && profile.socialMedia && ' / '}
          {profile.socialMedia}
        </p>
        {profile.description && <p className="mb-3">{profile.description}</p>}
        <div className="col-md-13 d-flex justify-content-end">
          <button type="button" className="btn btn-primary me-2">Follow</button>
          <button type="button" className="btn btn-outline-primary">Message</button>
        </div>
      </Col>
    </Row>

    {/* Art Image */}
    {profile.artpiece && (
      <div className="mt-2 text-left">
        <h6 className="fw-semibold mb-1">Gallery / Featured Arts</h6>
        <Image
          src={profile.artpiece}
          fluid
          alt={`${profile.name}'s artwork`}
          className="rounded shadow-sm"
          style={{ maxHeight: '150px', objectFit: 'cover' }}
        />
        <p className="text mt-2 ms-1 small">
          Artwork1
        </p>
      </div>
    )}

    {/* Footer */}
    <div className="text-end mt-3">
      <Link href={`edit/${profile.id}`} className="btn btn-outline-primary btn-sm">
        Edit
      </Link>
    </div>
  </Card>
);

export default ProfileCard;
