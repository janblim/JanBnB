import { useState, useEffect } from "react";
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
    const [errors, setErrors] = useState({}); //only error is message invalid credentials
    const [showErrors, setShowErrors] = useState(false)
    // if (sessionUser){ //if there is a session user, go to '/'
    //     return (<Navigate to="/" replace={true}/>);
    // }

    const handleSubmit = (e) => {
        e.preventDefault();
            setShowErrors(true)
            if(Object.values(errors).length){
                return
            } else {
            setErrors(''); //empties errors
            return dispatch(sessionActions.login({credential, password}))
               .then(closeModal)
               .catch(async (res) => {
                    const data = await res.json();
                    if (data.message){
                        const newError = {}
                        newError.invalid = data.message
                        setErrors(newError);
                    }
               });
            }
    };

    const demoLogin = (e) => {
        e.preventDefault();

        return dispatch(sessionActions.login({
            credential: 'demo@user.io',
            password: 'password',
          }))
          .then(closeModal)
          .catch(async (res) => {
            const data = await res.json();
            if(data.message){
                const newError  = {}
                newError.invalid = data.message
                setErrors(newError);
            }
          })
    }



    useEffect(() => { //for dynamic error handling
        const newErrors = {};
        if(credential.length < 4){
          newErrors.credential = 'Username must be at least 4 characters';
        }
        if(password.length < 6){
          newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
      }, [credential, password])

    return (
        <div id='login-box'>
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
            {errors.credential && showErrors && <p className='error'>{errors.credential}</p>}
                <label>
                    Password
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
            {errors.password && showErrors && <p className='error'>{errors.password}</p>}
            {errors.invalid && <p className='error'>{errors.invalid}</p>}

            <button
                id='login-button'
                className={credential && password ? 'red-button' : 'red-button-disabled'}
                type='submit'>
                Log In
            </button>
            <button id='login-button' onClick={(e) => demoLogin(e)}>Demo Login</button>
            </form>
        </div>
    )
}

export default LoginFormModal;
