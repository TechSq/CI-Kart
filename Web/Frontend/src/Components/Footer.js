import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <>
      <Container fluid className='footer_custom_container mt-5'>
        <Container>
          <Row>
            <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12}>
              <img src={require('../assets/images/auth/dummy_logo.png')} />
              <p className='footer_hint'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor
                libero id et, in gravida. Sit diam duis mauris nulla cursus.
                Erat et lectus vel ut sollicitudin elit at amet.
              </p>
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12}>
              <h5 className='footer_titles'>About us</h5>
              <ul>
                <li>Careers</li>
                <li>Our Stores</li>
                <li>Our Cares</li>
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </Col>
            <Col xxl={3} xl={3} lg={3} md={6} sm={12} xs={12}>
              <h5 className='footer_titles'>Support</h5>
              <ul>
                <li>Help Center</li>
                <li>How to Buy</li>
                <li>Returns & Refunds</li>
              </ul>
            </Col>
            <Col
              xxl={3}
              xl={3}
              lg={3}
              md={6}
              sm={12}
              xs={12}
              className='footer_contacts'
            >
              <h5 className='footer_titles'>Contact Us</h5>
              <p>
                123, Kannampalayam, Coimbatore, India
              </p>
              <p>Email: support@ci_kart.com</p>
              <p>Phone: +91 1123 456 780</p>

              <div className='footer_socials mt-5'>
                <button>
                  <i className='fa-brands fa-facebook-f'></i>
                </button>
                <button>
                  <i className='fa-brands fa-youtube'></i>
                </button>
                <button>
                  <i className='fa-brands fa-google'></i>
                </button>
                <button>
                  <i className='fa-brands fa-instagram'></i>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Footer;
