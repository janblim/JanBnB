import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useModal } from "../../context/Modal";
import * as sessionActions from '../../store/session';
import './LoginForm.css'

function LoginFormModal(){
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    //variables
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({}); //set as empty object

    if (sessionUser){ //if there is a session user, go to '/'
        return (<Navigate to="/" replace={true}/>);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({}); //empties errors
            return dispatch(sessionActions.login({credential, password}))
               .then(closeModal)
               .catch(async (res) => {
                    const data = await res.json();
                    if (data && data.errors){ //(?.) 'optional chaining', shortcircuts as null. Very nice!
                        setErrors(data.errors)
                    }
               });
    };

    return (
        <>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username or Email
                <input
                    type='text'
                    value={credential}
                    onChange={(e) => setCredential(e.target.value)}
                    required
                />
                </label>
                <label>
                    Password
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
            {errors.credential && <p>{errors.credential}</p>}
            <button type='submit'>
                Log In
            </button>
            </form>
        </>
    )
}

export default LoginFormModal;
