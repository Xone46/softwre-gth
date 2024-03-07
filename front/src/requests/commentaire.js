import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL= "http://localhost:3000/api/v1";

class Commentaires {

    static create(commentaires, observateurId, titreReserve) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/commentaires/create`,
            {
                commentaires,
                observateurId,
                titreReserve
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


    static select(observateurId, titreReserve) {
        
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/commentaires`,
            {
                observateurId : observateurId,
                titreReserve : titreReserve
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

}

export default Commentaires;