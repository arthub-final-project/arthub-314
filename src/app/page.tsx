/* eslint-disable @next/next/no-img-element */
import { Container, Row } from 'react-bootstrap';
import CarouselComponent from '@/components/CarouseComponentl'; // Adjust the path as needed
/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Row>
        <h1 className="text-center">ArtHub Weekly Artist Showcase</h1>
        <CarouselComponent />
      </Row>
      <Row className="py-5">
        <h2 className="text-center">Event Calendar or event cards. (full calendar is possible but tedious)</h2>
      </Row>
    </Container>
  </main>
);

export default Home;
