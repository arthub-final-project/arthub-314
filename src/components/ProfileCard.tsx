'use client';

import { Card, Image, Row, Col } from 'react-bootstrap';
import { Profile } from '@prisma/client';
import Link from 'next/link';

const ProfileCard = ({ profile }: { profile: Profile }) => (
  <Card className="my-3 shadow-sm rounded border-0">
    <Card.Body>
      <Row>
        {/* Profile Image */}
        <Col xs={120} className="d-flex justify-content-left align-items-start">
          <Image
            src={profile.image}
            roundedCircle
            width={80}
            height={80}
            alt={`${profile.name}'s profile`}
            className="border"
          />
        </Col>

        {/* Text Info */}
        <Col>
          <h5 className="fw-bold mb-1">{profile.name}</h5>
          <p className="text-muted mb-2">{profile.contact}</p>
          <p>{profile.description}</p>
          {profile.socialMedia && (
          <p>
            <strong>Social Media: </strong>
            <a href={profile.socialMedia} target="_blank" rel="noopener noreferrer">
              {profile.socialMedia}
            </a>
          </p>
          )}
        </Col>
      </Row>

      {/* Art Image */}
      {profile.artpiece && (
        <div className="text-center mt-3">
          <h5 className="fw-semibold mb-3">Featured Art</h5>
          <Image
            src={profile.artpiece}
            fluid
            alt={`${profile.name}'s artwork`}
            className="rounded shadow-sm"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </div>
      )}
    </Card.Body>
    <Card.Footer className="bg-white text-end border-0">
      <Link href={`edit/${profile.id}`} className="btn btn-outline-primary btn-sm">
        Edit
      </Link>
    </Card.Footer>
  </Card>
);

export default ProfileCard;
