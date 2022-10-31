import { Newsfeed } from "./Newsfeed"
import { TopicList } from "./TopicList"

export const Home = () =>
{

    return <div className="container">
        <div className="col-8">
            <Newsfeed/>
        </div>
        <div className="col-4">
            <TopicList/>            
        </div>
    </div>
        

}