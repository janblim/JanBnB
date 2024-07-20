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
import LoginButton from "./LoginButton";



function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

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
