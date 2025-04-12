import { BASE_URL } from '@/constants';
import Card from '@CoreUI/Card';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from './authSlice';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const data = await axios
            .post(
                `${BASE_URL}/auth/signin`,
                {
                    email,
                    password,
                },
                { validateStatus: false, withCredentials: true }
            )
            .catch((err) => {
                console.log('catch');
                console.log(err);
            });
        dispatch(loginUser(data.data));
    };

    return (
        <Card className='mt-16' isCenter>
            <fieldset className='fieldset w-xs'>
                <legend className='fieldset-legend'>Login</legend>
                <label className='fieldset-label'>Email</label>
                <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type='email'
                    className='input'
                    placeholder='Email'
                />
                <label className='fieldset-label'>Password</label>
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type='password'
                    className='input'
                    placeholder='Password'
                />
                <button onClick={handleLogin} disabled={!email || !password} className='btn btn-neutral mt-4'>
                    Login
                </button>
            </fieldset>
        </Card>
    );
};

export default SignIn;
