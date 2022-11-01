import axios from 'axios';

const api = axios.create({baseURL:'https://nc-news-w1855014.herokuapp.com'});

export const getAllArticles = (queryString) =>
{
    return api.get(queryString ? `/api/articles/?${queryString}` : 'api/articles')
    .then((res) => res.data)
}

export const getArticlesByTopic = (topic, queryString) =>
{
    return api.get(queryString ? `/api/articles?topic=${topic}&${queryString}` : `/api/articles?topic=${topic}`)
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