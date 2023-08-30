import React from 'react';
import cls from './Home.module.css';
import Layout from '../../containers/Layout/Layout';
import News from '../../containers/News/News';

const Home = () => (
    <Layout>
        <News />
    </Layout>
);

export default Home;
