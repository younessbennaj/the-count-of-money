import React, { useState, useEffect } from 'react';
import axios from "axios";

//Style
import "../index.css";

//Components
import ArticleCard from "../components/ArticleCard";

//Loading
import Loading from "../components/Loading";

const News = () => {

    const [data, setData] = useState([]);

    useEffect(() => {

        //With MSWJS actived
        axios.get('/articles')
            .then(response => {
                setData(response.data);
            })
    }, []);

    if(data.length > 0) {
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
    } else {
        return (
            <Loading/>
        )
    }
}

export default News;