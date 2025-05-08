/* eslint-disable react/jsx-indent, @typescript-eslint/indent */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill, Search } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const role = session?.user?.role;
  const pathName = usePathname();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    window.location.href = '/artworks'; // Redirect to the search page
  };

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
            {!currentUser
              ? [
                  <Nav.Link id="list-stuff-nav" href="/list" key="list" active={pathName === '/list'}>
                    Artist Profiles
                  </Nav.Link>,
                ]
              : ''}
            {currentUser
              ? [
                  <Nav.Link id="list-stuff-nav" href="/list" key="list" active={pathName === '/list'}>
                    Artist Profiles
                  </Nav.Link>,
                  <Nav.Link id="list-stuff-nav" href="/upload" key="upload" active={pathName === '/upload'}>
                    Upload
                  </Nav.Link>,
                  <Nav.Link id="gallery-nav" href="/myGallery" key="gallery" active={pathName === '/artworks'}>
                    My Gallery
                  </Nav.Link>,
                  <Nav.Link href="/friends">
                    Friends
                  </Nav.Link>,
                ]
              : ''}
            {currentUser && role === 'ADMIN' ? (
              <>
                <Nav.Link id="list-stuff-nav" href="/list" key="list" active={pathName === '/list'}>
                  Artist Profiles
                </Nav.Link>
                <Nav.Link id="list-stuff-nav" href="/upload" key="upload" active={pathName === '/upload'}>
                  Upload
                </Nav.Link>
                <Nav.Link id="gallery-nav" href="/myGallery" key="gallery" active={pathName === '/artworks'}>
                  My Gallery
                </Nav.Link>
                <Nav.Link href="/friends">
                  Friends
                </Nav.Link>
                <Nav.Link id="admin-stuff-nav" href="/admin" key="admin" active={pathName === '/admin'}>
                  Admin
                </Nav.Link>
              </>
            ) : (
              ''
            )}
          </Nav>
          <Nav className="ms-auto justify-content-end">
            {session ? (
              <NavDropdown id="login-dropdown" title={currentUser}>
                <NavDropdown.Item id="login-dropdown-sign-out" href="/api/auth/signout">
                  <BoxArrowRight />
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-change-password" href="/auth/change-password">
                  <Lock />
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavDropdown id="login-dropdown" title="Login">
                <NavDropdown.Item id="login-dropdown-sign-in" href="/auth/signin">
                  <PersonFill />
                  Sign in
                </NavDropdown.Item>
                <NavDropdown.Item id="login-dropdown-sign-up" href="/auth/signup">
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
