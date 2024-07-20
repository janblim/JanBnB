import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css'


const Card = ({preview, city, state, rating, price}) => {

    price = price.toFixed(2) //adds two decimal places
    const navigate = useNavigate()


    //go to Spot Details handler

    const goToSpotDetails = (e, spot) => {
        e.stopPropagation();
        navigate(`/spots/${spot.id}`)
    }

  return (
    <div className='card'>
        <div className='preview-box'>
            {preview}
        </div>
        <div className='location-box'>
            <span>
                {city}, {state}
            </span>
            <span>
                {rating}
            </span>
        </div>
        <div className='price-box'>
            <span>${price} per night</span>
        </div>
    </div>
  );
}

export default Card;
