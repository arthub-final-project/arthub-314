/* eslint-disable react/button-has-type */
/* import { getServerSession } from 'next-auth'; */
import { Col, Container, Row } from 'react-bootstrap';
/* import { loggedInProtectedPage } from '@/lib/page-protection'; */
/* import authOptions from '@/lib/authOptions'; */
import { Profile } from '@prisma/client';
import ProfileCard from '@/components/ProfileCard';
import { prisma } from '@/lib/prisma';

/** Render a list of stuff for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  /* const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  ); */
  /* const userId = Number(session?.user!.id); */
  const profiles: Profile[] = await prisma.profile.findMany({
    select: {
      id: true,
      name: true,
      contact: true,
      image: true,
      socialMedia: true,
      artpiece: true,
      description: true,
      owner: true,
      userId: true, // Critical for linking to userGallery
    },
  });

  console.log(profiles);
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h1 className="text-center">Artist Profiles</h1>
              <Row xs={1} md={2} lg={3} className="g-4">
                {profiles.map((profile) => (
                  <Col key={profile.name}>
                    <ProfileCard profile={profile} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default ListPage;
