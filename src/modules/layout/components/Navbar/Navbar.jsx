import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'

import { Image } from '@components'

import { useSignOutMutation } from '@auth/api/auth-api'

import { ROUTES } from 'src/constants'

const defaultPhotoUrl = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'

export const Navbar = () => {
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()

    const [handleSignOut] = useSignOutMutation()

    const handleNavigateToSignIn = () => navigate(ROUTES.AUTH)

    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link className="btn text-xl btn-ghost" to="/">
                    DevSocial
                </Link>
            </div>
            <div className="flex gap-2">
                <div className="dropdown dropdown-end mx-6">
                    {user ? (
                        <>
                            <span className="mr-6 text-sm">Welcome, {user.firstName}</span>
                            <div className="btn avatar btn-circle btn-ghost" role="button" tabIndex={0}>
                                <Image
                                    alt="user-profile-pic"
                                    className="h-10 w-10"
                                    imgProps={{ className: 'rounded-full' }}
                                    src={user?.photoUrl || defaultPhotoUrl}
                                />
                            </div>
                            <ul
                                className="ring-opacity-5 dropdown-content menu z-1 mt-3 w-52 menu-sm rounded-box bg-base-300 p-2 shadow ring-1 ring-black"
                                tabIndex={0}
                            >
                                <li>
                                    <Link className="justify-between" to={ROUTES.FEED}>
                                        Feed
                                    </Link>
                                </li>
                                <li>
                                    <Link className="justify-between" to={ROUTES.CONNECTIONS}>
                                        Connections
                                    </Link>
                                </li>
                                <li>
                                    <Link className="justify-between" to={ROUTES.CONNECTION_REQUESTS}>
                                        Requests
                                    </Link>
                                </li>
                                <li>
                                    <Link className="justify-between" to={ROUTES.PROFILE}>
                                        Profile
                                    </Link>
                                </li>
                                <li onClick={handleSignOut}>
                                    <a>Logout</a>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <div
                            className="cursor-pointer rounded-4xl bg-[#1D232A] px-6 py-2"
                            onClick={handleNavigateToSignIn}
                        >
                            Sign in
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
