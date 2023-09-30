import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProductCard({ data ,product}) {
  const navigate = useNavigate()
  return (
    <>
      <div className='product_card'>
        <div className='product_cardimg'>
          <img
            className=''
            src={data.imageUrl ? data.imageUrl : "https://cdn.pixabay.com/photo/2021/10/11/23/49/app-6702045_1280.png" }
          />
        </div>
        <div className='product_card_details'>
          {
            product ? <p className='product_price'>{data.subcategoryName}</p> : <p className='product_price'>{data.subcategoryName}</p>
          }
          
          {/* <p className='prodcut_name'>{data?.categories[0] ? data?.categories[0]?.categoryName : ""}</p> */}
          {/* <div className='rating_start_whole'>
            <i className='fa-solid fa-star rating_star'></i>
            <i className='fa-solid fa-star rating_star'></i>
            <i className='fa-solid fa-star rating_star'></i>
            <i className='fa-solid fa-star rating_star'></i>
            <i className='fa-solid fa-star rating_star'></i>
          </div> */}
          <button className='common_button mt-3' onClick={()=> navigate(`/product/${data?.subcategoryUuid}`)}>View</button>
        </div>
      </div>
    </>
  );
}

export default ProductCard;
