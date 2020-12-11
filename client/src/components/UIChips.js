const UIChips = ({item, defaultChecked}) => {
    return (
        <label htmlFor={item} className="chips">
            <input 
                type="checkbox"
                id={item}
                name={item}
                value={item}
                defaultChecked={defaultChecked}
                className="hidden"
            />
            {/* <span>Hello</span> */}
            <span className="
                bg-blue-200
                text-blue-700
                rounded-full
                py-1
                px-4 
                inline-block
                sibling-checked:text-gray-50
                mr-3
                my-2
                "
             >
                {item}
            </span>
        </label>
    )
}

export default UIChips;