import { useDispatch, useSelector } from 'react-redux';
import { getAllSpotsThunk } from '../../store/spot';
import Card from '../Card/Card';
import './Spash.css'
import { useEffect } from 'react';


const Splash = () => {

    const dispatch = useDispatch()
    const spots = useSelector(state => state.spotState) // grabs state

    useEffect(() => {
        const getSpots = async () => {

            dispatch(getAllSpotsThunk())
        }
        getSpots();
        console.log(spots)
    }, []);

    //go to Spot Details handler

  return (
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
