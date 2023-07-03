import { Navbar, Nav, Button } from 'react-bootstrap';
import Link from 'next/link';

const PublicMenu = ({ user }) => {
  return(
    <Navbar variant="light" className='px-3 px-md-5 d-flex justify-content-between'>
      {/* Replace with links to your pages */}
      <Nav className="ml-auto">
        {!user && (
          <Button variant='secondary' >
            <Link href="/signup" className='text-white'>
                Sign Up
            </Link>
          </Button>
        )}
        <Link href='/' className='text-white'>Test!</Link>
      </Nav>
    </Navbar>
  )
}

export default PublicMenu;