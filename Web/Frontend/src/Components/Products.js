import React from 'react';
import { useNavigate } from 'react-router-dom';

function Product({ data ,product}) {
  const navigate = useNavigate()
  return (
    <>
      <div className='product_card'>
        <div className='product_cardimg'>
          <img
            className=''
            src={data?.imageUrl}
          />
        </div>
        <div className='product_card_details'>
         <p className='product_price'>{data.productName.slice(0,20)+"..."}</p>
          
          {/* <p className='prodcut_name'>{data?.categories[0] ? data?.categories[0]?.categoryName : ""}</p> */}
          {/* <div className='rating_start_whole'>
            <i className='fa-solid fa-star rating_star'></i>
            <i className='fa-solid fa-star rating_star'></i>
            <i className='fa-solid fa-star rating_star'></i>
            <i className='fa-solid fa-star rating_star'></i>
            <i className='fa-solid fa-star rating_star'></i>
          </div> */}
          <button className='common_button mt-3' onClick={()=> navigate(`/productDetails/${data?.subcategoryUuid}/${data?.productUuid}`)}>View</button>
        </div>
      </div>
    </>
  );
}

export default Product;
