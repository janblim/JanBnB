import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllSpotsThunk } from '../../store/spot';
import { useNavigate } from 'react-router-dom';



const NewSpot = () => {

    const dispatch = useDispatch()
    // const spots = useSelector(state => state.spotState.allSpots) // grabs state
    const navigate = useNavigate()

    const [form, setForm] = useState({
        address: '',
        city: '',
        state: '',
        country: '',
        lat: 0,
        lng: 0,
        name: '',
        description: '',
        price: 0
    });

    const [images, setImages] = useState({
        url: '',
        preview: true
    });

  return (
    <div>
        <h2>Create a new Spot</h2>
        <h4>Where's your place located?</h4>
        <div>
            Guests will only get your exact address once they booked a reservation
        </div>
        <form>
            <div>
                <label>Country</label>
                <input type='text'></input>
            </div>
            <div>
                <label>Street Address</label>
                <input type='text'></input>
            </div>
            <div>
                <label>City</label>
                <input type='text'></input>
            </div>
            <div>
                <label>State</label>
                <input type='text'></input>
            </div>
            <div className='coordinates'>
                <span>
                    <label>Latitude</label>
                    <input type='text'></input>
                </span>
                <span> , </span>
                <span>
                    <label>Longitude</label>
                    <input type='text'></input>
                </span>
            </div>
            <div>
                <h3>Discribe your place to guests</h3>
                <label>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</label>
                <input type='text'></input>
            </div>
            <div>
                <h3>Create a title for your spot</h3>
                <label>Catch guests' attention with a spot title that highlights what makes your place special</label>
                <input type='text'></input>
            </div>
            <div>
                <h3>Set a base price for your spot</h3>
                <label>Competative pricing can help your listing stand out and rank higher in search results.</label>
                <br></br>
                <span>$</span>
                <input type='number'></input>
            </div>
            <div>
                <h3>Liven up your spot with photos</h3>
                <label>Submit a link at least one photo to publish your spot</label>
                <input type='text'></input>
                <input type='text'></input>
                <input type='text'></input>
                <input type='text'></input>
                <input type='text'></input>
            </div>


        </form>
    </div>
  );
}

export default NewSpot;
