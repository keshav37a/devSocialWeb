import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'

import { signOutUser } from '@Auth/authSlice'

import { deleteCookie } from 'src/utils'

import { BASE_URL } from 'src/constants'

export const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigateToSignIn = () => navigate('/signin');

    const handleLogout = async () => {
        const data = await axios
            .post(`${BASE_URL}/auth/signout`, { validateStatus: false, withCredentials: true })
            .catch((err) => {
                console.log(err);
            });
        dispatch(signOutUser(data.data));
        deleteCookie('token');
    };

    return (
        <div className='navbar bg-base-300 shadow-sm'>
            <div className='flex-1'>
                <Link className='btn btn-ghost text-xl' to='/'>
                    DevTinder
                </Link>
            </div>
            <div className='flex gap-2'>
                <div className='dropdown dropdown-end mx-6'>
                    {user ? (
                        <>
                            <span className='mr-6 text-sm'>Welcome, {user.firstName}</span>
                            <div className='btn btn-ghost btn-circle avatar' role='button' tabIndex={0}>
                                <div className='w-10 rounded-full'>
                                    <img
                                        alt='Tailwind CSS Navbar component'
                                        src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                                    />
                                </div>
                            </div>
                            <ul
                                className='menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow'
                                tabIndex={0}
                            >
                                <li>
                                    <Link className='justify-between' to='/profile'>
                                        Profile
                                    </Link>
                                </li>
                                <li onClick={handleLogout}>
                                    <a>Logout</a>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <div
                            className='py-2 px-6 bg-[#1D232A] rounded-4xl cursor-pointer'
                            onClick={handleNavigateToSignIn}
                        >
                            Sign in
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


