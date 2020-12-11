import React, { useState, useEffect } from 'react';
import axios from "axios";
import Moment from "moment";
import {
    useLocation
  } from "react-router-dom";

//Style
import "../index.css";

//Loading
import Loading from "../components/Loading";

const Article = () => {
    let location = useLocation();
    let articleId = location.state.articleId;

    const [article, setArticle] = useState([]);

    useEffect(() => {
        axios.get('/articles/'+articleId)     //{ArticleId}')
        .then(response => {
            setArticle(response.data);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (article.title) {
        return (
            <div className="flex flex-wrap max-w-7xl mx-auto">
                <div className="w-full flex flex-col p-2">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
                        {article.enclosure ? 
                            <img className="bg-auto" src={article.enclosure.url} alt=""></img>
                        : 
                            <img className="bg-auto" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.waarp.fr%2Fnews-estivales-waarp%2F&psig=AOvVaw2dBFNXMXIElKGDRNDlVb9m&ust=1607695630100000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJjShI7Lw-0CFQAAAAAdAAAAABAD" alt=""></img>
                        }
                        <p className="p-4">{Moment(article.isoDate).format('d MMMM y')}</p>
                        <hr style={{color: "grey", backgroundColor: "grey", height: 2}}/>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="mb-4 text-xl">{article.title}</h3>
                            <div className="mb-4 text-grey-darker text-sm flex-1">
                                <p>{article.contentSnippet}</p>
                            </div>
                            <h3 className="mb-4 text-lg">Categories
                            {article.categories.map((category, index) => (
                                <p className="text-sm" key={index}>{category}</p>
                            ))}
                            </h3>
                            <hr style={{color: "grey", backgroundColor: "grey", height: 2}}/>
                            <a href={article.link} className="underline">See the original</a>
                            <p className="text-xs">{article.creator}</p>
                        </div>
                    </div>  
                </div>
            </div>
        );
    } else {
        return (
            <Loading/>
        )
    }
}

export default Article;