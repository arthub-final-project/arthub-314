import { Col, Container, Image, Row } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3" style={{ height: '100vh'}}>
      <Row className="justify-content-center align-items-center ms-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={idx}>
            <ArtworkCard />
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center align-items-center ms-5 mt-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={idx}>
            <ArtworkCard />
          </Col>
        ))}
      </Row>
      <Row className="justify-content-center align-items-center ms-5 mt-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={idx}>
            <ArtworkCard />
          </Col>
        ))}
      </Row>
    </Container>
  </main>
);

export default Home;
