import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Header() {
  return (
    <>
      <Navbar bg="primary" variant="dark">
      <Container className="d-flex justify-content-center">
          <Navbar.Brand>CONTROL 2 TEL-335</Navbar.Brand>
          
        </Container>
      </Navbar>
    </>
  );
}

export default Header;