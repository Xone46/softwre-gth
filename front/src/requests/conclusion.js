import axios from 'axios'
// const VUE_APP_API_BASE_URL = "/api";
const VUE_APP_API_BASE_URL= "http://localhost:3000/api/v1";

class Conclusions {

    static create(observationsComplémentairesTableSelected, poids, conclusionTableSelected, commentaire) {
        return new Promise((resolve, reject) => {
            axios.post(`${VUE_APP_API_BASE_URL}/conclusions/create`,
            {
                observationsComplémentairesTableSelected,
                poids,
                conclusionTableSelected,
                commentaire
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

export default Conclusions;