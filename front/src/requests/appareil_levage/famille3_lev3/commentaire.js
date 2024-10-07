import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL = "http://localhost:3000/api/v1";
const config = {
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
};


class Commentaires {

    static create(observateurId, ref, number, titre, modelSelected) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/appareil_levage-famille1_lev1/commentaires/create`,
                {
                    observateurId,
                    ref,
                    number,
                    titre,
                    modelSelected
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

    static supprimer(ref, name, observateurId) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/appareil_levage-famille1_lev1/commentaires/supprimer`,
                {
                    ref,
                    name,
                    observateurId
                }, config)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    static delete(commentaireId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${VUE_APP_API_BASE_URL}/appareil_levage-famille1_lev1/commentaires/${commentaireId}`, config)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    static deleteByRefAndObservateurId(ref, observateurId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${VUE_APP_API_BASE_URL}/appareil_levage-famille1_lev1/commentaires/${ref}/${observateurId}`, config)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

    static deleteByIndexAndTitreAnd(commentaireId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${VUE_APP_API_BASE_URL}/appareil_levage-famille1_lev1/commentaires/${commentaireId}`, config)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }


    static select(ref, number, titre, observateurId) {

        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/appareil_levage-famille1_lev1/commentaires`,
                {
                    ref: ref,
                    number: number,
                    titre: titre,
                    observateurId: observateurId
                }, config)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }


    static readCommentaires(observateurId) {

        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/appareil_levage-famille1_lev1/commentaires/${observateurId}`, config)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        })
    }

}

export default Commentaires;