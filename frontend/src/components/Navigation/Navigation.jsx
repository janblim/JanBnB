import { CgProfile } from "react-icons/cg";
import { IoReorderThreeSharp } from "react-icons/io5";
import { HiArrowUturnUp } from "react-icons/hi2";

import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import './Navigation.css';
import { useState, useRef} from "react";
import { NavLink } from "react-router-dom";



function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();


    const toggleMenu = (e) => {
        e.stopPropagation(); //keeps click from bubbling up to doc & triggering closeMenu
        setShowMenu(!showMenu);
    }

    const ulClassName = 'profile-dropdown' + (showMenu ? "" : " hidden");

    const sessionLinks = sessionUser ? ( //if there is a sessionUser, make user button
        <div id='profile_button'>
            <ProfileButton user={sessionUser} />
        </div>
    ) : (   // if no sessionUser, make login and signup buttons
        <>

            <button
            onClick={toggleMenu}
            className='profile-button'>
                <div className='three-bars'>
                    <IoReorderThreeSharp />
                </div>
                <div className="button-logo">
                    <CgProfile />
                </div>
            </button>
            <ul className={ulClassName} ref={ulRef}>

                <li>
                    <OpenModalButton
                        buttonText='Log In'
                        modalComponent={<LoginFormModal />}
                        />
                </li>
                <li>
                    <OpenModalButton
                        buttonText="Sign Up"
                        modalComponent={<SignupFormModal />}
                        />
                </li>
            </ul>
        </>
    );

    return ( //checks if the user isLoaded first, then renders sessionLinks
        <ul className='logged_in'>
            <li className='home'>
                <NavLink to='/'>
                    <span className='j-logo'>
                        <HiArrowUturnUp />
                    </span>
                janbnb
                </NavLink>
            </li>
            {isLoaded && sessionLinks}
        </ul>
    );
}

export default Navigation;
