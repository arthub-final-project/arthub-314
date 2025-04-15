import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-dark text-white">
    <Container>
      <Col className="text-center">
        ArtHub
        <br />
        The ArtHubbers
        <br />
        ICS 314
        <br />
      </Col>
    </Container>
  </footer>
);

export default Footer;
