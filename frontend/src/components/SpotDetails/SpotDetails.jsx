import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOneSpotThunk } from '../../store/spot';


const SpotDetails = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const spot = useSelector((state) => state.spotState.spot)

    useEffect(() => {
        const getSpot = async () => {
            dispatch(getOneSpotThunk(id))
        }
        getSpot();

    }, []);

  return (
    <div>
        <h1>{spot.name}</h1>
        <h1>{spot.address}</h1>

            {spot.SpotImages ? spot.SpotImages.map(image => (
            <div key={`${image.id}-${image.url}`}>
                <span>

                        {image.url}

                </span>
            </div>
            )) : null}
    </div>
  );
}

export default SpotDetails;
