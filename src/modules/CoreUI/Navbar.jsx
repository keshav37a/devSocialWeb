import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const handleNavigateToSignIn = () => navigate('/signin');

    return (
        <div className='navbar bg-base-300 shadow-sm'>
            <div className='flex-1'>
                <a className='btn btn-ghost text-xl'>DevTinder</a>
            </div>
            <div className='flex gap-2'>
                <div className='dropdown dropdown-end mx-6'>
                    {user ? (
                        <>
                            <span className='mr-6 text-sm'>Welcome, {user.firstName}</span>
                            <div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
                                <div className='w-10 rounded-full'>
                                    <img
                                        alt='Tailwind CSS Navbar component'
                                        src='https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                className='menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-3 w-52 p-2 shadow'
                            >
                                <li>
                                    <a className='justify-between'>Profile</a>
                                </li>
                                <li>
                                    <a>Settings</a>
                                </li>
                                <li>
                                    <a>Logout</a>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <div
                            onClick={handleNavigateToSignIn}
                            className='py-2 px-6 bg-[#1D232A] rounded-4xl cursor-pointer'
                        >
                            Sign in
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
