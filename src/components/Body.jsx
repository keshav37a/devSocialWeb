import { Outlet } from 'react-router';
import Footer from './Footer';
import Navbar from './Navbar';

function Body() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

export default Body;
