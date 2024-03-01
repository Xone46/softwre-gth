<template>
    <div class="parent-conclusions">

        <h1>D1. Observations complémentaires</h1>
        <div :id="$style.observations" v-for="(item, index) in observationsComplémentairesTable" :key="item">
            <div v-html="item" :id="$style.observation" @change="selectObservation(index)" @input="event => poids = event.target.value"></div>
        </div>

        <h1>CONCLUSION</h1>
        <div :id="$style.conclusions" v-for="(item, index) in conclusionTable" :key="item">
            <div v-html="item" :id="$style.conclusion" @change="selectConclusion(index)"></div>
        </div>

        <textarea :id="$style.commentaire" v-if="flagcommentaire" v-model="commentaire" cols="30" rows="10"></textarea>

        <div :id="$style.sauvegarde">
            <button @click="sauvegarde">Sauvegarde de Secours</button>
        </div>

    </div>
</template>
  
<script>
import Conclusion from "@/requests/conclusion"
export default {
    name: 'conclusion-component',
    data() {
        return {
            poids: "",
            commentaire: null,
            flagcommentaire: false,
            observationsComplémentairesTable: [
                `<ul><li><input type='checkbox'>Les essais ont été réalisés avec les charges mises à disposition <input type='text' placeholder='EX : 130 kg'></li> <li>a) le chef d'établissement doit définir les mesures organisationnelles et techniques visant à restreindre provisoirement l'utilisation de l'appareil à la valeur de ces charges.</li> <li>b) Avant toute utilisation de l'appareil à une charge supérieure à nos essais, il y aura lieu de réaliser des essais de fonctionnement correspondants à la capacité nominale de l'appareil ainsi que l'essai de surcharge.</li><ul>`,
                `<ul><li><input type='checkbox'>L'absence de charges n'ayant pas permis la réalisation des essais de fonctionnement, il y aura lieu de réaliser les essais correspondants avant utilisation de l'appareil.</li><ul>`,
                `<ul><li><input type='checkbox'>Absence de charges n'ayant pas permis la réalisation des essais de fonctionnement, il y aura lieu de réaliser les essais correspondants avant utilisation de l'appareil.</li><ul>`,
            ],
            observationsComplémentairesTableSelected: [],
            conclusionTable: [
                `<ul><li><input type='checkbox'>La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission n'ont pas fait apparaître d'observation ni d'anomalie.</li><ul>`,
                `<ul><li><input type='checkbox'>La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations ne s'opposant pas a l'utilisation de l'appareil auxquelles il convient de remédier.</li><ul>`,
                `<ul><li><input type='checkbox'>La vérification de l'état de conservation et les essais de fonctionnement réalisés dans les limites de la présente mission font apparaitre des observations s'opposant à l'utilisation de l'appareil auxquelles il convient de remédiers.</li><ul>`,
                `<ul><li><input type='checkbox'>Commentaire complémentaire</li><ul>`,
            ],
            conclusionTableSelected: []

        }
    },

    components: {
    },

    props : {
        observateurId : String
    },

    methods: {

        removeTagsConclusion(str) {
            if ((str === null) || (str === ''))
                return false;
            else
                str = str.toString();
            return str.replace(/(<([^>]+)>)/ig, '');
        },

        removeTagObservations(str) {
            if ((str === null) || (str === ''))
                return false;
            else
                str = str.toString();
            //Get between tag <li></li>
            const tab = str.match(/<li>(.*?)<\/li>/g);
            const newTab = tab.map((el) => {
                return el.replace(/(<([^>]+)>)/ig, '');
            })

            return newTab;
        },


        selectObservation(index) {
            const result = this.removeTagObservations(this.observationsComplémentairesTable[index]);
            for (let j = 0; j < result.length; j++) {
                const el = result[j];
                if (!this.observationsComplémentairesTableSelected.includes(el)) {
                    this.observationsComplémentairesTableSelected.push(el);
                } else {
                    for (let i = 0; i < this.observationsComplémentairesTableSelected.length; i++) {
                        if (this.observationsComplémentairesTableSelected[i] == el) {
                            this.observationsComplémentairesTableSelected.splice(i, 1);
                        }
                    }
                }
            }
        },

        selectConclusion(index) {

            if (index == 3) {
                this.flagcommentaire = !this.flagcommentaire;
            }

            const result = this.removeTagsConclusion(this.conclusionTable[index]);

            if (this.conclusionTableSelected.includes(result)) {
                const indexSelected = this.conclusionTableSelected.findIndex((el) => el == result);
                this.conclusionTableSelected.splice(indexSelected, 1);
            } else {
                this.conclusionTableSelected.push(result);
            }
        },

        sauvegarde() {

            console.log(this.poids);

            // if(this.flagcommentaire) {
            //     for(let i = 0; i < this.conclusionTableSelected.length; i++) {
            //             if(this.conclusionTableSelected[i] == "Commentaire complémentaire") {
            //                 this.conclusionTableSelected[i] = this.commentaire;
            //                 break;
            //             }
            //     }
            // }

            Conclusion.create(this.observationsComplémentairesTableSelected, this.poids, this.conclusionTableSelected, this.commentaire, this.observateurId)
                .then((result) => {
                    console.log(result)
                })
                .catch((error) => {
                    console.log(error);
                });

        }



    },

    created() {

        Conclusion.select(this.observateurId)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            console.log(error)
        });
    }
}
</script>
  
<style module>
.parent-conclusions {
    width: 100%;
    margin-top: 10px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
}

#observations {
    width: 100%;
}

#observations>#observation {
    width: 100%;
}


#observation>ul {
    list-style-type: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
}

#observation>ul>li {
    text-align: left;
    padding: 5px;
}

#observation>ul>li:nth-child(2),
#observation>ul>li:nth-child(3) {
    margin-left: 10px;
}

#conclusions {
    width: 100%;
}

#conclusions>#conclusion {
    width: 100%;
}


#conclusion>ul {
    list-style-type: none;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0;
}

#conclusion>ul>li {
    text-align: left;
    padding: 5px;
}

#commentaire {
    width: 80%;
}

#sauvegarde {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
}

#sauvegarde>button {
    background-color: #040faa;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}
</style>