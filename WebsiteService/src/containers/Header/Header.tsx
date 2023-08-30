/* eslint-disable operator-linebreak */
import React from 'react';
import { Link } from 'react-router-dom';

import cls from './Header.module.css';

const Header = () => (
    <div className={cls.Header}>
        <div className={cls.Logo}>
            <h1>My News Website</h1>
        </div>
        <div className={cls.menu}>
            <ul className={cls.menuList}>
                <li className={cls.menuItem}>
                    <Link className={cls.link} to="/">
                        Home
                    </Link>
                </li>
                <li className={cls.menuItem}>
                    <Link className={cls.link} to="/about">
                        About
                    </Link>
                </li>
                <li className={cls.menuItem}>
                    <Link className={cls.link} to="/blog">
                        Blog
                    </Link>
                </li>
                <li className={cls.menuItem}>
                    <Link
                        className={cls.link}
                        to="/contact"
                    >
                        Contact us
                    </Link>
                </li>
            </ul>
        </div>
        <div className={cls.adBanner} id="ad-slot-header" />
    </div>
);

export default Header;
