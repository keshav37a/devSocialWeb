import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router'

import { Chat } from '@Chat'
import { Footer, Loading, Navbar } from '@CoreUI'
import { useDocumentTitle } from 'src/hooks/useDocumentTitle'

import { signInUser } from '@Auth/authSlice'

import { useGetUserProfileQuery } from '@Profile/userProfileApi'

import { getCookieValue } from 'src/utils'

export const Body = () => {
    const dispatch = useDispatch()
    const { pathname } = useLocation()
    const { user } = useSelector((state) => state.auth)
    const { showChat, ongoingChats } = useSelector((state) => state.chat)

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
                          <Chat
                              key={partnerUser._id}
                              participants={[user._id, partnerUser._id]}
                              partnerUser={partnerUser}
                              signedInUser={user}
                          />
                      ))
                    : null}
            </div>
        </Loading>
    )
}
