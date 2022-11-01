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
    
    const [searchParams, setSearchParams] = useSearchParams();
    
    const topic = useParams().slug;

    useEffect(() =>
    {
        const queryString = searchParams.toString() ?? "";

        if (topic)
        {
            getArticlesByTopic(topic, queryString)
            .then(({articles}) =>
            {
                setArticles(articles);
                setLoading(false);
            })
        }
        else
        {
            getAllArticles(queryString)
            .then(({articles}) =>
            {
                setArticles(articles)
                setLoading(false);
            });
        }
    }, [isLoading, searchParams])

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

    const orderParams = {
        ASC: "Ascending",
        DESC: "Descending"
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



    const onFilter = (key, value) =>
    {
        setSearchParams((params) =>
        {
            params.set(key, value);
            return params;
        });
    }

    if (isLoading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"/></div>
    
    return <div>
        <div className="container">
            <div className="row">
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aris-expanded="false">
                    {searchParams.get('sort_by') ? `Sort by ${sortParams[searchParams.get('sort_by')]}` : "Sort by"}    
                    </button>
                    <ul className="dropdown-menu">
                        {Object.entries(sortParams).map(([key, value], index) =>
                        {
                            return <li key={index}><button className="dropdown-item" type="button" onClick={() => onFilter("sort_by", key)}>{value}</button></li>
                        })}
                    </ul>    
                </div>

                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aris-expanded="false">
                    {searchParams.get('order') ? `Order ${orderParams[searchParams.get('order')]}` : "Order"}    
                    </button>
                    <ul className="dropdown-menu">
                        {Object.entries(orderParams).map(([key, value], index) =>
                        {
                            return <li key={index}><button className="dropdown-item" type="button" onClick={() => onFilter("order", key)}>{value}</button></li>
                        })}
                    </ul>    
                </div>
                {/* <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="radioDesc" onChange={() => onFilter("order", "DESC")} checked/>
                    <label className="form-check-label" htmlFor="radioDesc">Descending</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="radioAsc" onChange={() => onFilter("order", "ASC")}/>
                    <label className="form-check-label" htmlFor="radioAsc">Ascending</label>
                </div> */}
            </div>
        </div>
        <ul className="list-group">
            {articles.map((article, index) =>
            {
                return <FeedPost article={article} setModalArticle={setModalArticle} key={index}/>
            })}
        </ul>
    </div>

    
}