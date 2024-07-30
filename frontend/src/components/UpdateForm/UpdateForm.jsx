import { useDispatch, useSelector} from 'react-redux';
import { updateSpotThunk, spotImageThunk} from '../../store/spot';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import './UpdateForm.css'


const UpdateForm = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false)
    const spot = useSelector((state) => state.spotState.spot)

    const [form, setForm] = useState({
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
    });

    const [images, setImages] = useState({
        preview: '',
        image1: '',
        image2: '',
        image3: '',
        image4: ''
    })


    const notImage = (url) => {
        if(!url){ return true }
        const ext = url.split('.').pop();
        if( ext === 'jpg' || ext === 'jpeg' || ext === 'png'){
            return false;
        }
        return true;
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log('inside form submit')
        if(Object.values(errors).length){
            throw new Error ('there are errors in the form')
        } else {

            setSubmitted(true)

            const data = await dispatch(updateSpotThunk(form, id)) //sends spot data to thunk

            if(data.errors){
                throw new Error ('Not able to update spot')
            }

            const imageKeys = Object.keys(images)

            if(!imageKeys){
                return
            }

            for (const key of imageKeys){
                const image = {
                        url: images[key],
                        preview: false
                    }
                await dispatch(spotImageThunk(image, id))
            }

            navigate(`/spots/${id}`);
            window.scrollTo(0, 0); // goes back to top of page
        }
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
        price,
        } = form; //destructure useState form

        const {
            url,
            image1,
            image2,
            image3,
            image4
        } = images;

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
      if(description?.length < 30){
        newErrors.description = 'Description needs a minimum of 30 characters'
      }
      if(!name){
        newErrors.name = 'Name is required'
      }
      if(!price){
        newErrors.price = 'Price is required'
      }

      if(notImage(url) && url){
        newErrors.url = "Image URL must end in .png, .jpg, or .jpeg"
      }

      if(notImage(image1) && image1){
        newErrors.image1 = "Image URL must end in .png, .jpg, or .jpeg"
      }
      if(notImage(image2) && image2){
        newErrors.image2 = "Image URL must end in .png, .jpg, or .jpeg"
      }
      if(notImage(image3) && image3){
        newErrors.image3 = "Image URL must end in .png, .jpg, or .jpeg"
      }
      if(notImage(image4) && image4){
        newErrors.image4 = "Image URL must end in .png, .jpg, or .jpeg"
      }

      setErrors(newErrors);

    }, [form, images])

    const updateForm = (e, label) => {
        setForm((prev) => {
          const newForm = {...prev};
          newForm[label] = e.target.value;
          return newForm
        })
      }

    const updateImage = (e, label) => {
      setImages((prev) => {
        const newImages = {...prev};
        newImages[label] = e.target.value;
        return newImages
      })
    }


  return (
    <div id='form-container'>
    <div >
        <h2>Update your Spot</h2>
        <h4>Where&apos;s your place located?</h4>
        <div>
            Guests will only get your exact address once they booked a reservation
        </div>
        <form onSubmit={handleFormSubmit}>
            <div>
                <label>Country</label>
                {errors.country && submitted ? <label className='error'>{errors.country}</label> : null}
                <input
                    type='text'
                    onChange={(e) => updateForm(e, 'country')}
                    value={form.country}
                    placeholder='Country'>
                </input>
            </div>
            <div>
                <label>Street Address</label>
                {errors.address && submitted ? <label className='error'>{errors.address}</label> : null}
                <input
                    type='text'
                    onChange={(e) => updateForm(e, 'address')}
                    value={form.address}
                    placeholder='Address'>
                </input>
            </div>
            <div className='column'>
                <span id='city'>
                    <label>City</label>
                    {errors.city && submitted ? <label className='error'>{errors.city}</label> : null}
                    <input
                        type='text'
                        placeholder='City'
                        value={form.city}
                        onChange={(e) => updateForm(e, 'city')}
                        ></input>
                </span>
                <span id='state'>
                    <label>State</label>
                    {errors.state && submitted ? <label className='error'>{errors.state}</label> : null}
                    <input
                        type='text'
                        value={form.state}
                        placeholder='STATE'
                        onChange={(e) => updateForm(e, 'state')}
                        ></input>
                </span>
            </div>
            <div className='column'>
                <span id='lat'>
                    <label>Latitude</label>
                    {errors.lat && submitted ? <label className='error'>{errors.lat}</label> : null}
                    <input
                        type='text'
                        value={form.lat}
                        placeholder='Latitute'
                        onChange={(e) => updateForm(e, 'lat')}
                        ></input>
                </span>
                <span id='lng'>
                    <label>Longitude</label>
                    {errors.lng && submitted ? <label className='error'>{errors.lng}</label> : null}
                    <input
                        type='text'
                        value={form.lng}
                        placeholder='Longitude'
                        onChange={(e) => updateForm(e, 'lng')}
                        ></input>
                </span>
            </div>
            <hr></hr>
            <div>
                <h3>Describe your place to guests</h3>
                <label id='desc-label'>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood</label>
                <textarea id='description' rows='15' cols='58' type='text'
                placeholder='Description'
                value={form.description}
                onChange={(e) => updateForm(e, 'description')}>
                </textarea>
                {errors.description && submitted ? <label className='error'>{errors.description}</label> : null}
            </div>
            <hr></hr>
            <div>
                <h3>Create a title for your spot</h3>
                <label>Catch guests&apos; attention with a spot title that highlights what makes your place special</label>
                <input
                    type='text'
                    placeholder='Name of your spot'
                    value={form.name}
                    onChange={(e) => updateForm(e, 'name')}
                ></input>
                {errors.name && submitted ? <label className='error'>{errors.name}</label> : null}
            </div>
            <hr></hr>
            <div>
                <h3>Set a base price for your spot</h3>
                <label>Competative pricing can help your listing stand out and rank higher in search results.</label>
                <br></br>
                <span id='dollar-sign'>$</span>
                <input
                    type='number'
                    placeholder='Price per night (USD)'
                    value={form.price}
                    onChange={(e) => updateForm(e, 'price')}
                ></input>
                {errors.price && submitted ? <label className='error'>{errors.price}</label> : null}
                <hr></hr>
            </div>
            <div>
                <h3>Liven up your spot with photos</h3>
                <label>Add more images to your spot.</label>

                <input type='text'
                placeholder='Image URL'
                onChange={(e) => updateImage(e, 'image1')}></input>
                {errors.image1 && submitted? <label className='error'>{errors.image1}</label> : null}

                <input type='text'
                placeholder='Image URL'
                onChange={(e) => updateImage(e, 'image2')}></input>
                {errors.image2 && submitted? <label className='error'>{errors.image2}</label> : null}

                <input type='text'
                placeholder='Image URL'
                onChange={(e) => updateImage(e, 'image3')}></input>
                {errors.image3 && submitted? <label className='error'>{errors.image3}</label> : null}

                <input type='text'
                placeholder='Image URL'
                onChange={(e) => updateImage(e, 'image4')}></input>
                {errors.image4 && submitted? <label className='error'>{errors.image4}</label> : null}
            </div>
            <hr></hr>
            <div id='button-container'>
                <button

                id='create-button'
                type='submit'>
                    Update Spot
                </button>
            </div>

        </form>

    </div>
    </div>
  );
}

export default UpdateForm;
