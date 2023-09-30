import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Col, Container, Row, Card, Button,Badge } from 'react-bootstrap';
import { getMethod } from '../helpers';
import { useLocation,useNavigate } from 'react-router-dom';

function SubCategory() {
  const navigate = useNavigate()
  const location = useLocation()


  const [SubCategoryList, setSubCategoryList] = useState([]);
  const [separateList,setseparateList] = useState([])

  const getSubCategoryList = async () => {
    try {
      let url = "subcategories/get_subcategories";
      const token = localStorage.getItem("@token");
      let response = await getMethod({ url,token });
      if (response.success) {
        setSubCategoryList(response.data);
        if(location.state !== "All"){
          let result = response.data?.filter((item)=> item.categories[0]?.categoryName == location.state);
          setseparateList(result)
        }else{
          setseparateList(response.data)
        }
        
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getSubCategoryList();
  }, [location.state]);


  return (
    <>
      <Container className='mt-5'>
        <h3>Subcategories</h3>
        <Row>
          {separateList?.map((item,i) => {
            return (
              <Col lg={3} md={4} sm={6} xs={12} key={i} className='mb-4'>
                <Card className='subcat_card cursor' onClick={()=> navigate(`/product/${item?.subcategoryUuid}`)}>
                  <Card.Img variant='top' className='subcatImg' src={item.imageUrl ? item.imageUrl : "https://cdn.pixabay.com/photo/2021/10/11/23/49/app-6702045_1280.png"} />
                  <Card.Body>
                    {/* <Card.Title>{item.name}</Card.Title> */}
                    <p className='subcategory_prod_name text-center'>{item.subcategoryName}</p>
                    <p className='text-center subcat_badge'><Badge bg="secondary">{item.categories[0]?.categoryName}</Badge></p>
                    <center>
                      <button className='common_blubtn'>View</button>
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

export default SubCategory;
