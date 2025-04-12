import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-light">
    <Container>
      <Col className="text-center">
        Created by Joshua, Darin, Justin, Keita, and Rolando
        <br />
        <a href="https://arthub-final-project.github.io/arthub-314/">Github Page</a>
      </Col>
    </Container>
  </footer>
);

export default Footer;
