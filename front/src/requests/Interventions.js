import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL= "http://localhost:5000/api/v1";
const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

class Interventions {

    static create(interventions) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/interventions/create`, interventions, config)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }

    static update(interventions, interventionId) {
        return new Promise((resolve, reject) => {
            axios.put(`${VUE_APP_API_BASE_URL}/interventions/${interventionId}`, interventions, config)
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
            axios.get(`${VUE_APP_API_BASE_URL}/interventions/read`,config)
            .then(response => {
                    resolve(response);
            })
            .catch(error => {
                    reject(error);
            });
        })
    }

    static delete(interventionId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${VUE_APP_API_BASE_URL}/interventions/${interventionId}`, config)
            .then(response => {
                    resolve(response);
            })
            .catch(error => {
                    reject(error);
            });
        })
    }

    static select(interventionId) {
        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/interventions/${interventionId}`, config)
            .then(response => {
                    resolve(response);
            })
            .catch(error => {
                    reject(error);
            });
        })
    }

}

export default Interventions;