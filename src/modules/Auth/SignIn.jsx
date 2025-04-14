import { useState } from 'react';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

import { signInUser } from './authSlice';

import { Card } from '@CoreUI';

import { BASE_URL } from 'src/constants';

export const SignIn = () => {
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('password');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);

    const handleLogin = async () => {
        try {
            const { data } = await axios.post(
                `${BASE_URL}/auth/signin`,
                {
                    email,
                    password,
                },
                { validateStatus: false, withCredentials: true }
            );
            dispatch(signInUser(data));
            if (data?.data?.user) {
                navigate('/feed');
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card isCenter className='mt-16'>
            <fieldset className='fieldset w-xs'>
                <legend className='fieldset-legend'>Login</legend>
                <label className='fieldset-label'>Email</label>
                <input className='input' onChange={handleChangeEmail} placeholder='Email' type='email' value={email} />
                <label className='fieldset-label'>Password</label>
                <input
                    className='input'
                    onChange={handleChangePassword}
                    placeholder='Password'
                    type='password'
                    value={password}
                />
                <button className='btn btn-neutral mt-4' disabled={!email || !password} onClick={handleLogin}>
                    Login
                </button>
            </fieldset>
        </Card>
    );
};
