//We use utils methods to handle authentication through the app components 
import axios from "axios";

export const authenticateUser = ({ email: mail, password }, type) => {
    //We re-use the same logic for register and login route authentication
    //So, instead of two separated method, I use one with a "type" parameters 
    //"type" can be "register" or "login", and we use this variable in a dyamic string that describes the route


    const data = JSON.stringify({ mail, password });

    console.log(data);

    var config = {
        method: 'post',
        //Dynamix string that depends of the type parameters
        url: `/users/${type}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios(config)
        .then(function (response) {
            //We store the JWT sent by the server
            sessionStorage.setItem('jwt', response.data.jwt);
            //set axios request header with the token
            axios.defaults.headers.common['jwt'] = sessionStorage.getItem('jwt');
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function logoutUser() {
    console.log('user logged out');
    sessionStorage.removeItem('jwt');
}

