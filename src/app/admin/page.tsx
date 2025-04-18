/* eslint-disable react/button-has-type */
import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { Profile } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import ProfileCardAdmin from '@/components/ProfileCardAdmin';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  const profiles: Profile[] = await prisma.profile.findMany({});
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1 className="text-center">List Profiles Admin</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
              {profiles.map((profile) => (
                <Col key={profile.name}>
                  <ProfileCardAdmin profile={profile} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default AdminPage;
