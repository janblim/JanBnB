import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotsThunk } from '../../store/spot';
import Card from '../Card/Card';
import './Spash.css'
import { useEffect, useState } from 'react';

const Splash = () => {

    const dispatch = useDispatch()
    const spots = useSelector(state => state.spotState.allSpots) // grabs state
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getAllSpotsThunk())
        .then(() => (setIsLoaded(true)))
    },[dispatch, spots]);

    //go to Spot Details handler

  return isLoaded && (
    <div id='card-container'>
        {Object.keys(spots).map((key) => {
            const spot = spots[key]
            return(
                <div key={`${spot.id}-${spot.address}`}>
                    <span>
                        <Card
                        id={spot.id}
                        name={spot.name}
                        preview={spot.previewImage}
                        city={spot.city}
                        state={spot.state}
                        rating={spot.avgRating}
                        price={spot.price}
                        />
                    </span>
                </div>
                 )
        })}
    </div>
  );
}

export default Splash;
