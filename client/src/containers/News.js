import React, { useState, useEffect } from 'react';
import axios from "axios";

//Style
import "../index.css";

//Components
import ArticleCard from "../components/ArticleCard";

const News = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        //with the real API
        // axios.get('http://localhost:5000/api')
        //   .then(response => {
        //     console.log(response.data);
        //     setMessage(response.data.message)
        //   })

        //With MSWJS actived
        axios.get('/articles')
        .then(response => {
            setData(response.data);
        })
    }, []);

    return (
        <div class="flex flex-wrap -m-3">
            {data.map((article) => (
                <ArticleCard
                    title={article.title}
                    content={article.description}
                    author={article.author}
                    source={article.source.name}
                    url={article.url}
                    image={article.urlToImage}
                    key={article.name}
                />
            ))}
        </div>
    );
}

export default News;