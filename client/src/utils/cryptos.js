import axios from "axios";

export const getAllowedCryptos = () => {
    return new Promise((resolve, reject) => {
        axios.get('/cryptos')
            .then(response => {
                let allowed = response.data.filter(crypto => {
                    return crypto.allowed;
                })

                resolve(allowed);
            });
    })

}

export const getUnAllowedCryptos = () => {
    return new Promise((resolve, reject) => {
        axios.get('/cryptos')
            .then(response => {
                let unAllowed = response.data.filter(crypto => {
                    return !crypto.allowed;
                })

                resolve(unAllowed);
            });
    })
}