import React from 'react';
import cls from './Footer.module.css';

const Footer = () => {
    console.log('Footer');
    return (
        <div className={cls.Footer}>
            Footer
            <div
                className={cls.adFooter}
                id="ad-slot-footer"
            />
        </div>
    );
};

export default Footer;
