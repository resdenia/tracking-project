import React from 'react';
import cls from './Layout.module.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

interface IProps {
    children: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
    console.log('s');

    return (
        <div className={cls.container}>
            <div className={cls.row}>
                <Header />
            </div>

            <div className={cls.row}>
                <div className={cls.mainRow}>
                    <Sidebar />
                    <div className={cls.main}>
                        {children}
                    </div>
                </div>
            </div>
            <div className={cls.row}>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
