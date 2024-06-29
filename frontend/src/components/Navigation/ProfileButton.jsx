import { CgProfile } from "react-icons/cg";
import { useDispatch } from "react-redux";
import * as sessionActions from '../../store/session'

function ProfileButton({ user }) {
    const dispatch = useDispatch();

    const logout = (e) => { //logout handler
        e.preventDefault();
        dispatch(sessionActions.logout())
    };

    return (
        <>
            <button>
                <CgProfile />
            </button>
            <ul className="profile-dropdown">
                <li>{user.username}</li>
                <li>{user.firstName}</li>
                <li>{user.email}</li>
                <li>
                    <button onClick={logout}>
                        Log Out
                    </button>
                </li>
            </ul>
        </>
    )
}

export default ProfileButton
