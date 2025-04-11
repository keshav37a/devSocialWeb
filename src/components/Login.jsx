import axios from 'axios';
import { useState } from 'react';
import { BASE_URL } from '../constants';
import Card from './Card';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        axios
            .post(
                `${BASE_URL}/auth/signin`,
                {
                    email,
                    password,
                },
                { validateStatus: false, withCredentials: true }
            )
            .catch((err) => {
                console.log(err);
            });
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

export default Login;
