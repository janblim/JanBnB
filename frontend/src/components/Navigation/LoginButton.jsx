import { CgProfile } from "react-icons/cg";
import { IoReorderThreeSharp } from "react-icons/io5";
import { useState, useEffect, useRef } from "react";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";



function LoginButton() {
    const [showMenu, setShowMenu] = useState(false); //stores boolean to control dropdown menu
    const ulRef = useRef();

    const toggleMenu = (e) => {
        e.stopPropagation();
        setShowMenu(!showMenu);
    }

    useEffect(() => { // opens dropdown menu by changing showMenu to false
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (ulRef.current && !ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu); //cleanup function removes event listener
    }, [showMenu]);



    //change classname of dropdown menu if showMenu is false (hidden)
    const ulClassName = 'profile-dropdown' + (showMenu ? "" : " hidden");

    return (

    <div className='profile-menu'>
        <div className="profile-box"></div>
            <span
            onClick={toggleMenu}
            className='profile-button'>
                <div className='three-bars'>
                    <IoReorderThreeSharp />
                </div>
                <div id="button-logo">
                    <CgProfile />
                </div>
            </span>

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

    </div>
    )
}

export default LoginButton
