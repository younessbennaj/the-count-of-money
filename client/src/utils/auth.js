//We use utils methods to handle authentication through the app components 
import axios from "axios";

export const authenticateUser = ({ email: mail, password }, type, cb) => {
    //We re-use the same logic for register and login route authentication
    //So, instead of two separated method, I use one with a "type" parameters 
    //"type" can be "register" or "login", and we use this variable in a dyamic string that describes the route

    const data = JSON.stringify({ mail, password });

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
            //Call the callback function when the user is successfuly logged in
            cb();
        })
        .catch(function (error) {
            console.log(error);
        });
}

export function logoutUser() {
    sessionStorage.removeItem('jwt');
    //We prevent an async op in the future
    return Promise.resolve();
}

export const getUserCredentials = (cb) => {
    axios.get("/users/profile")
        .then(response => {
            cb(response.data)
        })
}

