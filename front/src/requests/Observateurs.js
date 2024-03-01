import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL= "http://localhost:3000/api/v1";


class Observateurs {

    static create(observateur) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/observateurs/create`,
            observateur,
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

    static read() {
        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/observateurs`,{
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
            axios.get(`${VUE_APP_API_BASE_URL}/observateurs/${observateurId}`,{
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

    static apercu(observateurId) {
        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/observateurs/apercu/${observateurId}`,{
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

    static delete(observateurId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${VUE_APP_API_BASE_URL}/observateurs/${observateurId}`,{
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

export default Observateurs;