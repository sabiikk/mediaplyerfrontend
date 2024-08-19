import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div>
        <Navbar className="bg-dark">
        <Container>
          <Navbar.Brand  style={{color:'white'}}>
            <Link to ='/' style={{textDecoration:'none', color:'white'}}>
            <i class="fa-solid fa-video text-warning me-3"></i>
            MEDIA PLAYER
            </Link>
         
          </Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  )
}

export default Header