import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Col, Container, Row, Card, Button,Badge } from 'react-bootstrap';
import { getMethod } from '../helpers';
import { Link,useNavigate,useParams } from 'react-router-dom';

function Product() {
  const navigate = useNavigate()
  const {id} = useParams();
  const [ProductList, setProductList] = useState([]);

  const getProductList = async () => {
    try {
      let url = "products/list_products";
      let response = await getMethod({ url });
      // console.log("product list res=", response);
      if (response.success) {
        let filtered = response.data.filter((item)=> item.subcategoryUuid == id);
        // console.log("filtered=",filtered)
        setProductList(filtered);
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProductList();
  }, []);

  return (
    <>
      <Container className='mt-5'>
        <h3>Products</h3>
        <Row>
          {ProductList?.map((item,i) => {
            return (
              <Col lg={3} md={4} sm={6} xs={12} key={i} className='mb-4'>
                <Card className='subcat_card' onClick={()=> navigate(`/productDetails/${item?.subcategoryUuid}/${item?.productUuid}`)}>
                  <Card.Img variant='top' className='subcatImg' src={item?.imageUrl ? item.imageUrl : "https://cdn.pixabay.com/photo/2021/10/11/23/49/app-6702045_1280.png"} />
                  <Card.Body>
                    {/* <Card.Title>{item.name}</Card.Title> */}
                    <p className='subcategory_prod_name text-center'>{item?.productName}</p>
                    <p className='text-center subcat_badge'><Badge bg="secondary">{item.subcategory?.subcategoryName}</Badge></p>
                    <center>
                      <button className='common_blubtn'>View Product</button>
                    </center>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default Product;
