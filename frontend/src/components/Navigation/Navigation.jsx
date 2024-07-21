import { HiArrowUturnUp } from "react-icons/hi2";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import './Navigation.css';
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";



function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const navigate = useNavigate();

    const createSpotClick = (e) => {
        e.stopPropagation();
        navigate('/newspot')
    }
    const homeClick = (e) => {
        e.stopPropagation();
        navigate('/')
    }

    const createNewSpotButton = sessionUser ? (
        <div id='create-new-spot' onClick={(e) => createSpotClick(e)}>
            Create a New Spot
        </div>

    ) : (null)

    const sessionLinks = sessionUser ? ( //if there is a sessionUser, make user button
        <>
            <ProfileButton user={sessionUser} />
        </>
    ) : (   // if no sessionUser, make login and signup buttons
        <>
            <LoginButton/>
        </>
    );

    return ( //checks if the user isLoaded first, then renders sessionLinks
        <ul className='logged_in'>

            <li id='home'>
                <div onClick={(e) => homeClick(e)}>
                    <span className='j-logo'>
                        <HiArrowUturnUp />
                    </span>
                janbnb
                </div>
            </li>
            <div id='rightbox'>
                {isLoaded && createNewSpotButton}
                {isLoaded && sessionLinks}
            </div>
        </ul>
    );
}

export default Navigation;
