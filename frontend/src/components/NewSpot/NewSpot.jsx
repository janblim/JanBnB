import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getAllSpotsThunk } from '../../store/spot';
import { useNavigate } from 'react-router-dom';
import './NewSpot.css'



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

    const [prevImage, setPrevImage] = useState({
        url: '',
        preview: true
    });

    const [images, setImages] = useState({
        image1: '',
        image2: '',
        image3: '',
        image4: ''
    })

    const [errors, setErrors] = useState({});

    const notImage = (url) => {
        const ext = url.split('.').pop();
        if( ext === 'jpg' || ext === 'jpeg' || ext === 'png'){
            return false;
        }
        return true;
    }

    useEffect(() => { //for dynamic error handling
      const newErrors = {};
      const {
        name,
        address,
        city,
        state,
        country,
        lat,
        lng,
        description,
        price
        } = form; //destructure useState form

        const {url} = prevImage;

        const {image1, image2, image3, image4} = images;

      if(!country){
        newErrors.country = 'Country is required';
      }
      if(!address){
        newErrors.address = 'Address is required';
      }
      if(!city){
        newErrors.city = 'City is required';
      }
      if(!state){
        newErrors.state = 'State is required';
      }
      if(!lat){
        newErrors.lat = 'Latitude is required';
      }
      if(!lng){
        newErrors.lng = 'Longitude is required';
      }
      if(description.length < 30){
        newErrors.description = 'Description needs a minimum of 30 characters'
      }
      if(!name){
        newErrors.name = 'Name is required'
      }
      if(!price){
        newErrors.price = 'Price is required'
      }
      if(!url){
        newErrors.url = "Preview image is required"
      }
      if(notImage(image1)){
        newErrors.image1 = "Image URL must end in .png, .jpg, or .jpeg"
      }
      if(notImage(image2)){
        newErrors.image2 = "Image URL must end in .png, .jpg, or .jpeg"
      }
      if(notImage(image3)){
        newErrors.image3 = "Image URL must end in .png, .jpg, or .jpeg"
      }
      if(notImage(image4)){
        newErrors.image4 = "Image URL must end in .png, .jpg, or .jpeg"
      }



      setErrors(newErrors);

    }, [form])

  return (
    <div id='form-container'>
    <div >
        <h2>Create a new Spot</h2>
        <h4>Where's your place located?</h4>
        <div>
            Guests will only get your exact address once they booked a reservation
        </div>
        <form>
            <div>
                <label>Country</label>
                {errors.country ? <label className='error'>{errors.country}</label> : null}
                <input type='text' value={form.country} placeholder='Country'></input>
            </div>
            <div>
                <label>Street Address</label>
                {errors.address ? <label className='error'>{errors.address}</label> : null}
                <input type='text' value={form.address} placeholder='Address'></input>
            </div>
            <div className='column'>
                <span id='city'>
                    <label>City</label>
                    {errors.city ? <label className='error'>{errors.city}</label> : null}
                    <input type='text' placeholder='City'></input>
                </span>
                <span id='state'>
                    <label>State</label>
                    {errors.state ? <label className='error'>{errors.state}</label> : null}
                    <input type='text' placeholder='STATE'></input>
                </span>
            </div>
            <div className='column'>
                <span id='lat'>
                    <label>Latitude</label>
                    {errors.lat ? <label className='error'>{errors.lat}</label> : null}
                    <input  type='text' placeholder='Latitude'></input>
                </span>
                <span id='lng'>
                    <label>Longitude</label>
                    {errors.lng ? <label className='error'>{errors.lng}</label> : null}
                    <input  type='text' placeholder='Longitude'></input>
                </span>
            </div>
            <hr></hr>
            <div>
                <h3>Discribe your place to guests</h3>
                <label>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</label>
                <textarea id='description' rows='15' cols='58' type='text' placeholder='Description'></textarea>
                {errors.description ? <label className='error'>{errors.description}</label> : null}
            </div>
            <hr></hr>
            <div>
                <h3>Create a title for your spot</h3>
                <label>Catch guests' attention with a spot title that highlights what makes your place special</label>
                <input type='text' placeholder='Name of your spot'></input>
                {errors.name ? <label className='error'>{errors.name}</label> : null}
            </div>
            <hr></hr>
            <div>
                <h3>Set a base price for your spot</h3>
                <label>Competative pricing can help your listing stand out and rank higher in search results.</label>
                <br></br>
                <span id='dollar-sign'>$</span>
                <input type='number' placeholder='Price per night (USD)'></input>
                {errors.price ? <label className='error'>{errors.price}</label> : null}
                <hr></hr>
            </div>
            <div>
                <h3>Liven up your spot with photos</h3>
                <label>Submit a link at least one photo to publish your spot</label>
                <input type='text' placeholder='Preview Image URL'></input>
                {errors.url ? <label className='error'>{errors.url}</label> : null}
                <input type='text' placeholder='Image URL'></input>
                {errors.image1 ? <label className='error'>{errors.image1}</label> : null}
                <input type='text'placeholder='Image URL'></input>
                {errors.image2 ? <label className='error'>{errors.image2}</label> : null}
                <input type='text'placeholder='Image URL'></input>
                {errors.image3 ? <label className='error'>{errors.image3}</label> : null}
                <input type='text'placeholder='Image URL'></input>
                {errors.image4 ? <label className='error'>{errors.image4}</label> : null}
            </div>
            <hr></hr>
            <div id='button-container'>
                <button
                id='create-button'
                type='submit'>
                    Create Spot
                </button>
            </div>

        </form>

    </div>
    </div>
  );
}

export default NewSpot;
