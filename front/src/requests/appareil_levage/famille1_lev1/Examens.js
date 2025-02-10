import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL = "http://localhost:5000/api/v1";

class Examens {

    static create(a, b, c, d, e, f, g, h, i, j, observateurId) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/appareil_levage-famille1_lev1/examens/create`,
                {
                    a, b, c, d, e, f, g, h, i, j, observateurId
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

    static select(observateurId) {

        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/appareil_levage-famille1_lev1/examens/${observateurId}`,
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
            axios.delete(`${VUE_APP_API_BASE_URL}/appareil_levage-famille1_lev1/examens/${observateurId}`,
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

    static updateStatus(observateurId, titreReserve) {

        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/appareil_levage-famille1_lev1/examens/updateStatus`,
                {
                    observateurId: observateurId,
                    titreReserve: titreReserve
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

    static changeStatusCritique(titre, statusCritique, observateurId) {

        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/appareil_levage-famille1_lev1/examens/changeStatusCritique`,
                {
                    titre: titre,
                    statusCritique: statusCritique,
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

    static deleteAllCommentairesExamen(observateurId) {

        return new Promise((resolve, reject) => {
            axios.delete(`${VUE_APP_API_BASE_URL}/appareil_levage-famille1_lev1/examens/deleteAllCommentairesExamen/${observateurId}`,
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

export default Examens;