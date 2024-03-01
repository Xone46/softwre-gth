import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL = "http://localhost:3000/api/v1";


class Photos {

    static create(file, observateurId) {
        return new Promise((resolve, reject) => {

            var formData = new FormData();

            if (file) {
                formData.append('file', file);
                formData.append('observateurId', observateurId);
            }

            axios.post(`${VUE_APP_API_BASE_URL}/photos/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response.data);
                });
        })
    }

    static select(observateurId) {
        
        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/photos/${observateurId}`,
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


export default Photos;