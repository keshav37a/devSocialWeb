import { lazy, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation, useNavigate } from 'react-router'

import { Loading, SuspenseWrapper } from '@components'
import { Footer, Navbar } from '@layout/components'
const Chat = lazy(() => import('@chat'))

import { signInUser } from '@auth/api/auth-slice'
import { useGetUserProfileQuery } from '@user-profile/api/user-profile-api'

import { useDocumentTitle } from 'hooks'

import { getCookieValue } from 'src/utils'

export const Body = () => {
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const { user, isLogoutDispatched } = useSelector((state) => state.auth)
    const { showChat, ongoingChats } = useSelector((state) => state.chat)
    const navigate = useNavigate()

    const token = getCookieValue('token')

    // Handle document title updates
    useDocumentTitle()

    const { isLoading: isUserProfileLoading, data: userProfileRequestData } = useGetUserProfileQuery(null, {
        skip: (!token && !user) || user,
    })
    const { data, status } = userProfileRequestData || {}

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [pathname])

    useEffect(() => {
        if (data?.user && status?.success && !user && token) {
            dispatch(signInUser(data.user))
        }
    }, [dispatch, data?.user, status?.success, user, token])

    useEffect(() => {
        if (isLogoutDispatched) {
            navigate('/auth')
        }
    }, [isLogoutDispatched, navigate])

    return (
        <Loading isLoading={isUserProfileLoading}>
            <div className="flex flex-col">
                <Navbar />
                <div className="min-h-screen p-8">
                    <Outlet />
                </div>
                <Footer />
                {showChat && ongoingChats.length > 0 && user?._id
                    ? ongoingChats.map((partnerUser) => (
                          <SuspenseWrapper key={partnerUser._id}>
                              <Chat
                                  participants={[user._id, partnerUser._id]}
                                  partnerUser={partnerUser}
                                  signedInUser={user}
                              />
                          </SuspenseWrapper>
                      ))
                    : null}
            </div>
        </Loading>
    )
}

export default Body
