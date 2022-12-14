import { getUserByUsername, patchArticleVotesById } from "../api";
import { Link } from "react-router-dom";
import { elapsedSince } from "../utilities/elapsedSince";
import { useState } from "react";

export const FeedPost = ({article, setModalArticle}) =>
{
    const [like, setLike] = useState(false);
    const {article_id, title, author, created_at, body, comment_count, votes} = article;
    let avatarURL = "";

    getUserByUsername(author)
    .then((user) =>
    {
        avatarURL = user.avatar_url;
    })

    const onLike = (event) =>
    {
        setLike((like) => !like);
        if (like) patchArticleVotesById(article_id, 1)
        else patchArticleVotesById(article_id, -1);
    }

    const onExpand = (event) =>
    {
        setModalArticle(article)
    }

    return <div className="card bg-light">
        <div className="card-header">
            <span>Posted by <a href={`/user/${author}`}>{author}</a>{`${elapsedSince(created_at)} ago`}</span>
        </div>
        <div className="card-body">
            <div className="row align-items-center">
                <div className="col-md-1">
                    <span>{like ? votes+1 : votes}<br/>votes</span>
                </div>
                <div className="col-md-11">
                    <h3>{title}</h3>
                    <p>{body}</p>
                </div>
            </div>
        </div>
        <div className="card-footer">
            <button onClick={onLike}>
                <i className={like? "bi-star-fill" : "bi-star"}/>
                <span>Like</span>
            </button>
            <button data-bs-toggle="modal" data-bs-target="#newsfeedModal" onClick={onExpand}>
                <i className="bi-chat-square-text"/>
                <span>{`${comment_count} comments`}</span>
            </button>
            <button onClick={() => {}}>
                <i className="bi-share"/>
                <span>Share</span>
            </button>
        </div>
    </div>
}