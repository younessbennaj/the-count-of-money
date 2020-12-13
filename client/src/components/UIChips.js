const UIChips = ({name, value, id, defaultChecked}) => {
    return (
        <label htmlFor={id} className="chips">
            <input 
                type="checkbox"
                id={id}
                name={name}
                value={value}
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
                {name}
            </span>
        </label>
    )
}

export default UIChips;