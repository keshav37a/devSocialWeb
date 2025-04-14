import { useCallback, useEffect } from 'react';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { Footer, Navbar } from '@CoreUI';

import { signInUser } from '@Auth/authSlice';

import { getCookieValue } from 'src/utils';

import { BASE_URL } from 'src/constants';

export const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { user } = useSelector((state) => state.auth);

    const fetchUserProfile = useCallback(async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
            if (data.data?.user) {
                dispatch(signInUser(data));
            }
        } catch (err) {
            console.log(err);
            if (err.status === 401) {
                navigate('/signin');
            }
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        const token = getCookieValue('token');
        if (token && !user) {
            fetchUserProfile();
        }
    }, [fetchUserProfile, user]);

    useEffect(() => {
        const disAllowedRoutes = ['/profile', '/feed'];
        const token = getCookieValue('token');
        if (disAllowedRoutes.includes(pathname) && !token && !user) {
            navigate('/signin');
        }
    }, [pathname, user, navigate]);

    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
};
