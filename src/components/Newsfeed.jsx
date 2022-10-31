import { useEffect, useState } from "react"
import { getAllArticles } from "../api"
import { FeedPost } from "./FeedPost"

export const Newsfeed = () =>
{
    const [articles, setArticles] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const [modalArticle, setModalArticle] = useState();

    useEffect(() =>
    {
        getAllArticles()
        .then(({articles}) =>
        {
            setArticles(articles)
            setLoading(false);
        });
    }, [isLoading])



    if (isLoading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"/></div>

    if (!modalArticle)
    {
      return <div>
          <header>Most Popular</header>
          <div className="container">
                  <div className="col-8">
                  <ul>{articles.map((article, index) =>
                  {
                      return <FeedPost article={article} setModalArticle={setModalArticle} key={index}/>
                  })}</ul>
              </div>
          </div>
          </div>
    }
    
    return <div>
        <header>Most Popular</header>
        <div className="container">
                <div className="col-8">
                <ul>{articles.map((article, index) =>
                {
                    return <FeedPost article={article} setModalArticle={setModalArticle} key={index}/>
                })}</ul>
            </div>
        </div>
                
    </div>

    
}