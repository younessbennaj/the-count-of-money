const ErrorMessage = ({ message }) => {
    return (
        <div className="flex items-center text-xs py-1 px-2 bg-white text-red-700 bg-red-100 border border-red-300 ">
            <div className="text-xs font-normal  max-w-full flex-initial">
                {message}
            </div>
        </div>
    )
}

export default ErrorMessage;