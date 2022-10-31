import { Newsfeed } from "./Newsfeed"
import { TopicList } from "./TopicList"

export const Home = () =>
{

    return <div className="container">
        <div className="row">
            <div className="col-md-8">
                <Newsfeed/>
            </div>
            <div className="col-md-4">
                <TopicList/>            
            </div>
        </div>
    </div>
        

}