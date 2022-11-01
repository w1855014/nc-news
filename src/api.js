import axios from 'axios';

const api = axios.create({baseURL:'https://nc-news-w1855014.herokuapp.com'});

export const getAllArticles = () =>
{
    return api.get(`/api/articles`)
    .then((res) => res.data)
}

export const getArticlesByTopic = (topic) =>
{
    return api.get(`/api/articles?topic=${topic}`)
    .then((res) => res.data)
}

export const getUserByUsername = (username) =>
{
    return api.get(`/api/users/${username}`)
    .then((res) => res.data)
}

export const getAllTopics = () =>
{
    return api.get(`/api/topics`)
    .then((res) => res.data)
}

export const getCommentsByArticleId = (article_id) =>
{
    return api.get(`/api/articles/${article_id}/comments`)
    .then((res) => res.data)
}

export const patchArticleVotesById = (article_id, inc_votes) =>
{
    return api.patch(`/api/articles/${article_id}`, {inc_votes})
}

export const patchCommentVotesById = (comment_id, inc_votes) =>
{
    return api.patch(`/api/comments/${comment_id}`, {inc_votes})
}

export const postCommentByArticleId = (article_id, body, author) =>
{
    return api.post(`api/articles/${article_id}/comments`, {body, author})
}