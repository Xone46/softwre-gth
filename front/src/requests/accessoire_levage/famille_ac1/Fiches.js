import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL = "http://localhost:3000/api/v1";

class Fiche {

    // -----------------------------------Start ----------------------------

    static create(fiches, observateurId) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/accessoire_levage-famille_ac1/fiches/create`,
                {
                    fiches : fiches,
                    observateurId : observateurId
                },
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
            axios.delete(`${VUE_APP_API_BASE_URL}/accessoire_levage-famille_ac1/fiches/reset/${observateurId}`,
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




    static select(observateurId) {

        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/accessoire_levage-famille_ac1/fiches/${observateurId}`,
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

export default Fiche;