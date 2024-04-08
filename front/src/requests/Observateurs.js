import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL = "http://localhost:3000/api/v1";


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
            axios.get(`${VUE_APP_API_BASE_URL}/observateurs`, {
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
            axios.get(`${VUE_APP_API_BASE_URL}/observateurs/${observateurId}`, {
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



    static selected(observateurId) {
        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/observateurs/selected/${observateurId}`, {
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

    static apercu(observateurId, interventionId, inspecteurId) {

        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/observateurs/apercu/${observateurId}/${interventionId}/${inspecteurId}`, {
                headers: this.headers,
                responseType: 'blob',
            })
                .then(response => {
                    resolve(window.open(URL.createObjectURL(response.data)));
                })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    }
    
    static send(observateurId, interventionId, inspecteurId) {

        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/observateurs/send/${observateurId}/${interventionId}/${inspecteurId}`, {
                headers: this.headers,
                responseType: 'blob',
            })
                .then(response => {
                    resolve(window.open(URL.createObjectURL(response.data)));
                })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    }

    static delete(observateurId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${VUE_APP_API_BASE_URL}/observateurs/${observateurId}`, {
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

    static update(observateur, observateurId) {
        return new Promise((resolve, reject) => {
            axios.put(`${VUE_APP_API_BASE_URL}/observateurs/${observateurId}`,
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

}

export default Observateurs;