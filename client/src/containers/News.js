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
                    title={article.title}
                    content={article.description}
                    author={article.author}
                    source={article.source.name}
                    url={article.url}
                    image={article.urlToImage}
                    key={index}
                />
            ))}
        </div>
    );
}

export default News;