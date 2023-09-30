import React, { Component, useState } from "react";
import {
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Modal,
  Image,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ReactSearchBox from "react-search-box";
import { postMethod } from "../helpers";
import toast, { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Google from "../Views/auth/google";
import Facebook from "../Views/auth/Facebook";
import LoginModal from "./LoginModal";

function Header() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();
  // const [user,setUser]= useState({});
  let json = localStorage.getItem("@USER");
  let User = JSON.parse(json);
  const data = [
    {
      key: "john",
      value: "John Doe",
    },
    {
      key: "jane",
      value: "Jane Doe",
    },
    {
      key: "mary",
      value: "Mary Phillips",
    },
    {
      key: "robert",
      value: "Robert",
    },
    {
      key: "karius",
      value: "Karius",
    },
  ];
  const [showSignin, setShowSignin] = useState(false);
  const [eyechange, setEyechange] = useState("password");

  const handleClose = () => setShowSignin(false);
  const handleShow = () => setShowSignin(true);

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      let url = "users/login";
      var payload = {
        emailOrPhoneNumber: email,
        password: password,
        userType: "User",
      };
      let response = await postMethod({ url, payload });
      if (response.success) {
        toast.success(response.message);
        handleClose();
        setEmail("");
        setPassword("");
      } else {
        toast.error(response.error);
      }
    } catch (e) {
      toast.error(e.response.error);
      setEmail("");
      setPassword("");
    }
  };

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
      <Container fluid className="custom_container">
        <Container>
          <div className="top_header_whole">
            <div className="top_header_left">
              <button className="red_btn me-2">View</button>
              <p>Today's Winners List</p>
            </div>
            <div className="top_header_right">
              <div className="topbar_socials">
                <i className="fa-brands fa-twitter"></i>
                <i className="fa-brands fa-square-facebook"></i>
                <i className="fa-brands fa-instagram"></i>
              </div>
            </div>
          </div>
        </Container>
      </Container>
      <Container fluid className="middle_custom_container">
        <Container>
          <div className="middle_header_whole">
            <Row>
              <Col xl={2}>
                <img
                  onClick={() => navigate("/")}
                  className="cursor"
                  src={require("../assets/images/auth/blackbox.svg").default}
                />
              </Col>
              <Col xl={8}>
                <div className="searchbar_whole">
                  <div className="searchbar_separate">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <ReactSearchBox
                      placeholder="Search"
                      value="Doe"
                      data={data}
                      callback={(record) => console.log(record)}
                    />
                    {/* <input type='text'></input> */}
                  </div>
                  <DropdownButton
                    className=" middle_dropdown me-2"
                    id="dropdown-basic-button"
                    title="All Categories"
                  >
                    <Dropdown.Item href="#/action-1">
                      All Categories
                    </Dropdown.Item>
                    <Dropdown.Item href="" onClick={()=> navigate("/subcategory",{state:"Fashion"})}>Fashion</Dropdown.Item>
                    <Dropdown.Item href="" onClick={()=> navigate("/subcategory",{state:"Home&Living"})}>Home&Living</Dropdown.Item>
                    <Dropdown.Item href="" onClick={()=> navigate("/subcategory",{state:"Nature Foods"})}>
                      Nature Foods
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </Col>
              <Col xl={2}>
                <div className="middle_right_dtls d-flex">
                  <Dropdown className="bottom_header_dropdown w-50">
                    <Dropdown.Toggle id="dropdown-basic">
                      {User ? (
                        <img
                          className="img-fluid slider_image"
                          fluid
                          src={
                            User?.picture
                              ? User?.picture
                              : "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png"
                          }
                          alt="img"
                          height={30}
                          width={30}
                          style={{
                            objectFit: "contain",
                            height: "30px",
                            width: "30px",
                          }}
                        />
                      ) : (
                        <i className="fa-regular fa-user"></i>
                      )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        href="#/action-1"
                        onClick={() => {
                          if (User) {
                            return;
                          } else {
                            handleShow();
                          }
                        }}
                      >
                        <small>Profile</small>
                      </Dropdown.Item>
                      <Dropdown.Item
                        href="#/action-2"
                        onClick={() => {
                          localStorage.clear();
                          navigate("/")
                          window.location.reload();
                        }}
                      >
                        <small>Logout</small>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <button
                    className="profile_btn mx-4"
                    onClick={() => {
                      if (!User) {
                        // toast.error("please login to view cart items")
                        handleShow();
                      } else {
                        navigate("/cart");
                      }
                    }}
                  >
                    <i className="fa-solid fa-bag-shopping"></i>
                  </button>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </Container>
      <Container fluid className="bottom_custom_container">
        <Container>
          <Row>
            <Col xl={3}>
              <Dropdown className="bottom_header_dropdown">
                <Dropdown.Toggle id="dropdown-basic">
                  <i className="fa-solid fa-shapes me-2"></i> Categories
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="" onClick={()=> navigate("/subcategory",{state:"Fashion"})}>Fashion</Dropdown.Item>
                  <Dropdown.Item href="" onClick={()=> navigate("/subcategory",{state:"Home&Living"})}>Home&Living</Dropdown.Item>
                  <Dropdown.Item href="" onClick={()=> navigate("/subcategory",{state:"Nature Foods"})}>Nature Foods</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col lg={9}>
              <div className="bottom_dropdowns">
              <Dropdown className="bottom_right_dropdown">
                  <Dropdown id="dropdown-basic" onClick={()=> navigate("/")}>Home</Dropdown>
                </Dropdown>
                {/* <Dropdown className="bottom_right_dropdown">
                  <Dropdown.Toggle id="dropdown-basic">
                    Products
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown> */}
                <Dropdown className="bottom_right_dropdown">
                  <Dropdown id="dropdown-basic" onClick={() => {
                      if (!User) {
                        // toast.error("please login to view cart items")
                        handleShow();
                      } else {
                        navigate("/cart");
                      }
                    }}>Wishlist</Dropdown>
                  
                </Dropdown>

                <Dropdown className="bottom_right_dropdown">
                  <Dropdown id="dropdown-basic">Trending Products</Dropdown>
                </Dropdown>

                <Dropdown className="bottom_right_dropdown">
                  <Dropdown id="dropdown-basic">Coupons</Dropdown>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown className="bottom_right_dropdown">
                  <Dropdown.Toggle id="dropdown-basic">
                    Become a Vendor
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Another action
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-3">
                      Something else
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      {/* start of signin popup */}
      <LoginModal
        showSignin={showSignin}
        setShowSignin={setShowSignin}
        handleClose={handleClose}
        handleShow={handleShow}
      />
      {/* end of signin popup */}
    </>
  );
}

export default Header;
