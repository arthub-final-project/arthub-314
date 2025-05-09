'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill, Search, ArrowCounterclockwise } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUserEmail = session?.user?.email;
  const role = session?.user?.role;
  const pathName = usePathname();
  const [profileId, setProfileId] = useState<number | null>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.location.href = '/artworks';
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUserEmail) return;
      try {
        const res = await fetch(`/api/profile/byEmail?email=${currentUserEmail}`);
        const data = await res.json();
        if (data?.id) setProfileId(data.id);
      } catch (err) {
        console.error('Failed to fetch profile ID:', err);
      }
    };

    fetchProfile();
  }, [currentUserEmail]);

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">ArtHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Explore..."
              className="me-2 rounded-pill"
              style={{ width: '270px' }}
              aria-label="Search"
            />
            <Button className="rounded-pill" variant="primary" color="white" type="submit">
              <Search color="white" />
            </Button>
          </Form>

          <Nav className="me-auto justify-content-start">
            {!currentUserEmail && (
              <Nav.Link href="/list" active={pathName === '/list'}>
                Explore Artist Profiles
              </Nav.Link>
            )}
            {currentUserEmail && (
              <>
                <Nav.Link href="/list" active={pathName === '/list'}>Explore Artist Profiles</Nav.Link>
                <Nav.Link href="/upload" active={pathName === '/upload'}>Upload</Nav.Link>
                <Nav.Link href="/myGallery" active={pathName === '/artworks'}>My Gallery</Nav.Link>
                <Nav.Link href="/friends">Friends</Nav.Link>
              </>
            )}
            {currentUserEmail && role === 'ADMIN' && (
              <Nav.Link href="/admin" active={pathName === '/admin'}>Admin</Nav.Link>
            )}
          </Nav>

          <Nav className="ms-auto justify-content-end">
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUserEmail}>
                <NavDropdown.Item href="/api/auth/signout">
                  <BoxArrowRight />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item href="/auth/change-password">
                  <Lock />
                  Change Password
                </NavDropdown.Item>
                {profileId && (
                  <NavDropdown.Item id="login-dropdown-edit" href={`/edit/${profileId}`}>
                    <ArrowCounterclockwise />
                    Edit Profile
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item href="/auth/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item href="/auth/signup">
                  <PersonPlusFill />
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
