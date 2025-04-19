import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router'

import { Footer, Loading, Navbar } from '@CoreUI'

import { signInUser } from '@Auth/authSlice'
import { useGetUserProfileQuery } from 'services'

import { getCookieValue } from 'src/utils'

export const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { user } = useSelector((state) => state.auth)
    const token = getCookieValue('token')

    const { isLoading: isUserProfileLoading, data: userProfileRequestData } = useGetUserProfileQuery(null, {
        skip: (!token && !user) || user,
    })
    const { data, status } = userProfileRequestData || {}

    useEffect(() => {
        const disAllowedRoutes = ['/profile', '/feed']
        const token = getCookieValue('token')
        if (disAllowedRoutes.includes(pathname) && !token) {
            navigate('/signin')
        }
        if (data?.user && status?.success && !user && token) {
            dispatch(signInUser(data.user))
        }
    }, [pathname, user, data?.user, status?.success, navigate])

    return (
        <>
            {isUserProfileLoading ? <Loading /> : null}
            <Navbar />
            <Outlet />
            <Footer />
        </>
    )
}
