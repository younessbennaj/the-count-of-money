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
        <div class="flex flex-wrap max-w-5xl mx-auto">
            <div class="w-full flex flex-col p-2">
                <div class="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
                    <img class="bg-auto" src={article.urlToImage}></img>
                    <p class="p-4">{Moment(article.publishedAt).format('d MMMM y')}</p>
                    <div class="p-4 flex-1 flex flex-col">
                        <h3 class="mb-4 text-xl">{article.title}</h3>
                        <div class="mb-4 text-grey-darker text-sm flex-1">
                            <p>{article.content}</p>
                        </div>
                        <a href={article.url} class="border-t border-grey-light pt-2 text-xs text-blue hover:text-red uppercase no-underline tracking-wide">Nom de la source</a>
                        <p class="text-xs">{article.author}</p>
                    </div>
                </div>  
            </div>
        </div>
    );
}

export default Article;