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

            axios.post(`${VUE_APP_API_BASE_URL}/accessoire_levage-famille_ac1/photos/create`, formData, {
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
            axios.get(`${VUE_APP_API_BASE_URL}/accessoire_levage-famille_ac1/photos/${observateurId}`,
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
            axios.delete(`${VUE_APP_API_BASE_URL}/accessoire_levage-famille_ac1/photos/${observateurId}`,
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


    static displayImage(filename) {

        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/accessoire_levage-famille_ac1/photos/display/${filename}`, {
                headers: this.headers,
                responseType: 'blob',
            })
                .then(response => {
                    resolve(window.open(URL.createObjectURL(response.data)));
                })
                .catch(error => {
                    reject(error.response.data);
                });

        })
    }

}


export default Photos;