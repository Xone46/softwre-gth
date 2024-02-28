import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL = "http://localhost:3000/api/v1";


class Photos {

    static create(file) {
        return new Promise((resolve, reject) => {

            var formData = new FormData();

            if (file) {
                formData.append('file', file);
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

}

export default Photos;