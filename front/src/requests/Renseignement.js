import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL= "http://localhost:3000/api/v1";

class Renseignement {

    static create(renseignement) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/renseignements/create`,
            renseignement,
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

    static update(observateurId, renseignement) {
        return new Promise((resolve, reject) => {
            axios.put(`${VUE_APP_API_BASE_URL}/renseignements/update`,
            {
                observateurId : observateurId,
                renseignement : renseignement
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
            axios.get(`${VUE_APP_API_BASE_URL}/renseignements/${observateurId}`,
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

export default Renseignement;