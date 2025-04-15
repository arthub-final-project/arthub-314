import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table, Image } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Profile } from '@prisma/client';
import ProfileCard from '@/components/ProfileCard';

/** Render a list of gallery items for the logged in user. */
const ListPage = async () => {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(session as { user: { email: string; id: string; randomKey: string } } | null);

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email || '' },
    select: { id: true },
  });

  if (!user) {
    return <div className="p-4">User not found.</div>;
  }

  const galleryItems = await prisma.galleryItem.findMany({
    where: { userId: user.id },
  });

  const owner = session?.user!.email ? session.user.email : '';
  const profiles: Profile[] = await prisma.profile.findMany({
    where: {
      owner,
    },
  });

  return (
    <Container>
      {/* Gallery Items Section */}
      <Row>
        <Col>
          <h1>My Uploaded Gallery Items</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Image</th>
                <th>Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {galleryItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      height={64}
                      style={{ objectFit: 'cover' }}
                    />
                  </td>
                  <td>{item.createdAt.toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* Artist Profiles Section */}
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
  );
};

export default ListPage;
