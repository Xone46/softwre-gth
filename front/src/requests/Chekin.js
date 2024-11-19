import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL = "http://localhost:3000/api/v1";
const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};

class Chekin {

    static status(ip) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/chekins/status`,
                {
                    ip: ip
                },
                config)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }

    static sauvgarde(inspecteurId) {
        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/chekins/sauvgarde/${inspecteurId}`,
                 config
                )
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });

        })
    }

}

export default Chekin;