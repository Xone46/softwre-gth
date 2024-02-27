import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL= "http://localhost:3000/api/v1";


class Descriptions {

    static create(description) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/descriptions/create`,
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

    static read() {
        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/descriptions/read`,{
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
            axios.delete(`${VUE_APP_API_BASE_URL}/descriptions/${descriptionId}`,{
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