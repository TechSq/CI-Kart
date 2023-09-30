import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Col, Container, Row, Card } from 'react-bootstrap';

function CategoryListing() {
  const cardDetails = [
    {
      img: require('../assets/images/product_images_2/thumb_image3.jpg'),
      name: 'Red Shoe',
      price: '$12',
    },
    {
      img: require('../assets/images/product_images_2/thumb_image1.jpg'),
      name: 'Sneakers',
      price: '$75',
    },
    {
      img: require('../assets/images/product_images_2/thumb_image4.jpg'),
      name: 'Sports Shoes',
      price: '$56',
    },

    {
      img: require('../assets/images/product_images_2/blue_shoes.jpeg'),
      name: 'Mobiles',
      price: '$145',
    },
    {
      img: require('../assets/images/product_images_2/green_shoe.jpeg'),
      name: 'Mobiles',
      price: '$145',
    },
    {
      img: require('../assets/images/product_images_2/loafers.jpeg'),
      name: 'Mobiles',
      price: '$145',
    },
    {
      img: require('../assets/images/product_images_2/shoes.jpeg'),
      name: 'Mobiles',
      price: '$145',
    },
    {
      img: require('../assets/images/product_images_2/newshoe.jpeg'),
      name: 'Mobiles',
      price: '$145',
    },
  ];
  return (
    <>
      <Container className='mt-5'>
        <h3 className='mb-5'>Shoes</h3>
        <Row>
          {cardDetails.map((item,i) => {
            return (
              <Col lg={3} md={4} sm={6} xs={12} key={i} className='mb-4'>
                <Card className='subcat_card'>
                  <Card.Img
                    className='catlist_cardimg'
                    variant='top'
                    src={item.img}
                  />
                  <Card.Body>
                    {/* <Card.Title>{item.name}</Card.Title> */}
                    <p className='subcategory_prod_name'>{item.name}</p>
                    <div className='d-flex justify-content-between'>
                      <p className='subcategory_prod_price'>{item.price}</p>
                      <div className='star_ratings'>
                        <i className='fa-solid fa-star'></i>
                        <i className='fa-solid fa-star'></i>
                        <i className='fa-solid fa-star'></i>
                        <i className='fa-solid fa-star'></i>
                        <i className='fa-solid fa-star'></i>
                      </div>
                    </div>
                    <center>
                      <button className='common_blubtn '>View Details</button>
                    </center>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
          <center>
            <button className='common_blubtn widthing_btn'>Load More</button>
          </center>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default CategoryListing;
