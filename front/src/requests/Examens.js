import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL= "http://localhost:3000/api/v1";

class Examens {

    static create(a, b, c, d, e, f, g, h, i, j, k, observateurId) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/examens/create`,
            {
                a, b, c, d, e, f, g, h, i, j, k, observateurId
            },
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    static select(observateurId) {
        
        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/examens/${observateurId}`,
            {
                headers: {
                     'Content-Type': 'application/json'
                 }
             })
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

}

export default Examens;