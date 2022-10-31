import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { elapsedSince } from "../utilities/elapsedSince";

export const FeedComment = ({comment}) =>
{
    const [like, setLike] = useState(false);
    const {comment_id, body, author, created_at} = comment;

    const {username} = useContext(UserContext);

    const onLike = (event) =>
    {
        setLike((like) => !like);
        // if (like) patchCommentVotesById(comment_id, 1);
        // else 
        // {
        //     if (votes > 0) patchCommentVotesById(comment_id, -1)
        // }
    }

    const onDelete = (event) =>
    {
        
    }

    const owned = username===author;

    return <div className="card">
        <div className="card-header">
            <span>Posted by <a href={`/user/${author}`}>{author}</a>{`${elapsedSince(created_at)} ago`}</span>
        </div>
        <div className="card-body">
            <p>{body}</p>
        </div>
        <div className="card-footer">
            <button onClick={onLike}>
                <i className={like? "bi-star-fill" : "bi-star"}/>
                <span>Like</span>
            </button>
            <button onClick={() => {}}>
                <i className="bi-share"/>
                <span>Share</span>
            </button>
            {owned ? <button onClick={onDelete}>
                <i className="bi-trash"/>
                <span>Delete</span>
            </button> : <></>}
        </div>
    </div>
}