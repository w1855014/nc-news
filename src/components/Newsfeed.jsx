import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { getAllArticles, getArticlesByTopic } from "../api"
import { FeedPost } from "./FeedPost"

export const Newsfeed = () =>
{
    const [articles, setArticles] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const [modalArticle, setModalArticle] = useState();


    const topic = useParams().slug;

    useEffect(() =>
    {
        if (topic)
        {
            getArticlesByTopic(topic)
            .then(({articles}) =>
            {
                setArticles(articles);
                setLoading(false);
            })
        }
        else
        {
            getAllArticles()
            .then(({articles}) =>
            {
                setArticles(articles)
                setLoading(false);
            });
        }
    }, [isLoading])



    if (isLoading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"/></div>
    
    return <div>
        <header>Most Popular</header>
        <ul>{articles.map((article, index) =>
        {
            return <FeedPost article={article} setModalArticle={setModalArticle} key={index}/>
        })}</ul>
    </div>

    
}