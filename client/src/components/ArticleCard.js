import {
    Link
} from "react-router-dom";
const ArticleCard = ({ title, content, source, author, url, image }) => {

    return (
            <Link to="/article" class="articleCard w-full sm:w-1/2 md:w-1/3 flex flex-col p-2">
                <div class="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
                    <img class="bg-cover h-48" src={image}></img>
                    <div class="p-4 flex-1 flex flex-col">
                        <h3 class="mb-4 text-xl">{title}</h3>
                    </div>
                </div>
            </Link>
    )
}
export default ArticleCard;