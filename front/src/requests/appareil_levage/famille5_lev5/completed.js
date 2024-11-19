import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL = "http://localhost:3000/api/v1";
const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

class Completeds {

    static checkRenseignement(observateurId) {

        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/appareil_levage-famille5_lev5/completeds/${observateurId}`, config)
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
            axios.get(`${VUE_APP_API_BASE_URL}/appareil_levage-famille5_lev5/completeds`, config)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }


}


export default Completeds;