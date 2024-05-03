import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL= "http://localhost:3000/api/v1";

class Commentaires {

    static create(observateurId, ref, number, titre, modelSelected) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/commentaires/create`,
            {
                observateurId,
                ref,
                number,
                titre,
                modelSelected
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

    static delete(commentaireId) {
        return new Promise((resolve, reject) => {
            axios.delete(`${VUE_APP_API_BASE_URL}/commentaires/${commentaireId}`,
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


    static select(ref, number, titre, observateurId) {
        
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/commentaires`,
            {
                ref : ref,
                number : number,
                titre : titre,
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


    static readCommentaires(observateurId) {
        
        return new Promise((resolve, reject) => {
            axios.get(`${VUE_APP_API_BASE_URL}/commentaires/${observateurId}`,
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

export default Commentaires;