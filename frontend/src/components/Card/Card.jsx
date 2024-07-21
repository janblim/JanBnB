import React from 'react';
import './Card.css'
import { FaStar } from "react-icons/fa";



const Card = ({name, preview, city, state, rating, price}) => {

    price = price.toFixed(2) //adds two decimal places

  return (
    <div className='card'>
        <div className='preview-box'>
            <img src={preview} alt={name} />
        </div>
        <div className='location-box'>
            <span>
                {city}, {state}
            </span>
            <span>
            <FaStar/> {rating}
            </span>
        </div>
        <div className='price-box'>
            <span>${price} per night</span>
        </div>
    </div>
  );
}

export default Card;
