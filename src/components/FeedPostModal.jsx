import { useState , useEffect, useContext } from "react";
import { deleteCommentById, getCommentsByArticleId, postCommentByArticleId } from "../api";
import { UserContext } from "../contexts/UserContext";
import { FeedComment } from "./FeedComment";

export const FeedPostModal = ({article}) =>
{
    const [comments, setComments] = useState()
    const [isLoading, setLoading] = useState(true);

    const {username} = useContext(UserContext)

    useEffect(() =>
    {
        getCommentsByArticleId(article.article_id)
        .then(({comments}) =>
        {
            setComments(comments);
            setLoading(false);
        })
    }, [article])

    const onComment = (event) =>
    {
        event.preventDefault()
        const body = event.target.elements.comment.value;
        setComments((comments) =>
        {
            return [{body, author: username, votes: 0, created_at: Date.now()}, ...comments]
        });
        postCommentByArticleId(article.article_id, body, username)
    }

    return <div className="modal fade" id="newsfeedModal">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{article.title}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                    <p>{article.body}</p>
                    <ul>{ isLoading
                        ? <div className="d-flex justify-content-center"><div className="spinner-border" role="status"/></div>
                        : comments.map((comment, index) => <FeedComment comment={comment} setComments={setComments} key={index}/>)  
                    }</ul>
                </div>
                <div className="modal-footer">
                    <form onSubmit={onComment}>
                        <div className="form-group">
                            <textarea className="form-control" name="comment" rows="5" placeholder="What are your thoughts?"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary">Comment</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
}