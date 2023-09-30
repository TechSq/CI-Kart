import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { Col, Container, Row, Card } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { getMethod, postMethod } from '../helpers';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import LoginModal from '../Components/LoginModal';
import Swal from 'sweetalert2';

function InfoDetails() {
  const {subcatId,productId} = useParams();
  const [inCart,setInCart] = useState(false);
  const [inWish,setInWish] = useState(false);
  const [showSignin, setShowSignin] = useState(false);
  const [cartList,setCartList] = useState([]);
  const navigate = useNavigate()

  const [Product, setProduct] = useState([]);
  let json = localStorage.getItem("@USER");
  let User = JSON.parse(json)

  const handleClose = () => setShowSignin(false);
  const handleShow = () => setShowSignin(true);

  const getProduct = async () => {
    try {
      let url = "products/list_products";
      let response = await getMethod({ url });
      if (response.success) {
        let filtered = response.data.filter((item)=> item.productUuid == productId);
        setProduct(filtered[0]);
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  const [ProductList, setProductList] = useState([]);

  const getProductList = async () => {
    try {
      let url = "products/list_products";
      let response = await getMethod({ url });
      // console.log("product list res=", response);
      if (response.success) {
        let filtered = response.data.filter((item)=> item.subcategoryUuid == subcatId);
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

  const addToCart = async()=>{
    if(!User){
      // toast.error("Please Login to add to cart")
      setShowSignin(true)
    }else{
    try{
      let url = `customers/secure/cart/${Product?.productUuid}?quantity=1`;
      var payload = {
        productId: Product?.productUuid,
        quantity: 1,
      };
      let token = localStorage.getItem("@token")
      let response = await postMethod({ url, payload,token });
      if(response.success){
        toast.success(response.message)
        getCartListing();
        navigate("/cart")
      }else{
        toast.error(response.message)
      }
    }catch(e){
      console.log(e)
    }
    }
  }

  const addToWishlist = async()=>{
    if(!User){
      // toast.error("Please Login to add to cart")
      setShowSignin(true)
    }else{
    try{
      let url = `customers/secure/wishlist/${Product?.productUuid}?quantity=1`;
      var payload = {
        productId: Product?.productUuid,
        quantity: 1,
      };
      let token = localStorage.getItem("@token")
      let response = await postMethod({ url, payload,token });
      if(response.success){
        toast.success(response.message)
        getWishListing()
        navigate("/cart")
      }else{
        toast.error(response.message)
      }
    }catch(e){
      console.log(e)
    }
    }
  }

  const PlaceOrder = async(orderId)=>{
    if(!User){
      // toast.error("Please Login to Place order")
      setShowSignin(true)
    }else{
    try{
      let url = `customers/secure/cart/placeorder`
      var payload = {
        itemId: Product?.productUuid,
      };
      const token = localStorage.getItem("@token");
      let response = await postMethod({ url, payload, token });
      if(response.success){
        Swal.fire(
          'Good job!',
           response.message,
          'success'
        )
      }else{
        toast.error(response.message)
      }
    }catch(e){
      console.log(e)
    }
  }
  }


  const getCartListing = async () => {
    try {
      let url = "customers/secure/cart";
      let token = localStorage.getItem("@token")
      let response = await getMethod({ url, token});
      let json = localStorage.getItem("@USER");
      let User = JSON.parse(json);
      if (response.data) {
        if(response.data.customer.email === User?.email){
          let check = response.data.orderItems.filter((item)=> item.productUuid === productId)
          // console.log("cart check=",check[0])
          if(check.length > 0){
            setInCart(true)
          }
        }
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCartListing();
  }, []);

  const getWishListing = async () => {
    try {
      let url = "customers/secure/wishlist";
      let token = localStorage.getItem("@token")
      let response = await getMethod({ url, token});
      let json = localStorage.getItem("@USER");
      let User = JSON.parse(json);
      if (response.data) {
        if(response.data.customer.email === User?.email){
          let check = response.data.orderItems.filter((item)=> item.productUuid === productId)
          // console.log("cart check=",check[0])
          if(check.length > 0){
            setInWish(true)
          }
        }
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getWishListing();
  }, []);

  
  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },

          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Container className='mt-5'>
        <Row>
          <Col xl={4} md={4} sm={12}>
            <Swiper
              loop={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: false,
              }}
              className='mySwiper'
              spaceBetween={20}
              modules={[Autoplay]}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                450: {
                  slidesPerView: 1,
                },
                576: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                992: {
                  slidesPerView: 1,
                },
                1200: {
                  slidesPerView: 1,
                },
              }}
            >
              <SwiperSlide>
                {' '}
                <img
                  className='img-fluid infodetail_bigimg'
                  src={Product?.imageUrl}
                />
              </SwiperSlide>
              <SwiperSlide>
                {' '}
                <img
                  className='img-fluid infodetail_bigimg'
                  src={Product?.imageUrl}
                />
              </SwiperSlide>
              <SwiperSlide>
                {' '}
                <img
                  className='img-fluid infodetail_bigimg'
                  src={Product?.imageUrl}
                />
              </SwiperSlide>
              <SwiperSlide>
                {' '}
                <img
                  className='img-fluid infodetail_bigimg'
                  src={Product?.imageUrl}
                />
              </SwiperSlide>
            </Swiper>
            {/* <div className='infodtls_sample_imgs'>
              <img 
                src={Product?.imageUrl}
              />
              <img
                src={Product?.imageUrl}
              />
              <img
                src={Product?.imageUrl}
              />
              <img
                src={Product?.imageUrl}
              />
            </div> */}
          </Col>
          <Col xl={8} md={8} sm={12}>
            <h5>
              {Product?.productName}
            </h5>
            <div className='description_dtls mt-3'>
              <p>
                {Product?.description}
              </p>
            </div>
            <label for='size' className='me-2'>
              Choose a size:
            </label>
            <select name='size' className='infodtls_sizeslct my-4' id='size'>
              <option value='saab'>6</option>
              <option value='opel'>7</option>
              <option value='audi'>8</option>
              <option value='saab'>9</option>
              <option value='opel'>10</option>
              <option value='audi'>11</option>
            </select>

            <div className='d-flex justify-content-between'>
              <p className='infodlts_price'>₹ 500.00</p>
              <div className='star_ratings'>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
                <i className='fa-solid fa-star'></i>
              </div>
            </div>

            {/* <div className='product_details_list'>
              <ul>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
                <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
              </ul>
            </div> */}
            <div className='d-flex '>
              {
                inCart ? <button disabled className='btn btn-outline-secondary mx-2'>Added to Cart</button> : <button onClick={addToCart} className='btn btn-outline-secondary mx-2'>Add to Cart</button>
              }
              <button onClick={PlaceOrder} className='btn btn-primary mx-2'>Place Order</button>
              {
                inWish ? <button disabled className='btn btn-outline-secondary mx-2'>Added to Wishlist ❤</button> : <button onClick={addToWishlist} className='btn btn-outline-secondary mx-2'>Wishlist ❤</button>
              }
              
            </div>
          </Col>
        </Row>
        <Row className='mt-5'>
          <h5 className='related_products'>Related Products</h5>

          <Swiper
            loop={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            className='mySwiper'
            spaceBetween={20}
            modules={[Autoplay]}
            breakpoints={{
              320: {
                slidesPerView: 1,
              },
              450: {
                slidesPerView: 1,
              },
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
          >
            {ProductList.map((item,i) => {
              return (
                <SwiperSlide key={i}>
                  <Card className='subcat_card related_swipercard'>
                    <Card.Img
                      className='catlist_cardimg'
                      variant='top'
                      src={item?.imageUrl ? item.imageUrl : "https://cdn.pixabay.com/photo/2021/10/11/23/49/app-6702045_1280.png"}
                    />
                    <Card.Body>
                      {/* <Card.Title>{item.name}</Card.Title> */}
                      <p className='subcategory_prod_name'>{item.productName?.slice(0,20)+"..."}</p>
                      <div className='d-flex justify-content-between'>
                        <p className='subcategory_prod_price'>₹ 0</p>
                        {/* <div className='star_ratings'>
                          <i className='fa-solid fa-star'></i>
                          <i className='fa-solid fa-star'></i>
                          <i className='fa-solid fa-star'></i>
                          <i className='fa-solid fa-star'></i>
                          <i className='fa-solid fa-star'></i>
                        </div> */}
                      </div>
                      <center>
                        <button className='common_blubtn '>View Details</button>
                      </center>
                    </Card.Body>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Row>
      </Container>
      <Footer />
      <LoginModal showSignin={showSignin} setShowSignin={setShowSignin} handleClose={handleClose} handleShow={handleShow}/>

    </>
  );
}

export default InfoDetails;
