import {
    Link
} from "react-router-dom";
const ArticleCard = ({ title, content, source, author, url, image }) => {

    return (
            <Link to="/article" className="articleCard w-full sm:w-1/2 md:w-1/3 flex flex-col p-2">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
                    <img className="bg-cover h-48" src={image} alt=""></img>
                    <div className="p-4 flex-1 flex flex-col">
                        <h3 className="mb-4 text-xl">{title}</h3>
                    </div>
                </div>
            </Link>
    )
}
export default ArticleCard;