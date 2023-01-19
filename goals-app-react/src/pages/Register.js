import React, {useState, useEffect} from 'react'
import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {reset, register} from '../store/redux/userSlice'
import {Spinner} from '../components/Spinner'
export const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, SetFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirm_password:''
    });

    const {isLoading: isLoading2} = useSelector(state => state.goal);
    const {user, isLoading, isError, isSucces, errors } = useSelector(state => state.user);
    const {name, email, password, confirm_password} = formData;

    const onHandleForm = (e) => {
        SetFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if(isSucces || user) {
            window.location.reload();
            navigate('/');
        }
    }, [isSucces, user, navigate]);

    useEffect(() => {
        if(isError) {
            toast.error(errors);
        }

        dispatch(reset());

        return () => {
            dispatch(reset());
        }
    }, [errors, isError, dispatch]);

    const onRegister = async (e) => {
        e.preventDefault();
        
        if(!name || !email || !password) {
            toast.error('Please Complete All Fields');
            return;
        }
        if(password !== confirm_password) {
            toast.error('Password not match');
            return;
        }
        const userData = {
            name,
            email, password, confirm_password
        }
        dispatch(register(userData));
    }

    if(isLoading || isLoading2) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading'>
                <h1>
                    <FaUser /> Register
                </h1>
                <p>please create account</p>
            </section>

            <section className='form'>
                <form onSubmit={(e) => onRegister(e)}>
                    <div className="form-group">
                        <input type="text" id='name' name='name' placeholder='Full Name' value={name} onChange={(e) => onHandleForm(e) } />
                    </div>
                    <div className="form-group">
                        <input type="email" id='email' name='email' placeholder='Email Address' value={email} onChange={(e) => onHandleForm(e) } />
                    </div>
                    <div className="form-group">
                        <input type="password" id='password' name='password' placeholder='Password' value={password} onChange={(e) => onHandleForm(e) } />
                    </div>
                    <div className="form-group">
                        <input type="password" id='confirm_password' name='confirm_password' placeholder='Password Confirm' value={confirm_password} onChange={(e) => onHandleForm(e) } />
                    </div>
                    <div className="form-group">
                        <button type='submit' className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    )
}
