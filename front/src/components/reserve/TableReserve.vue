<template>
    <div class="table-objet-observateur">

        <h2>Observations saisies</h2>

        <Spinner v-if="flagSpinner" />

        <Invertesment :msgInvertesment="msgInvertesment" v-if="flagInvertesment" />

        <div class="observations" v-if="!flagSpinner && !flagInvertesment">
            <table class="table-data">
                <tr v-for="reserve in reserves" :key="reserve._id">
                    <td><input type="radio" name="reserve" @change="selectReserve(reserve.titre)"></td>
                    <td>{{ reserve.titre }}</td>
                </tr>
            </table>
        </div>

        <div class="actions">
            <button v-if="!flagInvertesment" @click="supprimer()">Supprimer</button>
        </div>

        <Verified v-if="flagVerified" @confirmer="confirmer" @retirer="retirer" />

    </div>
</template>
  
<script>

import Examens from "@/requests/Examens"
import Spinner from 'vue-simple-spinner'
import Invertesment from "@/components/models/Invertesment.vue"
import Verified from "@/components/models/Verified.vue"
import Commentaire from "@/requests/commentaire"
export default {
    name: 'table-observateur',
    data() {
        return {
            reserves : [],
            reservesSelect : null,
            flagInvertesment : false,
            flagVerified : false,
            flagSpinner : false,
            msgInvertesment : "",
            commentaires : [],
            titreReserve : null
        }
    },

    props: {
        observateurId: String
    },

    components: {
        Spinner,
        Invertesment,
        Verified
    },

    methods: {

        selectReserve(titreReserve) {

            Commentaire.select(this.observateurId, titreReserve)
            .then((result) => {

                if(result.data != null) {
                    this.commentaires = result.data.commentaires;
                    this.titreReserve = result.data.titreReserve;
                    return this.$emit("apercu" , this.titreReserve, this.commentaires);
                }

                return this.$emit("apercu" , titreReserve);

            })
            .catch((error) => {
                console.log(error);
            });

        }

    },

    created() {

        Examens.select(this.observateurId)
        .then((result) => {
            
            const { a, b, c, d, e, f, g, h, i, j, k } = result.data;
            
            a.forEach(el => {
                if(el.so == true) {
                    this.reserves.push(el);
                }
            });

            b.forEach(el => {
                if(el.so == true) {
                    this.reserves.push(el);
                }
            });

            c.forEach(el => {
                if(el.so == true) {
                    this.reserves.push(el);
                }
            });

            d.forEach(el => {
                if(el.so == true) {
                    this.reserves.push(el);
                }
            });

            e.forEach(el => {
                if(el.so == true) {
                    this.reserves.push(el);
                }
            });

            f.forEach(el => {
                if(el.so == true) {
                    this.reserves.push(el);
                }
            });

            g.forEach(el => {
                if(el.so == true) {
                    this.reserves.push(el);
                }
            });

            h.forEach(el => {
                if(el.so == true) {
                    this.reserves.push(el);
                }
            });

            i.forEach(el => {
                if(el.so == true) {
                    this.reserves.push(el);
                }
            });

            j.forEach(el => {
                if(el.so == true) {
                    this.reserves.push(el);
                }
            });

            k.forEach(el => {
                if(el.so == true) {
                    this.reserves.push(el);
                }
            });

        })
        .catch((error) => {
            console.log(error)
        });


    }
}
</script>
  
<style scoped>
.table-objet-observateur {
    width: 100%;
}

.sites {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 200px;
    overflow-x: auto;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
}

.table {
    padding: 0px;
    width: 100%;
    height: 300px;
}

.table-data {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
}

.table-data td,
.table-data th {
    border: 1px solid #ddd;
    padding: 8px;
}

.table-data tr:nth-child(even) {
    background-color: #f2f2f2;
}

.table-data tr:hover {
    background-color: #ddd;
    cursor: pointer;
}

.table-data th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04AA6D;
    color: white;
}

.textarea {
    width: 100%;
}

.actions {
    display: flex;
    flex-direction: row;
    margin: 5px;
}

.actions button {
    margin-left: 5px;
    margin-right: 5px;
    padding: 10px;
    color: white;
    border: 0px;
    cursor: pointer;
    border-radius: 5px;
    margin-top: 10px;
}

.actions button:nth-child(1) {
    background-color: #04AA6D;
}

.actions button:nth-child(2) {
    background-color: #04AA6D;
}

.actions button:nth-child(3) {
    background-color: #e21608;
}

iframe {
    margin-top: 20px;
}

</style>