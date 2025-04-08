'use client';

import { Card, Image } from 'react-bootstrap';
import { Profile } from '@prisma/client';
import Link from 'next/link';

/* Renders a single row in the List Stuff table. See list/page.tsx. */
const ProfileCard = ({ profile }: { profile: Profile }) => (
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
        <br />
        <br />
        <Image src={profile.artpiece} width={250}/>
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <Link href={`edit/${profile.id}`}>Edit</Link>
    </Card.Footer>

  </Card>
);

export default ProfileCard;
