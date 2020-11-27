import React, { useState, useEffect } from 'react';
import axios from "axios";
import Moment from "moment";

//Style
import "../index.css";

//Components

const Article = ({ ArticleId }) => {

    const [article, setArticle] = useState([]);

    useEffect(() => {
        //with the real API
        // axios.get('http://localhost:5000/api')
        //   .then(response => {
        //     console.log(response.data);
        //     setMessage(response.data.message)
        //   })

        //With MSWJS actived
        axios.get('/article/1')     //{ArticleId}')
        .then(response => {
            setArticle(response.data);
        })
    }, []);

    return (
        <div className="flex flex-wrap max-w-5xl mx-auto">
            <div className="w-full flex flex-col p-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
                    <img className="bg-auto" src={article.urlToImage} alt=""></img>
                    <p className="p-4">{Moment(article.publishedAt).format('d MMMM y')}</p>
                    <div className="p-4 flex-1 flex flex-col">
                        <h3 className="mb-4 text-xl">{article.title}</h3>
                        <div className="mb-4 text-grey-darker text-sm flex-1">
                            <p>{article.content}</p>
                        </div>
                        <a href={article.url} className="border-t border-grey-light pt-2 text-xs text-blue hover:text-red uppercase no-underline tracking-wide">Nom de la source</a>
                        <p className="text-xs">{article.author}</p>
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default Article;