'use client';

import { Container } from 'react-bootstrap';
import ProfileCard from '../../components/ProfileCard'; // adjust path if needed

const dummyProfile = {
  id: '1',
  name: 'Keita Grant',
  contact: 'keita@example.com',
  socialMedia: '@keitadraws',
  image: '/profile-placeholder.jpg',
  description: 'Digital artist and web developer.',
  artpiece: '/art-placeholder.jpg',
};

export default function ProfilePage() {
  return (
    <Container className="py-5">
      <h1 className="mb-4">Profile</h1>
      <ProfileCard profile={dummyProfile} />
    </Container>
  );
}
