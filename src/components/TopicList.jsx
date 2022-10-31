import { useEffect, useState } from "react"
import { getAllTopics } from "../api";
import { Link } from "react-router-dom";

export const TopicList = () =>
{
    const [topics, setTopics] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() =>
    {
        getAllTopics()
        .then(({topics}) =>
        {
            setTopics(topics);
            setLoading(false);
        })
    }, [isLoading])

    if (isLoading) return <div className="d-flex justify-content-center"><div className="spinner-border" role="status"/></div>

    return <ul>{
        topics.map(({slug}, index) => <Link to={`/topic/${slug}`} key={index}>{slug}</Link>)
    }</ul>
}