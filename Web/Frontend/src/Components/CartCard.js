import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { deleteMethod } from "../helpers";

function CartCard(props) {
  let { item,getCartListing } = props;

  const removeFromCart = async () => {
      try {
        let url = `customers/secure/cart/${item?.productUuid}?`;
        var payload = {
          productId: item?.productUuid,
        };
        let token = localStorage.getItem("@token");
        let response = await deleteMethod({ url, payload, token });
        if (response) {
          toast.success(response.message);
          getCartListing()
        } else {
          toast.error(response.message);
        }
      } catch (e) {
        console.log(e);
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
      <div className="cart_cart_whole mb-4">
        <div className="cart_dtls_only">
          <div className="cart_product_img me-4">
            <img className="" src={item?.imageUrl} />
          </div>
          <div className="cart_prod_details">
            <p className="cart_prodname mb-3">{item?.productName}</p>
            <div className="cart_price_separate mb-3 flex-column">
              <p className="cart_prodprice">Price ₹ {item?.price}</p>
              <p className="cart_prodprice">Total = {item?.total}</p>
            </div>
            <div className="cart_incdec_btns">
              <button className="cart_dec_btn"> - </button>
              <p className="cart_incdec_count">{item?.quantity}</p>
              <button className="cart_inc_btn"> + </button>
            </div>
          </div>
        </div>
        <div className="cart_closer" onClick={removeFromCart}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
    </>
  );
}

export default CartCard;
