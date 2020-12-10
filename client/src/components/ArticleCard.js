import { useHistory } from "react-router-dom";
const ArticleCard = ({ id, title, url, categories, image }) => {
    const history = useHistory();

    function cardClick() {
        history.push({
            pathname: '/article',
            state: { articleId: id } //this.props.location.state.detail
        })
    }

    return (
        <div onClick={cardClick} className="articleCard w-full sm:w-1/2 md:w-1/3 flex flex-col p-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden flex-1 flex flex-col">
                <img className="bg-cover h-48" src={image} alt=""></img>
                <div className="p-4 flex-1 flex flex-col">
                    <h3 className="mb-4 text-xl">{title}</h3>
                    <a href={url} className="underline">See the original</a>
                </div>
            </div>
        </div>
    )
}
export default ArticleCard;