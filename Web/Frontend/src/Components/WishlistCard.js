import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { deleteMethod, postMethod } from "../helpers";

function WishlistCard(props) {
  let { item,getWishListing } = props;

  const removeFromWishlist = async () => {
      try {
        let url = `customers/secure/wishlist/${item?.productUuid}?`;
        var payload = {
          productId: item?.productUuid,
        };
        let token = localStorage.getItem("@token");
        let response = await deleteMethod({ url, payload, token });
        if (response.success) {
          toast.success(response.message);
          getWishListing()
        } else {
          toast.error(response.message);
        }
      } catch (e) {
        console.log(e);
      }
  };

  const moveToCart = async(product)=>{
    try{
      let url = `customers/secure/cart/${product?.productUuid}?quantity=1`;
      var payload = {
        productId: product?.productUuid,
        quantity: 1,
      };
      let token = localStorage.getItem("@token")
      let response = await postMethod({ url, payload,token });
      if(response.success){
        toast.success(response.message)
        removeFromWishlist()
      }else{
        toast.error(response.message)
      }
    }catch(e){
      console.log(e)
    }
    }
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
      <div className="cart_wish_whole mb-4 h-100">
        <div className="cart_closer mb-2 d-flex justify-content-end" onClick={removeFromWishlist}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div className="cart_dtls_only2 mb-0">
          <div className="cart_product_img w-100 mb-2">
            <img className="w-100" style={{objectFit:"contain"}} src={item?.imageUrl} />
          </div>
          <div className="my-2 d-flex justify-content-between w-100">
            <p className=" mb-2">₹ {item?.price}</p>
            <p className=" mb-2">⭐4.5</p>
          </div>
          <div className="cart_prod_details">
            <p className="mb-0 text-left">{item?.productName}</p>
          </div>
          <button onClick={()=>moveToCart(item)} className="btn mt-2 btn-outline-secondary w-100">
            Move To Cart
          </button>
        </div>
        
      </div>
    </>
  );
}

export default WishlistCard;
