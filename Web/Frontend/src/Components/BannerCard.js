import React from 'react';
import { Link } from 'react-router-dom';

function BannerCard() {
  return (
    <>
      <div className='banner_card'>
        <div className='bannercard_dtls'>
          <img
            className='bannercard_img'
            src={require('../assets/images/product_images_2/thumb_image2.jpg')}
          />
          <div className='banner_txt_dtls'>
            <p>New Arrivals</p>
            <h5>
              Summer <br /> Sale 20% off
            </h5>
            <Link>
              Shop Now <i className='fa-solid fa-arrow-right ms-2'></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default BannerCard;
