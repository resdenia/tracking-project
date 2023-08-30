import React, { memo, FC } from 'react';
import cls from './Sidebar.module.css';

const Sidebar: FC = () => (
    <div className={cls.Sidebar}>
        <div
            className={cls.adSidebar}
            id="ad-slot-sidebar"
        />
    </div>
);

export default Sidebar;
