import React from 'react';
import cls from './Home.module.css';
import MetricsDisplay from '../../containers/MetricsDisplay/MetricsDisplay';
import DomainSelect from '../../containers/DomainSelect/DomainSelect';

const Home = () => (
    <div className={cls.PageWrapper}>
        <DomainSelect />
        <MetricsDisplay />
    </div>
);

export default Home;
