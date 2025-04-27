import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router'

import { Footer, Loading, Navbar } from '@CoreUI'

import { signInUser } from '@Auth/authSlice'
import { useGetUserProfileQuery } from 'services/apiSlice'

import { getCookieValue } from 'src/utils'

export const Body = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const { user } = useSelector((state) => state.auth)
    const token = getCookieValue('token')

    const {
        isLoading: isUserProfileLoading,
        data: userProfileRequestData,
        error,
    } = useGetUserProfileQuery(null, {
        skip: (!token && !user) || user,
    })
    const { data, status } = userProfileRequestData || {}

    useEffect(() => {
        const disAllowedRoutes = ['/profile', '/feed']
        const token = getCookieValue('token')
        if (disAllowedRoutes.includes(pathname) && (!token || (token && error && !user))) {
            navigate('/signin')
        }
        if (data?.user && status?.success && !user && token) {
            dispatch(signInUser(data.user))
            if (pathname.includes('signin')) {
                navigate('/feed')
            }
        }
    }, [pathname, dispatch, error, user, data?.user, status?.success, navigate])

    return (
        <Loading isLoading={isUserProfileLoading}>
            <div className="flex flex-col">
                <Navbar />
                <div className="min-h-screen p-8">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </Loading>
    )
}
