<template>
    <div class="examen">

        <table>

            <tr>
                <td>ACCES INSTALLES A DEMEURE</td>
                <td>ACCES INSTALLES A DEMEURE</td>
                <td>BE</td>
                <td>FC</td>
                <td>SA</td>
                <td>NV</td>
                <td>SO</td>
                <td>O</td>
            </tr>

            <tr>
                <td>CHEMINS DE ROULEMENT / SUPPORTS</td>
                <td></td>
                <td></td>
            </tr>

            <tr>
                <td>CHARPENTE ET OSSATURE DE L'APPAREIL</td>
                <td></td>
                <td></td>
            </tr>

            <tr>
                <td>SOURCES D'ENERGIE</td>
                <td></td>
                <td></td>
            </tr>

            <tr>
                <td>ECLAIRAGE INCORPORE A L'APPAREIL</td>
                <td></td>
                <td></td>
            </tr>

            <tr>
                <td>POSTE DE CONDUITE</td>
                <td></td>
                <td></td>
            </tr>

            <tr>
                <td>POSTE DE CONDUITE</td>
                <td></td>
                <td></td>
            </tr>

            <tr>
                <td>ORGANES DE SERVICE ET DE MANOEUVRE</td>
                <td></td>
                <td></td>
            </tr>

            <tr>
                <td>SUSPENTES TAMBOURS POULIES  DISPOSITIFS DE PREHENSION</td>
                <td></td>
                <td></td>
            </tr>

            <tr>
                <td>MECANISMES</td>
                <td></td>
                <td></td>
            </tr>

            <tr>
                <td>DISPOSITIFS DE SECURITE</td>
                <td></td>
                <td></td>
            </tr>

            <tr>
                <td>PRESCRIPTIONS DIVERSES</td>
                <td></td>
                <td></td>
            </tr>

        </table>

        <div class="sauvegarde">
            <button @click="sauvegarde">Sauvegarde de Secours</button>
        </div>


    </div>

</template>
  
<script>
// import Descriptions from "@/requests/Descriptions"
export default {
    name: 'renseignement-component',
    data() {
        return {
            
            a : [
                { titre : "- Accès a la cabine et au poste de conduite", BE : false ,FC : false, SA : false, NV: false, SO : false, O : false },
                { titre : "- Accès aux chemins de roulement", BE : false ,FC : false, SA : false, NV: false, SO : false, O : false },
                { titre : "- Autres accès pour entretien et vérification", BE : false ,FC : false, SA : false, NV: false, SO : false, O : false },
            ],

            b : [
                 { titre : "- Rails et / ou poutres de roulement, fixations", BE : false ,FC : false, SA : false, NV: false, SO : false, O : false },
                 { titre : "- Poteaux, corbeaux, potence, ancrages", BE : false ,FC : false, SA : false, NV: false, SO : false, O : false },
                 { titre : "- Butoirs, amortisseurs", BE : false ,FC : false, SA : false, NV: false, SO : false, O : false }
            ]
        }
    },

    components: {
    },

    methods: {


        sauvegarde() {

            // Descriptions.create(this.description)
            // .then((result) => {
            //     console.log(result)
            // })
            // .catch((error) => {
            //     console.log(error);
            // });

        }



    },

    created() {
        
    }
}
</script>
  
<style scoped>

.examen {
    margin-top: 10px;
    margin-bottom: 100px;
    width: inherit;
}

table {
    width: 100%;
    margin-top: 10px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
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





</style>