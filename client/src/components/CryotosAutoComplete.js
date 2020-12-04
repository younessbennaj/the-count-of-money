//Autocomplete component to find a crypto currency 
const CryptosAutoComplete = () => {
    return (
        <div>
            <h2>CryptosAutoComplete</h2>
            <input className="border border-gray-300 focus:outline-none focus:border-blue-400 rounded-md" type="text" />
            <ul>
                <li>Choix 1</li>
                <li>Choix 2</li>
                <li>Choix 3</li>
            </ul>
        </div>
    );
}

export default CryptosAutoComplete;