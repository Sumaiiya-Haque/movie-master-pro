import React from 'react';

import { Outlet } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar/Navbar';

const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <main className='max-w-[1200px] mx-auto'>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MainLayout;