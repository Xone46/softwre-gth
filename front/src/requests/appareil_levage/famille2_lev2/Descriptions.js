import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL= "http://localhost:3000/api/v1";


class Descriptions {

    static create(description) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/appareil_levage-famille2_lev2/descriptions/create`,
            description,
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

    static reset(observateurId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${VUE_APP_API_BASE_URL}/appareil_levage-famille2_lev2/descriptions/reset/${observateurId}`,
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
            axios.get(`${VUE_APP_API_BASE_URL}/appareil_levage-famille2_lev2/descriptions/read`,{
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

    static delete(descriptionId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${VUE_APP_API_BASE_URL}/appareil_levage-famille2_lev2/descriptions/${descriptionId}`,{
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
            axios.get(`${VUE_APP_API_BASE_URL}/appareil_levage-famille2_lev2/descriptions/${observateurId}`,
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

export default Descriptions;