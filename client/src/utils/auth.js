//We use utils methods to handle authentication through the app components 
import axios from "axios";

export const loginUser = credentials => {
    const data = JSON.stringify(credentials);

    var config = {
        method: 'post',
        url: '/users/register',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            // console.log(JSON.stringify(response.data));
            // console.log(response.data.token);
            sessionStorage.setItem('auth-token', response.data.token);
        })
        .catch(function (error) {
            console.log(error);
        });
}
