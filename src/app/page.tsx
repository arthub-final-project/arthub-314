'use client';

import { Col, Container, Image, Row, Button } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3 d-flex flex-column justify-content-center align-items-center py-3">
      <Row className="align-middle text-center">
        <Col xs={5} className="d-flex flex-column justify-content-center mb-4">
          <div style={{ width: '1000px', height: '35px', backgroundColor: 'white', border: '2px solid rgb(212, 212, 212)', borderRadius: '8px', }}>
            <Row className="d-flex flex-row">
              <Col className="d-flex flex-row justify-content-center align-items-center" style={{ marginLeft: '340px' }}>
                <h3>Artists you might know</h3>
              </Col>
              <Col className="d-flex flex-row justify-content-end me-1 mt-1">
              <a href="#">See All</a>
              </Col>
            </Row>
          </div>
          <div style={{ width: '1000px', height: '220px', backgroundColor: 'white', border: '2px solid rgb(212, 212, 212)', borderRadius: '8px', }}>
           <Row className="d-flex flex-row justify-content-start">
              <Col className="d-flex flex-column align-items-center mt-4 ms-2">
                <Image src= "./PinkGuy.jpg" alt= "Profile Pic" style={{ width: "100px", height: "100px", border: "2px solid black" }} />
                <h4>Joji</h4>
                <Button variant="primary" onClick={() => alert("Artist Followed!")}>
                  Follow
                </Button>
              </Col>
              <Col className="d-flex flex-column align-items-center mt-4 ms-3">
                <Image src= "./Scammer.png" alt= "Profile Pic" style={{ width: "100px", height: "100px", border: "2px solid black" }} />
                <h4>OfficialPikachu</h4>
                <Button variant="primary" onClick={() => alert("Artist Followed!")}>
                  Follow
                </Button>
              </Col>
              <Col className="d-flex flex-column align-items-center mt-4 ms-3">
                <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "100px", height: "100px", border: "2px solid black" }} />
                <h4>THAD</h4>
                <Button variant="primary" onClick={() => alert("Artist Followed!")}>
                  Follow
                </Button>
              </Col>
              <Col className="d-flex flex-column align-items-center mt-4 ms-3">
                <Image src= "./HD.webp" alt= "Profile Pic" style={{ width: "100px", height: "100px", border: "2px solid black" }} />
                <h4>ManagedDemo...</h4>
                <Button variant="primary" onClick={() => alert("Artist Followed!")}>
                  Follow
                </Button>
              </Col>
              <Col className="d-flex flex-column align-items-center mt-4 ms-2">
                <Image src= "./Monke.jpg" alt= "Profile Pic" style={{ width: "100px", height: "100px", border: "2px solid black" }} />
                <h4>PlzBuyIt</h4>
                <Button variant="primary" onClick={() => alert("Artist Followed!")}>
                  Follow
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      <Row className="align-middle text-center">
        <Col className="d-flex flex-column justify-content-center">
          <div style={{ width: '1000px', height: '35px', backgroundColor: 'white', border: '2px solid rgb(212, 212, 212)', borderRadius: '8px', }}>
            <Row className="d-flex flex-row">
              <Col className="d-flex flex-row justify-content-center">
                <h4>Friends</h4>
              </Col>
              <Col className="d-flex flex-row justify-content-center">
                <h4>Followers</h4>
              </Col>
              <Col className="d-flex flex-row justify-content-center">
                <h4>Followed</h4>
              </Col>
            </Row>
          </div>
          <Row className ="d-flex justify-content-center ">
            <Col className="d-flex justify-content-center">
              <div style={{ width: '333px', height: '500px', backgroundColor: 'white', border: '2px solid rgb(212, 212, 212)', borderRadius: '8px', }}>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none' }}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none' }}>Friends</a>
                </Col>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none' }}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none' }}>Friends</a>
                </Col>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row justify-content-center align-items-center mt-5 ms-3">
                  <a href="#">See All</a>
                </Col>
              </div>
              <div style={{ width: '333px', height: '500px', backgroundColor: 'white', border: '2px solid rgb(212, 212, 212)', borderRadius: '8px', }}>
              <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a> 
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row justify-content-center align-items-center mt-5 ms-3">
                  <a href="#">See All</a>
                </Col>
              </div>
              <div style={{ width: '333px', height: '500px', backgroundColor: 'white', border: '2px solid rgb(212, 212, 212)', borderRadius: '8px', }}>
              <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row align-items-center mt-3 ms-3">
                  <Image src= "./THUD.jpg" alt= "Profile Pic" style={{ width: "50px", height: "50px", border: "2px solid black" }} />
                  <a href="#" className="ms-2" style={{ textDecoration: 'none', color: 'black' }}>THAD</a>
                  <a className="ms-5" style={{fontSize: 15, textDecoration: 'none'}}>Followers</a>
                  <a className="ms-4" style={{fontSize: 15, textDecoration: 'none'}}>Friends</a>
                </Col>
                <Col className="d-flex flex-row justify-content-center align-items-center mt-5 ms-3">
                  <a href="#">See All</a>
                </Col>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
