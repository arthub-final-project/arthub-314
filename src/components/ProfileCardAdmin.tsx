'use client';

import { Card, Image } from 'react-bootstrap';
import { Profile } from '@prisma/client';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ProfileCardAdmin = ({ profile }: { profile: Profile }) => (
  <Card>
    <Card.Header>
      <Image src={profile.image} width={75} />
      <Card.Title>
        {profile.name}
      </Card.Title>
      <Card.Subtitle>
        {profile.contact}
      </Card.Subtitle>
    </Card.Header>
    <Card.Body>
      <Card.Text>
        {profile.description}
        <br />
        <br />
        {profile.socialMedia}
      </Card.Text>
    </Card.Body>
    <p className="blockquote-footer">
      {profile.owner}
    </p>
    <Card.Footer>
      <Image src={profile.artpiece} width={275} />
    </Card.Footer>
  </Card>
);

export default ProfileCardAdmin;
