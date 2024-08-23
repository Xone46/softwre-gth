<template>

    <div class="descriptions">

        <table>
            <tr>
                <td>B-1</td>
                <td>MARQUAGE</td>
                <td>
                    <select>
                            <option value=""></option>
                            <option value="CE">CE</option>
                            <option value="Absence de marquage">Absence de marquage</option>
                    </select>
                </td>
            </tr>

            <tr>
                <td>B-2</td>
                <td>CARACTERISTIQUES DIMENSIONNELLES ET DE CHARGE</td>
                <td>
                    <p>Charge maximale utile (kg) : <input type="text"> A la portée minimale de (m) : <input type="text"></p>
                    <p>Distance du centre de gravité (m) : <input type="text"></p>
                    <p>Course (m) : <input type="text" value="Sans objet"></p>
                    <p>Hauteur de levage (m) : <input type="text" value="Sans objet"></p>
                    <p>Portée (m) : <input type="text" value="Sans objet"></p>
                    <p>Porte a faux ou déport (m) : <input type="text" value="Sans objet"></p>
                    <p>Longueur de chemin de roulement (m) : <input type="text" value="Sans objet"></p>
                    <p>Dimension du plateau (m) : <input type="text" value="Sans objet"></p>
                    <p>
                        Mode d'installation:
                        <select>
                            <option value=""></option>
                            <option value="Pont roulant">Pont roulant</option>
                            <option value="Poutre roulante">Poutre roulante</option>
                            <option value="Palan">Palan</option>
                            <option value="Treuil">Treuil</option>
                            <option value="Vérin">Vérin</option>
                            <option value="Autre">Autre</option>
                        </select>
                        <input type="text" value="">
                    </p>

                </td>
            </tr>

            <tr>
                <td>B-3</td>
                <td>MECANISME ET MOUVEMENT</td>
                <td>
                    <p>
                        <select>
                            <option value=""></option>
                            <option value="Hydraulique">Hydraulique</option>
                            <option value="Treuil">Treuil</option>
                            <option value="Tambour">Tambour</option>
                            <option value="Autre">Autre</option>
                        </select>
                        <input type="text" value="">
                    </p>
                </td>
            </tr>

            <tr>
                <td>B-4</td>
                <td>SUSPENTES DE LEVAGE</td>
                <td>
                    <div>
                        <p><input type="checkbox">Câble :</p>
                        <p>Nombre : <input type="text"> Composition : <input type="text"> Diamètre (mm) : <input type="text"></p>
                        <p>Moufflage : <input type="text" value="Sans Objet">Nombre de brins : <input type="text"></p>
                    </div>

                    <div>
                        <p><input type="checkbox">Chaîne(s) a rouleau ou mailles jointives :</p>
                        <p>Nombre : <input type="text"> Type : <input type="checkbox">A rouleau <input type="checkbox"> A maille jointive</p>
                        <p>Pas théorique : <input type="text"> Combinaison : <input type="text"></p>
                        <p>Moufflage :
                            <select>
                                <option value="Sans objet">Sans objet</option>
                                <option value="Nombre de brins">Nombre de brins</option>
                            </select>
                            <input type="text" value="">
                        </p>
                    </div>

                    <div>
                        <p><input type="checkbox">Chaîne(s) à maillons calibrés :</p>
                        <p>Nombre : <input type="text"> Type : <input type="checkbox">A maillons courts<input type="checkbox"> A maillons longs</p>
                        <p>Pas: <input type="text"> Diamètre : <input type="text"></p>
                        <p>Moufflage :
                            <select>
                                <option value="Sans objet">Sans objet</option>
                                <option value="Nombre de brins">Nombre de brins</option>
                            </select>
                            <input type="text" value="">
                        </p>
                    </div>
                    <div>
                        <p><input type="checkbox">Sangle de levage :</p>
                        <p>Nombre : <input type="text"> Composition : <input type="text">;</p>
                        <p>Section (mm2): <input type="text"></p>
                        <p>Moufflage :
                            <select>
                                <option value="Sans objet">Sans objet</option>
                                <option value="Nombre de brins">Nombre de brins</option>
                            </select>
                            <input type="text" value="">
                        </p>
            
                    </div>

                </td>
            </tr>

        </table>

        <div v-if="!flagReset" class="sauvegarde">
            <button @click="sauvegarde">Sauvegarde de Secours</button>
        </div>

        <div v-if="flagReset" class="reset">
            <button @click="reset">Reset</button>
        </div>


    </div>

</template>

<script>
import Descriptions from "@/requests/appareil_levage/famille1_lev1/Descriptions"
export default {
    name: 'renseignement-component',
    data() {
        return {

            flagReset: false,
            description: {
                observateurId: ""
            }

        }
    },

    props: {
        observateurId: String
    },


    components: {
    },

    methods: {

        sauvegarde() {
            this.description.observateurId = this.observateurId;
            Descriptions.create(this.description)
                .then(() => {
                    this.flagReset = true;
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        reset() {
            Descriptions.reset(this.observateurId)
                .then(() => {

                this.description = {
                    observateurId: ""
                }

                this.flagReset = false;

                })
                .catch((error) => {
                    console.log(error);
                })
        }
    },

    created() {
        Descriptions.select(this.observateurId)
            .then((result) => {

                if (result.data.description != null) {
                    this.flagReset = true;
                }
            })
            .catch((error) => {
                console.log(error)
            });
    }
}
</script>

<style scoped>

.descriptions {
    margin-top: 10px;
    margin-bottom: 100px;
    width: inherit;
}


.descriptions table {
    border-collapse: collapse;
    border: none;
}

tr {
    border-top: 1px solid black;
}

tr:first-child {
    border-top: none;
}

td {
    text-align: start;
    border: none !important;
    padding-top: 10px;
    padding-bottom: 10px;
}


table tr td:nth-child(1) {
    width: 40px;
}


table>tr:nth-child(3)>td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

table>tr:nth-child(3)>td:nth-child(3) label {
    margin-top: 3px;
    margin-bottom: 3px;
}

table>tr:nth-child(4)>td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

table>tr:nth-child(4)>td:nth-child(3) label {
    margin-top: 3px;
    margin-bottom: 3px;
}

table>tr:nth-child(5)>td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

table>tr:nth-child(6)>td:nth-child(3) {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
} 


.sauvegarde {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
}

.sauvegarde button {
    background-color: #040faa;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.reset {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
}

.reset button {
    background-color: #aa1704;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.saved {
    color: #04AA6D;
}

.not-saved {
    color: red;
}
</style>