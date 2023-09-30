import React, { useEffect, useState } from "react";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import Select from "react-select";
import Footer from "../Components/Footer";
import CartCard from "../Components/CartCard";
import { getMethod } from "../helpers";
import WishlistCard from "../Components/WishlistCard";

const Cartpage = () => {
  const [cartList, setCartList] = useState([]);
  const [wishList, setWishList] = useState([]);
  const getCartListing = async () => {
    try {
      let url = "customers/secure/cart";
      let token = localStorage.getItem("@token");
      let response = await getMethod({ url, token });
      if (response.data) {
        setCartList(response.data.orderItems);
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getWishListing = async () => {
    try {
      let url = "customers/secure/wishlist";
      let token = localStorage.getItem("@token");
      let response = await getMethod({ url, token });
      if (response.data) {
        setWishList(response.data);
      } else {
        console.log("err");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCartListing();
  }, [wishList]);

  useEffect(() => {
    getWishListing();
  }, []);
  return (
    <>
      <Container className="mt-5">
        <Tabs defaultActiveKey="Cart" id="uncontrolled-tab-example">
          <Tab eventKey="Cart" title="Cart" className="test-tab">
            <Row>
              <Col lg={8}>
                {cartList?.map((item,i) => (
                  <CartCard key={i} item={item} getCartListing={getCartListing} />
                ))}
              </Col>

              <Col lg={4}>
                <div className="cart_right_whole">
                  <div className="cart_right_total">
                    <p className="cart_right_caption">Total:</p>
                    <p className="cart_right_price">$310.00</p>
                  </div>
                  <hr className="cart_right_hr" />
                  <div className="cart_filling_right">
                    <div className="notes_ttl">
                      <p>Additional Comments</p>
                      <div className="note_tablet">
                        <span>Note</span>
                      </div>
                    </div>
                    <textarea
                      className="cart_right_textarea"
                      id=""
                      name=""
                      rows="5"
                      cols="41"
                    ></textarea>
                    <hr className="cart_right_hr" />
                    <input
                      type="text"
                      className="cart_voucher_input"
                      placeholder="Voucher"
                    />
                    <button className="apply_voucher_btn mt-3">
                      Apply Voucher
                    </button>
                    <div className="cart_shipping_dtls">
                      <p className="shipping_ttl"></p>
                      {/* <Select
                    options={[
                      { value: 'chocolate', label: 'Chocolate' },
                      { value: 'strawberry', label: 'Strawberry' },
                      { value: 'vanilla', label: 'Vanilla' },
                    ]}
                  /> */}



                      <button className="checkout_red_btn mt-3">
                        Checkout Now
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey="Wishlist" title="Wishlist" className="test-tab">
            <Row>
              {wishList?.map((item,i) => (
                <Col lg={3} key={i} className="mb-3">
                  <WishlistCard item={item} getWishListing={getWishListing} />
                </Col>
              ))}
            </Row>
          </Tab>
        </Tabs>
      </Container>
      <Footer />
    </>
  );
};

export default Cartpage;
