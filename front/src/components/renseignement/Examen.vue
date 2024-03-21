<template>
    <div class="examen">

        <table>
            <tr>
                <th>ACCES INSTALLES A DEMEURE</th>
                <th>ACCES INSTALLES A DEMEURE</th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
            </tr>
            <tr v-for="(item, index) in a" :key="index">
                <td></td>
                <td>{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkA(index, 'be')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkA(index, 'fc')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkA(index, 'sa')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkA(index, 'nv')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @input="checkA(index, 'so')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @input="checkA(index, 'o')">
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>CHEMINS DE ROULEMENT / SUPPORTS</th>
                <th>CHEMINS DE ROULEMENT / SUPPORTS</th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
            </tr>
            <tr v-for="(item, index) in b" :key="index">
                <td></td>
                <td>{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkB(index, 'be')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkB(index, 'fc')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkB(index, 'sa')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkB(index, 'nv')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @input="checkB(index, 'so')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @input="checkB(index, 'o')">
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>CHARPENTE ET OSSATURE DE L'APPAREIL</th>
                <th>CHARPENTE ET OSSATURE DE L'APPAREIL</th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
            </tr>
            <tr v-for="(item, index) in c" :key="index">
                <td></td>
                <td>{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkC(index, 'be')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkC(index, 'fc')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkC(index, 'sa')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkC(index, 'nv')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @input="checkC(index, 'so')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @input="checkC(index, 'o')">
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>SOURCES D'ENERGIE</th>
                <th>SOURCES D'ENERGIE</th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
            </tr>
            <tr v-for="(item, index) in d" :key="index">
                <td></td>
                <td>{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkD(index, 'be')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkD(index, 'fc')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkD(index, 'sa')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkD(index, 'nv')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @input="checkD(index, 'so')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @input="checkD(index, 'o')">
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>ECLAIRAGE INCORPORE A L'APPAREIL</th>
                <th>ECLAIRAGE INCORPORE A L'APPAREIL</th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
            </tr>
            <tr v-for="(item, index) in e" :key="index">
                <td></td>
                <td>{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkE(index, 'be')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkE(index, 'fc')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkE(index, 'sa')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkE(index, 'nv')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @input="checkE(index, 'so')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @input="checkE(index, 'o')">
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>POSTE DE CONDUITE</th>
                <th>POSTE DE CONDUITE</th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
            </tr>
            <tr v-for="(item, index) in f" :key="index">
                <td></td>
                <td>{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkF(index, 'be')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkF(index, 'fc')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkF(index, 'sa')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkF(index, 'nv')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @input="checkF(index, 'so')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @input="checkF(index, 'o')">
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>ORGANES DE SERVICE ET DE MANOEUVRE</th>
                <th>ORGANES DE SERVICE ET DE MANOEUVRE</th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
            </tr>
            <tr v-for="(item, index) in g" :key="index">
                <td></td>
                <td>{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkG(index, 'be')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkG(index, 'fc')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkG(index, 'sa')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkG(index, 'nv')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @input="checkG(index, 'so')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @input="checkG(index, 'o')">
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>SUSPENTES TAMBOURS POULIES DISPOSITIFS DE PREHENSION</th>
                <th>SUSPENTES TAMBOURS POULIES DISPOSITIFS DE PREHENSION</th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
            </tr>
            <tr v-for="(item, index) in h" :key="index">
                <td></td>
                <td>{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkH(index, 'be')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkH(index, 'fc')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkH(index, 'sa')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkH(index, 'nv')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @input="checkH(index, 'so')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @input="checkH(index, 'o')">
                </td>
            </tr>
        </table>


        <table>
            <tr>
                <th>MECANISMES</th>
                <th>MECANISMES</th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
            </tr>
            <tr v-for="(item, index) in i" :key="index">
                <td></td>
                <td>{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkI(index, 'be')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkI(index, 'fc')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkI(index, 'sa')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkI(index, 'nv')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @input="checkI(index, 'so')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @input="checkI(index, 'o')">
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>DISPOSITIFS DE SECURITE</th>
                <th>DISPOSITIFS DE SECURITE</th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
            </tr>
            <tr v-for="(item, index) in j" :key="index">
                <td></td>
                <td>{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkJ(index, 'be')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkJ(index, 'fc')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkJ(index, 'sa')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkJ(index, 'nv')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @input="checkJ(index, 'so')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @input="checkJ(index, 'o')">
                </td>
            </tr>
        </table>


        <table>
            <tr>
                <th>DISPOSITIFS DE SECURITE</th>
                <th>DISPOSITIFS DE SECURITE</th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
            </tr>
            <tr v-for="(item, index) in k" :key="index">
                <td></td>
                <td>{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkK(index, 'be')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkK(index, 'fc')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkK(index, 'sa')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkK(index, 'nv')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @input="checkK(index, 'so')">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @input="checkK(index, 'o')">
                </td>
            </tr>
        </table>

        <div v-if="!flagReset" class="sauvegarde">
            <button @click="sauvegarde">Sauvegarde de Secours</button>
        </div>

        <div v-if="flagReset" class="reset">
            <button @click="reset">Reset</button>
        </div>

        <Reserve v-if="flagReserve" :infoReserve="infoReserve" :observateurId="observateurId" @valider="validerReserve" @annuler="annulerReserve"/>

    </div>
</template>

<script>
import Examens from "@/requests/Examens"
import Reserve from "@/components/models/Reserve.vue"

export default {
    name: 'renseignement-component',
    data() {
        return {

            flagReset: false,
            flagReserve : false,
            infoReserve : [],

            a: [
                { titre: "- Accès a la cabine et au poste de conduite", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Accès aux chemins de roulement", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Autres accès pour entretien et vérification", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
            ],

            b: [
                { titre: "- Rails et / ou poutres de roulement, fixations", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Poteaux, corbeaux, potence, ancrages", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Butoirs, amortisseurs", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
            ],

            c: [
                { titre: "- Poutres, sommiers, palées...", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Chariot, galets, guidages", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Assemblages, liaisons", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
            ],

            d: [
                { titre: "- Dispositif de séparation générale", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Equipements, canalisations", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Assemblages, liaisons", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Protection des pièces nues sous tension", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Trolleys, enrouleurs", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
            ],

            e: [
                { titre: "- Dispositif de séparation générale", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Equipements, canalisations", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Assemblages, liaisons", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Protection des pièces nues sous tension", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Trolleys, enrouleurs", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
            ],

            f: [
                { titre: "- Constitution, fixation, plancher", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Protection contre les chutes de hauteur de l'opérateur à partir du poste de conduite", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Visibilité (vitrage, essuie-glaces)", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Chauffage", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Absence de stockage de chiffons, déchets, huile ou toute autre matière inflammable en cabine", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Extincteur en cabine", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Evacuation de secours", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Siège", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Eclairage", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
            ],

            g: [
                { titre: "- Mise en marche- Arrêt normal – Sélecteur", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Identification des organes de service", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Retour automatique au point neutre des commandes", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Autres arrêts accessibles (urgence….)", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Avertisseur sonore, lumineux", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Indicateurs", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
            ],

            h: [
                { titre: "- Suspentes", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Attaches", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Tambour, poulies, noix, pignons", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Moufles, crochets, linguet de sécurité ou dispositifs équivalents", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Autres dispositifs de préhension (bennes, grappins, électro-aimants…)", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
            ],

            i: [
                { titre: "- Groupes moto-réducteurs", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Organes de transmission, accouplements", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Freins des mouvements concourant au levage", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Limitation de la vitesse (absence d'emballement) ", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Freins des mouvements horizontaux", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Immobilisation hors service", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Autres freins (Secours, sécurité...)", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Protection des organes mobiles de transmission", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
            ],

            j: [
                { titre: "- Limiteurs de course haute ou mise en butée", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Autres limiteurs de course/hors course", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Limiteur de charge, de capacité (Obligatoire pour appareils CE si capacité >= 1 Tonne)", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Dispositifs anti collision ou équivalent", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
            ],

            k: [
                { titre: "- Plaque constructeur ", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Affichage capacité, tableau des charges", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                { titre: "- Consignes de sécurité et d'utilisation (lisibilité)", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
            ]
        }
    },

    props: {
        observateurId: String
    },

    components: {
        Reserve
    },

    methods: {

        validerReserve() {
            this.flagReserve = false;
        },

        annulerReserve() {
            this.flagReserve = false;
        },

        checkA(index, type) {

            //change all to false
            this.a[index]["be"] = false;
            this.a[index]["fc"] = false;
            this.a[index]["sa"] = false;
            this.a[index]["nv"] = false;
            this.a[index]["so"] = false;
            this.a[index]["o"] = false;

            // select new value
            this.a[index][type] = !this.a[index][type];

            if(this.a[index]["o"] == true) {
                this.infoReserve = ["A", index, this.a[index]["titre"]]
                this.flagReserve = true;
            }
        },

        checkB(index, type) {

            //change all to false
            this.b[index]["be"] = false;
            this.b[index]["fc"] = false;
            this.b[index]["sa"] = false;
            this.b[index]["nv"] = false;
            this.b[index]["so"] = false;
            this.b[index]["o"] = false;

            // select new value
            this.b[index][type] = !this.b[index][type];
        },

        checkC(index, type) {

            //change all to false
            this.c[index]["be"] = false;
            this.c[index]["fc"] = false;
            this.c[index]["sa"] = false;
            this.c[index]["nv"] = false;
            this.c[index]["so"] = false;
            this.c[index]["o"] = false;

            // select new value
            this.c[index][type] = !this.c[index][type];
        },

        checkD(index, type) {

            //change all to false
            this.d[index]["be"] = false;
            this.d[index]["fc"] = false;
            this.d[index]["sa"] = false;
            this.d[index]["nv"] = false;
            this.d[index]["so"] = false;
            this.d[index]["o"] = false;

            // select new value
            this.d[index][type] = !this.d[index][type];
        },

        checkE(index, type) {

            //change all to false
            this.e[index]["be"] = false;
            this.e[index]["fc"] = false;
            this.e[index]["sa"] = false;
            this.e[index]["nv"] = false;
            this.e[index]["so"] = false;
            this.e[index]["o"] = false;

            // select new value
            this.e[index][type] = !this.e[index][type];
        },

        checkF(index, type) {

            //change all to false
            this.f[index]["be"] = false;
            this.f[index]["fc"] = false;
            this.f[index]["sa"] = false;
            this.f[index]["nv"] = false;
            this.f[index]["so"] = false;
            this.f[index]["o"] = false;

            // select new value
            this.f[index][type] = !this.f[index][type];
        },

        checkG(index, type) {

            //change all to false
            this.g[index]["be"] = false;
            this.g[index]["fc"] = false;
            this.g[index]["sa"] = false;
            this.g[index]["nv"] = false;
            this.g[index]["so"] = false;
            this.g[index]["o"] = false;

            // select new value
            this.g[index][type] = !this.g[index][type];
        },

        checkH(index, type) {

            //change all to false
            this.h[index]["be"] = false;
            this.h[index]["fc"] = false;
            this.h[index]["sa"] = false;
            this.h[index]["nv"] = false;
            this.h[index]["so"] = false;
            this.h[index]["o"] = false;

            // select new value
            this.h[index][type] = !this.h[index][type];
        },

        checkI(index, type) {

            //change all to false
            this.i[index]["be"] = false;
            this.i[index]["fc"] = false;
            this.i[index]["sa"] = false;
            this.i[index]["nv"] = false;
            this.i[index]["so"] = false;
            this.i[index]["o"] = false;

            // select new value
            this.i[index][type] = !this.i[index][type];
        },

        checkJ(index, type) {

            //change all to false
            this.j[index]["be"] = false;
            this.j[index]["fc"] = false;
            this.j[index]["sa"] = false;
            this.j[index]["nv"] = false;
            this.j[index]["so"] = false;
            this.j[index]["o"] = false;

            // select new value
            this.j[index][type] = !this.j[index][type];
        },

        checkK(index, type) {

            //change all to false
            this.k[index]["be"] = false;
            this.k[index]["fc"] = false;
            this.k[index]["sa"] = false;
            this.k[index]["nv"] = false;
            this.k[index]["so"] = false;
            this.k[index]["o"] = false;

            // select new value
            this.k[index][type] = !this.k[index][type];
        },

        reset() {
            Examens.reset(this.observateurId)
                .then((result) => {
                    if (result.data) {

                        this.a.forEach((element) => {
                                element.be = false;
                                element.fc = false;
                                element.sa = false;
                                element.nv = false;
                                element.so = false;
                                element.o = false;
                            }
                        );

                        this.b.forEach((element) => {
                                element.be = false;
                                element.fc = false;
                                element.sa = false;
                                element.nv = false;
                                element.so = false;
                                element.o = false;
                            }
                        );

                        this.c.forEach((element) => {
                                element.be = false;
                                element.fc = false;
                                element.sa = false;
                                element.nv = false;
                                element.so = false;
                                element.o = false;
                            }
                        );

                        this.d.forEach((element) => {
                                element.be = false;
                                element.fc = false;
                                element.sa = false;
                                element.nv = false;
                                element.so = false;
                                element.o = false;
                            }
                        );

                        this.e.forEach((element) => {
                                element.be = false;
                                element.fc = false;
                                element.sa = false;
                                element.nv = false;
                                element.so = false;
                                element.o = false;
                            }
                        );

                        this.f.forEach((element) => {
                                element.be = false;
                                element.fc = false;
                                element.sa = false;
                                element.nv = false;
                                element.so = false;
                                element.o = false;
                            }
                        );

                        this.g.forEach((element) => {
                                element.be = false;
                                element.fc = false;
                                element.sa = false;
                                element.nv = false;
                                element.so = false;
                                element.o = false;
                            }
                        );

                        this.h.forEach((element) => {
                                element.be = false;
                                element.fc = false;
                                element.sa = false;
                                element.nv = false;
                                element.so = false;
                                element.o = false;
                            }
                        );

                        this.i.forEach((element) => {
                                element.be = false;
                                element.fc = false;
                                element.sa = false;
                                element.nv = false;
                                element.so = false;
                                element.o = false;
                            }
                        );

                        this.j.forEach((element) => {
                                element.be = false;
                                element.fc = false;
                                element.sa = false;
                                element.nv = false;
                                element.so = false;
                                element.o = false;
                            }
                        );
                        this.k.forEach((element) => {
                                element.be = false;
                                element.fc = false;
                                element.sa = false;
                                element.nv = false;
                                element.so = false;
                                element.o = false;
                            }
                        );
                        this.flagReset = false;
                        this.$emit("menuStatusChicked");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        sauvegarde() {

            Examens.create(this.a, this.b, this.c, this.d, this.e, this.f, this.g, this.h, this.i, this.j, this.k, this.observateurId)
                .then((result) => {
                    if (result.data) {
                        this.flagReset = true;
                        this.$emit("menuStatusChicked");
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }



    },

    created() {
        Examens.select(this.observateurId)
            .then((result) => {

                if (result.data != null) {
                    this.flagReset = true;
                    this.a = result.data.a;
                    this.b = result.data.b;
                    this.c = result.data.c;
                    this.d = result.data.d;
                    this.e = result.data.e;
                    this.f = result.data.f;
                    this.g = result.data.g;
                    this.h = result.data.h;
                    this.i = result.data.i;
                    this.j = result.data.j;
                    this.k = result.data.k;
                    this.$emit("menuStatusChicked");
                } else {
                    this.flagReset = false;
                    this.$emit("menuStatusChicked");
                }
            })
            .catch((error) => {
                console.log(error)
            });
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
    margin-top: 20px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 20px;
    border: 1px solid #aaa;
}

table tr th,
table tr td {
    text-align: left;
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
</style>