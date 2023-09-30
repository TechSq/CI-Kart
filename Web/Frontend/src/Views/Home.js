import React, { useState,useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import BannerCard from '../Components/BannerCard';
import Header from '../Components/Header';
import ProductCard from '../Components/ProductCard';
import { Link,useNavigate } from 'react-router-dom';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import Footer from '../Components/Footer';
import { getMethod } from '../helpers';
import Product from '../Components/Products';

const categoryImg = require("../assets/images/product_images_2/thumb_image5.jpg")
function Home() {
  const [buttonActive, setButtonActive] = useState('');
  const [CategoriesList, setCategoriesList] = useState([]);
  const [SubCategoryList, setSubCategoryList] = useState([]);
  const [ProductList, setProductList] = useState([]);
  const navigate = useNavigate()

  const getCategoriesList = async () => {
    try {
      let url = "common/categories";
      const token = localStorage.getItem("@token");
      let response = await getMethod({ url, token });
      if (response.success) {
        setCategoriesList(response.data);
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getSubCategoryList = async () => {
    try {
      let url = "subcategories/get_subcategories";
      const token = localStorage.getItem("@token");
      let response = await getMethod({ url, token});
      if (response.success) {
        setSubCategoryList(response.data);
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getProductList = async () => {
    try {
      let url = "products/list_products";
      let response = await getMethod({ url });
      // console.log("res check=", response);
      if (response.success) {
        setProductList(response.data);
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCategoriesList();
  }, []);

  useEffect(() => {
    getSubCategoryList();
  }, []);

  useEffect(()=>{
    getProductList();
  },[])
  const swiperImages = [
    {
      image: require('../assets/images/carousel/banner_1.jpg'),
    },
    {
      image: require('../assets/images/carousel/banner_5.jpg'),
    },
  ];

  const productSwiper = [
    {
      img: require('../assets/images/product_images_2/thumb_image1.jpg'),
      text: 'Toys',
    },
    {
      img: require('../assets/images/product_images_2/thumb_image2.jpg'),
      text: 'Toys',
    },
    {
      img: require('../assets/images/product_images_2/thumb_image3.jpg'),
      text: 'Toys',
    },
    {
      img: require('../assets/images/product_images_2/thumb_image4.jpg'),
      text: 'Toys',
    },
    {
      img: require('../assets/images/product_images_2/thumb_image5.jpg'),
      text: 'Toys',
    },
    {
      img: require('../assets/images/product_images_2/thumb_image6.jpg'),
      text: 'Toys',
    },
    {
      img: require('../assets/images/product_images_2/thumb_image7.jpg'),
      text: 'Toys',
    },
  ];

  const data = [
    {
      img: require('../assets/images/product_images_2/thumb_image1.jpg'),
      name: 'Red Shoe',
      price: '$210.00',
    },
    {
      img: require('../assets/images/product_images_2/thumb_image2.jpg'),
      name: 'Red Shoe',
      price: '$210.00',
    },
    {
      img: require('../assets/images/product_images_2/thumb_image3.jpg'),
      name: 'Red Shoe',
      price: '$210.00',
    },
    {
      img: require('../assets/images/product_images_2/thumb_image4.jpg'),
      name: 'Red Shoe',
      price: '$210.00',
    },
    {
      img: require('../assets/images/product_images_2/thumb_image5.jpg'),
      name: 'Red Shoe',
      price: '$210.00',
    },
    {
      img: require('../assets/images/product_images_2/thumb_image6.jpg'),
      name: 'Red Shoe',
      price: '$210.00',
    },
    {
      img: require('../assets/images/product_images_2/thumb_image7.jpg'),
      name: 'Red Shoe',
      price: '$210.00',
    },
  ];

  const prodcut_category = [
    {
      name: 'Wireless Speaker',
    },
    {
      name: 'Tablet',
    },
    {
      name: 'Smart Phone',
    },
    {
      name: 'Laptop',
    },
    {
      name: 'iMac',
    },
    {
      name: 'Game Controller',
    },
    {
      name: 'Drone',
    },
    {
      name: 'Apple',
    },
  ];


  return (
    <>
      <Container>
        <Row>
          <Col xxl={8} xl={8} lg={8} md={8} sm={12} xs={12}>
            <Swiper
              pagination={{
                dynamicBullets: true,
                clickable: true,
              }}
              loop={true}
              modules={[Pagination]}
              className='mySwiper'
              style={{height:"100%"}}

            >
              <SwiperSlide>
                <img
                  className='img-fluid slider_image'
                  src={"https://cdn.dribbble.com/users/3906861/screenshots/11079483/02_4x.jpg"}
                />
              </SwiperSlide>
              
               <SwiperSlide>
                <img
                  className='img-fluid slider_image'
                  src={"https://static.vecteezy.com/system/resources/thumbnails/008/174/590/small/fashion-advertising-web-banner-illustration-vector.jpg"}
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  className='img-fluid slider_image'
                  src={"https://as2.ftcdn.net/v2/jpg/02/35/51/17/1000_F_235511732_iPCEM3o4RMd3dM6pEH8q5SCQ1R2USEH0.jpg"}
                />
              </SwiperSlide>
              
             
            </Swiper>
          </Col>
          <Col xxl={4} xl={4} lg={4} md={8} sm={12} xs={12}>
            <BannerCard />
            <BannerCard />
          </Col>
        </Row>

        {/* <Row className='features_row mt-5'>
          <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
            <div className='features_session'>
              <img src={require('../assets/images/brand_icons/bitmap.jpg')} />
              <div className='features_txts'>
                <p className='feature_ttl'>Fast Delivery</p>
                <span className='feature_hint'>Start from $10</span>
              </div>
            </div>
          </Col>

          <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
            <div className='features_session'>
              <img src={require('../assets/images/brand_icons/bitmap.jpg')} />
              <div className='features_txts'>
                <p className='feature_ttl'>Fast Delivery</p>
                <span className='feature_hint'>Start from $10</span>
              </div>
            </div>
          </Col>

          <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
            <div className='features_session'>
              <img src={require('../assets/images/brand_icons/bitmap.jpg')} />
              <div className='features_txts'>
                <p className='feature_ttl'>Fast Delivery</p>
                <span className='feature_hint'>Start from $10</span>
              </div>
            </div>
          </Col>

          <Col xxl={3} xl={3} lg={3} md={6} sm={6} xs={12}>
            <div className='features_session'>
              <img src={require('../assets/images/brand_icons/bitmap.jpg')} />
              <div className='features_txts'>
                <p className='feature_ttl'>Fast Delivery</p>
                <span className='feature_hint'>Start from $10</span>
              </div>
            </div>
          </Col>
        </Row> */}

        <div className='deals_content mt-5 mb-1'>
            <h5 className='cmn_subhead'>Categories</h5>
            {/* <Link className='common_link' onClick={()=> navigate("/subcategory")}>
              View All <i className='fa-solid fa-arrow-right ms-2'></i>
            </Link> */}
            <p className='common_link mb-0 cursor' onClick={()=> navigate("/subcategory",{state:"All"})}>
            View All <i className='fa-solid fa-arrow-right ms-2'></i>
            </p>
          </div>
        <Row className=''>
          <Swiper
            loop={true}
            modules={[Pagination]}
            className='mySwiper'
            breakpoints={{
              360: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              992: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
              1200: {
                slidesPerView: 6,
                spaceBetween: 15,
              },
            }}
          >
            {CategoriesList.map((item,i) => {
              return (
                <SwiperSlide key={i}>
                  <div className='category_swiper' onClick={()=> navigate("/subcategory",{state:item.categoryName})}>
                    <img className='img-fluid slider_image' src={item.image} />
                    <button>{item.categoryName}</button>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Row>

        <Row className='mt-5'>
          <div className='deals_content'>
            <h5 className='cmn_subhead'>Sub Categories</h5>
            <p className='common_link mb-0 cursor' onClick={()=> navigate("/subcategory",{state:"All"})}>
              More Product <i className='fa-solid fa-arrow-right ms-2'></i>
            </p>
          </div>
          <Swiper
            loop={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper'
            breakpoints={{
              360: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
              1200: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
            }}
          >
            {SubCategoryList.map((item,i) => {
              return (
                <SwiperSlide key={i} >
                  <ProductCard data={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Row>

        <Row className='mt-5'>
          <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
            <img
              className='img-fluid promotion_details'
              src={"https://marketplace.canva.com/EAFYElY5EE4/1/0/1600w/canva-brown-and-white-modern-fashion-banner-landscape-Ap8IU9nEbh8.jpg"}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
            <img
              className='img-fluid promotion_details'
              src={"https://static.vecteezy.com/system/resources/previews/000/357/905/original/classic-living-room-home-interior-design-banner-vector.jpg"}
            />
          </Col>
          <Col xxl={4} xl={4} lg={4} md={4} sm={12} xs={12}>
            <img
              className='img-fluid promotion_details'
              src={"https://img.freepik.com/free-vector/healthy-food-banner-template_23-2148805673.jpg?w=2000"}
            />
          </Col>
        </Row>

        <Row className='mt-5 h-100'>
          <Col lg={3} md={6} sm={12} xs={12}>
            <div className='product_listing'>
              <h5 className='product_category mb-4'>Fashion</h5>
              <ul>
              {SubCategoryList.filter((item)=> item?.categories[0]?.categoryName == "Fashion").map((items,i) => {
                  return <li key={i}>{items.subcategoryName}</li>;
                })}
              </ul>
              <p className='common_link mb-0 cursor' onClick={()=> navigate("/subcategory",{state:"Fashion"})}>
                Browse All <i className='fa-solid fa-arrow-right ms-2'></i>
              </p>
            </div>
          </Col>

          <Col xl={9} lg={9} md={6} sm={12} xs={12}>
            <Swiper
              loop={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              className='mySwiper'
              breakpoints={{
                360: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                576: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                992: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
              }}
            >
              {SubCategoryList.filter((item)=> item?.categories[0]?.categoryName == "Fashion").map((item,i) => {
                return (
                  <SwiperSlide key={i}>
                    <ProductCard data={item} product="product" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
            <img
              className='img-fluid promotion_details'
              src={"https://media.istockphoto.com/id/1290991842/vector/natural-food-banner-in-flat-style.jpg?s=612x612&w=0&k=20&c=zq9K5nHSpY0451oog0LBWvzTIeP_fqSAcvFCLG-WCpo="}
            />
          </Col>
          <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
            <img
              className='img-fluid promotion_details'
              src={"https://img.freepik.com/premium-photo/interior-design-concept-sale-home-decorations-furniture-during-promotions-discounts-it-is-surrounded-by-beds-sofas-armchairs-advertising-spaces-banner-pastel-background-3d-render_156429-3954.jpg"}
            />
          </Col>
        </Row>

        <Row className='mt-5 h-100'>
          <Col lg={3} md={6} sm={12} xs={12}>
            <div className='product_listing'>
              <h5 className='product_category mb-4'>Home&Living</h5>
              <ul>
                {SubCategoryList.filter((item)=> item?.categories[0]?.categoryName == "Home&Living").map((items,i) => {
                  return <li key={i}>{items.subcategoryName}</li>;
                })}
              </ul>
              <p className='common_link mb-0 cursor' onClick={()=> navigate("/subcategory",{state:"Home&Living"})}>
                Browse All <i className='fa-solid fa-arrow-right ms-2'></i>
              </p>
            </div>
          </Col>

          <Col xl={9} lg={9} md={6} sm={12} xs={12}>
            <Swiper
              loop={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              className='mySwiper'
              breakpoints={{
                360: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                576: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                992: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
              }}
            >
              {SubCategoryList.filter((item)=> item?.categories[0]?.categoryName == "Home&Living").map((item,i) => {
                return (
                  <SwiperSlide key={i}>
                    <ProductCard data={item} product="product" />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col sm={12} xs={12}>
            <img
              className='img-fluid promotion_details'
              src={'https://marketplace.canva.com/EAFYElY5EE4/1/0/1600w/canva-brown-and-white-modern-fashion-banner-landscape-Ap8IU9nEbh8.jpg'}
            />
          </Col>
        </Row>

        <Row className='mt-5 h-100'>
          <Col lg={3} md={6} sm={12} xs={12}>
            <div className='product_listing'>
              <h5 className='product_category mb-4'>Nature Foods</h5>
              <ul>
              {SubCategoryList.filter((item)=> item?.categories[0]?.categoryName == "Nature Foods").map((items,i) => {
                  return <li key={i}>{items.subcategoryName}</li>;
                })}
              </ul>
              <p className='common_link mb-0 cursor' onClick={()=> navigate("/subcategory",{state:"Nature Foods"})}>
                Browse All <i className='fa-solid fa-arrow-right ms-2'></i>
              </p>
            </div>
          </Col>

          <Col xl={9} lg={9} md={6} sm={12} xs={12}>
            <Swiper
              loop={true}
              navigation={true}
              modules={[Pagination, Navigation]}
              className='mySwiper'
              breakpoints={{
                360: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                576: {
                  slidesPerView: 1,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                992: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                1200: {
                  slidesPerView: 3,
                  spaceBetween: 15,
                },
              }}
            >
              {SubCategoryList.filter((item)=> item?.categories[0]?.categoryName == "Nature Foods").map((item,i) => {
                return (
                  <SwiperSlide key={i}>
                    <ProductCard data={item} product="product"/>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
            <h5 className='cmn_subhead'>Trending</h5>
            <p className='selected_hint'>
              Products
            </p>
          </Col>
          <Col xxl={6} xl={6} lg={6} md={6} sm={12} xs={12}>
            <div className='category_selection'>
              <button
                className={
                  buttonActive == 'newarrivals'
                    ? 'selection_btn active me-2'
                    : 'selection_btn  me-2'
                }
                onClick={() => setButtonActive('newarrivals')}
              >
                New Arrivals
              </button>
              <button
                className={
                  buttonActive == 'bestseller'
                    ? 'selection_btn active me-2'
                    : 'selection_btn  me-2'
                }
                onClick={() => setButtonActive('bestseller')}
              >
                Best Seller
              </button>
              <button
                className={
                  buttonActive == 'mostpopular'
                    ? 'selection_btn active me-2'
                    : 'selection_btn  me-2'
                }
                onClick={() => setButtonActive('mostpopular')}
              >
                Most Popular
              </button>
              <button
                className={
                  buttonActive == 'viewall'
                    ? 'selection_btn active'
                    : 'selection_btn'
                }
                onClick={() => setButtonActive('viewall')}
              >
                View All
              </button>
            </div>
          </Col>
        </Row>

        <Row className='mt-5'>
          <Swiper
            loop={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            className='mySwiper'
            breakpoints={{
              360: {
                slidesPerView: 1,
                spaceBetween: 15,
              },
              576: {
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 15,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 15,
              },
            }}
          >
            {ProductList.map((item,i) => {
              return (
                <SwiperSlide key={i}>
                  <Product data={item} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Home;
