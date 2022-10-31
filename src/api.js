import axios from 'axios';

const api = axios.create({baseURL:'https://nc-news-w1855014.herokuapp.com'});

export const getAllArticles = () =>
{
    return api.get(`/api/articles`)
    .then((res) => res.data)
}

export const getUserByUsername = (username) =>
{
    return api.get(`/api/users/${username}`)
    .then((res) => res.data)
}