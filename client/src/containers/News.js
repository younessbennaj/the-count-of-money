import React, { useState, useEffect } from 'react';
import axios from "axios";

//Style
import "../index.css";

//Components
import ArticleCard from "../components/ArticleCard";

const News = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        //With MSWJS actived
        axios.get('/articles')
            .then(response => {
                setData(response.data);
            })
    }, []);

    return (
        <div className="flex flex-wrap -m-3">
            {data.map((article, index) => (
                <ArticleCard
                    id={article._id}
                    title={article.title}
                    url={article.link}
                    categories={article.categories}
                    image={article.enclosure.url}
                    key={index}
                />
            ))}
        </div>
    );
}

export default News;