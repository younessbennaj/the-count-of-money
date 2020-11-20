//We use utils methods to handle authentication through the app components 
import axios from "axios";

export const authenticateUser = (credentials, type) => {
    //We re-use the same logic for register and login route authentication
    //So, instead of two separated method, I use one with a "type" parameters 
    //"type" can be "register" or "login", and we use this variable in a dyamic string that describes the route

    const data = JSON.stringify(credentials);

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
            sessionStorage.setItem('auth-token', response.data.token);
        })
        .catch(function (error) {
            console.log(error);
        });
}

// export const loginUser = credentials => {
//     const data = JSON.stringify(credentials);

//     var config = {
//         method: 'post',
//         url: '/users/register',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         data: data
//     };

//     axios(config)
//         .then(function (response) {
//             // console.log(JSON.stringify(response.data));
//             // console.log(response.data.token);
//             sessionStorage.setItem('auth-token', response.data.token);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

// export const signupUser = credentials => {
//     const data = JSON.stringify(credentials);

//     var config = {
//         method: 'post',
//         url: '/users/register',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         data: data
//     };

//     axios(config)
//         .then(function (response) {
//             // console.log(JSON.stringify(response.data));
//             // console.log(response.data.token);
//             sessionStorage.setItem('auth-token', response.data.token);
//         })
//         .catch(function (error) {
//             console.log(error);
//         });
// }

export function logoutUser() {
    console.log('user logged out');
    sessionStorage.removeItem('auth-token');
}

