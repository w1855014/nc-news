import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom";
import { getAllArticles, getArticlesByTopic } from "../api"
import { FeedPost } from "./FeedPost"

export const Newsfeed = () =>
{
    const [articles, setArticles] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const [sortBy, setSortBy] = useState(null);

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

    const validSortQueries = ["article_id", "title", "topic", "author", "body", "created_at", "votes"];

    const sortParams = {
        title: "Title",
        topic: "Topic",
        author: "Author",
        body: "Content",
        created_at: "Date posted",
        comment_count: "Comments",
        votes: "Votes"
    }



    // const sortParams =
    // [
    //     ["Title", "title"],
    //     ["Topic", "topic"],
    //     ["Author", "author"],
    //     ["Content", "body"],
    //     ["Date Posted", "created_at"],
    //     ["Comments", "comment_count"],
    //     ["Votes", "votes"]
    // ]

    const [searchParams, setSearchParams] = useSearchParams();


    const onSort = () =>
    {

    }

    if (isLoading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"/></div>
    
    return <div>
        <ul className="list-group">
            <div className="dropdown">
                <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aris-expanded="false">
                {searchParams.get('sort_by') ? `Sort by ${sortParams[searchParams.get('sort_by')]}` : "Sort by"}    
                </button>
                <ul className="dropdown-menu">
                    {Object.entries(sortParams).map(([key, value]) =>
                    {
                        return <li><button className="dropdown-item" type="button" onClick={() => setSearchParams({"sort_by": key})}>{value}</button></li>
                    })}
                </ul>    
            </div>    
            {articles.map((article, index) =>
            {
                return <FeedPost article={article} setModalArticle={setModalArticle} key={index}/>
            })}
        </ul>
    </div>

    
}