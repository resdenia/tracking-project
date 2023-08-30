/* eslint-disable implicit-arrow-linebreak */
import React, { useEffect, useState } from 'react';
import cls from './News.module.css';
import Card from '../../components/Card/Card';
import postsApi from '../../api/postApi';

interface Post {
    title: string;
    body: string;
    id: number;
    userId: number;
}

const News = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const getPosts = async () => {
            const newPosts = await postsApi.getPost();
            setPosts([...newPosts]);
        };

        getPosts();
    }, []);

    const renderPosts = () =>
        posts.map((post: Post) => (
            <Card
                key={`${post.id}_${post.userId}`}
                title={post.title}
                body={post.body}
            />
        ));

    return (
        <div className={cls.News}>
            {posts.length !== 0 ? renderPosts() : 'No Data'}
        </div>
    );
};

export default News;
