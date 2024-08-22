<template>
    <div class="examen">

        <table>
            <tr>
                <th>INSTALLATION (Installation a demeure ou nécessitant l'aménagement de supports particuliers)</th>
                <th></th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in a" :key="index">
                <td></td>
                <td :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']">{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkA(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkA(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkA(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkA(index, 'nv', item.nv)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @change="checkA(index, 'so', item.so)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @change="checkA(index, 'o', item.o)">
                </td>
                <td>
                    <p v-if="item.o" @click="checkAObs(index)">obs</p>
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>ACCES INSTALLES A DEMEURE</th>
                <th></th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in b" :key="index">
                <td></td>
                <td :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']" >{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkB(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkB(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkB(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkB(index, 'nv', item.nv)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @change="checkB(index, 'so', item.so)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @change="checkB(index, 'o', item.o)">
                </td>
                <td>
                    <p v-if="item.o" @click="checkBObs(index)">obs</p>
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>CHASSIS</th>
                <th></th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in c" :key="index">
                <td></td>
                <td :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']" >{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkC(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkC(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkC(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkC(index, 'nv', item.nv)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @change="checkC(index, 'so', item.so)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @change="checkC(index, 'o', item.o)">
                </td>
                <td>
                    <p v-if="item.o" @click="checkCObs(index)">obs</p>
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>CHARPENTE</th>
                <th></th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in d" :key="index">
                <td></td>
                <td :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']" >{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkD(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkD(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkD(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkD(index, 'nv', item.nv)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @change="checkD(index, 'so', item.so)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @change="checkD(index, 'o', item.o)">
                </td>
                <td>
                    <p v-if="item.o" @click="checkDObs(index)">obs</p>
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>POSTE DE CONDUITE</th>
                <th></th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in e" :key="index">
                <td></td>
                <td :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']" >{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkE(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkE(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkE(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkE(index, 'nv', item.nv)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @change="checkE(index, 'so', item.so)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @change="checkE(index, 'o', item.o)">
                </td>
                <td>
                    <p v-if="item.o" @click="checkEObs(index)">obs</p>
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>ORGANES DE SERVICE ET DE MANOEUVRE</th>
                <th></th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in f" :key="index">
                <td></td>
                <td :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']" >{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkF(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkF(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkF(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkF(index, 'nv', item.nv)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @change="checkF(index, 'so', item.so)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @change="checkF(index, 'o', item.o)">
                </td>
                <td>
                    <p v-if="item.o" @click="checkFObs(index)">obs</p>
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>SUSPENTES TAMBOURS POULIES DISPOSITIFS DE PREHENSION</th>
                <th></th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in g" :key="index">
                <td></td>
                <td :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']" >{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkG(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkG(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkG(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkG(index, 'nv', item.nv)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @change="checkG(index, 'so', item.so)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @change="checkG(index, 'o', item.o)">
                </td>
                <td>
                    <p v-if="item.o" @click="checkGObs(index)">obs</p>
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>MECANISMES</th>
                <th></th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in h" :key="index">
                <td></td>
                <td :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']" >{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkH(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkH(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkH(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkH(index, 'nv', item.nv)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @change="checkH(index, 'so', item.so)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @change="checkH(index, 'o', item.o)">
                </td>
                <td>
                    <p v-if="item.o" @click="checkHObs(index)">obs</p>
                </td>
            </tr>
        </table>


        <table>
            <tr>
                <th>DISPOSITIFS DE SECURITE</th>
                <th></th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in i" :key="index">
                <td></td>
                <td :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']" >{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkI(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkI(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkI(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkI(index, 'nv', item.nv)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @change="checkI(index, 'so', item.so)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @change="checkI(index, 'o', item.o)">
                </td>
                <td>
                    <p v-if="item.o" @click="checkIObs(index)">obs</p>
                </td>
            </tr>
        </table>

        <table>
            <tr>
                <th>PRESCRIPTIONS DIVERSES</th>
                <th></th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in j" :key="index">
                <td></td>
                <td :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']" >{{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkJ(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkJ(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.sa" @change="checkJ(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.nv" @change="checkJ(index, 'nv', item.nv)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.so" @change="checkJ(index, 'so', item.so)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.o" @change="checkJ(index, 'o', item.o)">
                </td>
                <td>
                    <p v-if="item.o" @click="checkJObs(index)">obs</p>
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
import Examens from "@/requests/appareil_levage/famille1_lev1/Examens"
import Commentaires from "@/requests/appareil_levage/famille1_lev1/commentaire";
import Reserve from "@/components/models/Reserve.vue"

export default {
    name: 'renseignement-component',
    data() {
        return {

            flagReset: false,
            flagReserve : false,
            infoReserve : [],

            a: [
                { titre: "- Accès a la cabine et au poste de conduite", nv : false,  be : false, fc : false, sa : false, statusCritique : false, so : false, o : false },
                { titre: "- Accès aux chemins de roulement", nv : false,  be : false, fc : false, sa : false, statusCritique : false, so : false, o : false },
                { titre: "- Autres accès pour entretien et vérification", nv : false,  be : false, fc : false, sa : false, statusCritique : false, so : false, o : false },
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

        validerReserve(value) {

            const indexA = this.a.findIndex((el) => el.titre == value[2]);
            if(indexA != -1) {
                this.a[indexA]["o"] = true;
            }

            const indexB = this.b.findIndex((el) => el.titre == value[2]);
            if(indexB != -1) {
                this.b[indexB]["o"] = true;
            }

            const indexC = this.c.findIndex((el) => el.titre == value[2]);
            if(indexC != -1) {
                this.c[indexC]["o"] = true;
            }

            const indexD = this.d.findIndex((el) => el.titre == value[2]);
            if(indexD != -1) {
                this.d[indexD]["o"] = true;
            }

            const indexE = this.e.findIndex((el) => el.titre == value[2]);
            if(indexE != -1) {
                this.e[indexE]["o"] = true;
            }

            const indexF = this.f.findIndex((el) => el.titre == value[2]);
            if(indexF != -1) {
                this.f[indexF]["o"] = true;
            }

            const indexG = this.g.findIndex((el) => el.titre == value[2]);
            if(indexG != -1) {
                this.g[indexG]["o"] = true;
            }

            const indexH = this.h.findIndex((el) => el.titre == value[2]);
            if(indexH != -1) {
                this.h[indexH]["o"] = true;
            }

            const indexI = this.i.findIndex((el) => el.titre == value[2]);
            if(indexI != -1) {
                this.i[indexA]["o"] = true;
            }

            const indexJ = this.j.findIndex((el) => el.titre == value[2]);
            if(indexJ != -1) {
                this.j[indexJ]["o"] = true;
            }

            const indexK = this.k.findIndex((el) => el.titre == value[2]);
            if(indexK != -1) {
                this.k[indexK]["o"] = true;
            }

            this.flagReserve = false;
        },

        annulerReserve() {
            this.flagReserve = false;
        },

        
        checkAObs(index) {
            this.infoReserve = ["A", index, this.a[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },
        checkBObs(index) {
            this.infoReserve = ["B", index, this.b[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },
        checkCObs(index) {
            this.infoReserve = ["C", index, this.c[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },
        checkDObs(index) {
            this.infoReserve = ["D", index, this.d[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },
        checkEObs(index) {
            this.infoReserve = ["E", index, this.e[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },
        checkFObs(index) {
            this.infoReserve = ["F", index, this.f[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },
        checkGObs(index) {
            this.infoReserve = ["G", index, this.g[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },

        checkHObs(index) {
            this.infoReserve = ["H", index, this.h[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },

        checkIObs(index) {
            this.infoReserve = ["I", index, this.i[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },

        checkJObs(index) {
            this.infoReserve = ["J", index, this.j[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },

        checkKObs(index) {
            this.infoReserve = ["K", index, this.k[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },

        checkA(index, type, bol) {

            if(type == "be") {
                if(this.a[index]["fc"] == true) {
                    this.a[index]["be"] = bol;
                    this.a[index]["sa"] = false;
                    this.a[index]["nv"] = false;
                    this.a[index]["so"] = false;
                    this.a[index]["o"] = false;
                } else {
                    this.a[index]["be"] = bol;
                    this.a[index]["fc"] = false;
                    this.a[index]["sa"] = false;
                    this.a[index]["nv"] = false;
                    this.a[index]["so"] = false;
                    this.a[index]["o"] = false;
                }
            } else if(type == "fc") {
                if(this.a[index]["be"] == true) {
                    this.a[index]["fc"] = bol;
                    this.a[index]["sa"] = false;
                    this.a[index]["nv"] = false;
                    this.a[index]["so"] = false;
                    this.a[index]["o"] = false;
                } else {
                    this.a[index]["be"] = false;
                    this.a[index]["fc"] = bol;
                    this.a[index]["sa"] = false;
                    this.a[index]["nv"] = false;
                    this.a[index]["so"] = false;
                    this.a[index]["o"] = false;
                }
            } else if(type == 'sa') {
                this.a[index]["be"] = false;
                this.a[index]["fc"] = false;
                this.a[index]["sa"] = bol;
                this.a[index]["nv"] = false;
                this.a[index]["so"] = false;
                this.a[index]["o"] = false;
            } else if(type == 'nv') {
                this.a[index]["be"] = false;
                this.a[index]["fc"] = false;
                this.a[index]["sa"] = false;
                this.a[index]["nv"] = bol;
                this.a[index]["so"] = false;
                this.a[index]["o"] = false;
            } else if(type == 'so') {
                this.a[index]["be"] = false;
                this.a[index]["fc"] = false;
                this.a[index]["sa"] = false;
                this.a[index]["nv"] = false;
                this.a[index]["so"] = bol;
                this.a[index]["o"] = false;
            }
            else if(type == 'o') {
                // check false for delete observation conncte with title
                if(bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                } 

                this.a[index]["be"] = false;
                this.a[index]["fc"] = false;
                this.a[index]["sa"] = false;
                this.a[index]["nv"] = false;
                this.a[index]["so"] = false;
                this.a[index]["o"] = bol;
            }

            return this.sauvegarde();

        },


        checkB(index, type, bol) {
            if(type == "be") {
                if(this.b[index]["fc"] == true) {
                    this.b[index]["be"] = bol;
                    this.b[index]["sa"] = false;
                    this.b[index]["nv"] = false;
                    this.b[index]["so"] = false;
                    this.b[index]["o"] = false;
                } else {
                    this.b[index]["be"] = bol;
                    this.b[index]["fc"] = false;
                    this.b[index]["sa"] = false;
                    this.b[index]["nv"] = false;
                    this.b[index]["so"] = false;
                    this.b[index]["o"] = false;
                }
            } else if(type == "fc") {
                if(this.b[index]["be"] == true) {
                    this.b[index]["fc"] = bol;
                    this.b[index]["sa"] = false;
                    this.b[index]["nv"] = false;
                    this.b[index]["so"] = false;
                    this.b[index]["o"] = false;
                } else {
                    this.b[index]["be"] = false;
                    this.b[index]["fc"] = bol;
                    this.b[index]["sa"] = false;
                    this.b[index]["nv"] = false;
                    this.b[index]["so"] = false;
                    this.b[index]["o"] = false;
                }
            } else if(type == 'sa') {
                this.b[index]["be"] = false;
                this.b[index]["fc"] = false;
                this.b[index]["sa"] = bol;
                this.b[index]["nv"] = false;
                this.b[index]["so"] = false;
                this.b[index]["o"] = false;
            } else if(type == 'nv') {
                this.b[index]["be"] = false;
                this.b[index]["fc"] = false;
                this.b[index]["sa"] = false;
                this.b[index]["nv"] = bol;
                this.b[index]["so"] = false;
                this.b[index]["o"] = false;
            } else if(type == 'so') {
                this.b[index]["be"] = false;
                this.b[index]["fc"] = false;
                this.b[index]["sa"] = false;
                this.b[index]["nv"] = false;
                this.b[index]["so"] = bol;
                this.b[index]["o"] = false;
            }
            else if(type == 'o') {
                // check false for delete observation conncte with title
                if(bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                } 

                this.b[index]["be"] = false;
                this.b[index]["fc"] = false;
                this.b[index]["sa"] = false;
                this.b[index]["nv"] = false;
                this.b[index]["so"] = false;
                this.b[index]["o"] = bol;
            }

            return this.sauvegarde();
        },

        checkC(index, type, bol) {
            if(type == "be") {
                if(this.c[index]["fc"] == true) {
                    this.c[index]["be"] = bol;
                    this.c[index]["sa"] = false;
                    this.c[index]["nv"] = false;
                    this.c[index]["so"] = false;
                    this.c[index]["o"] = false;
                } else {
                    this.c[index]["be"] = bol;
                    this.c[index]["fc"] = false;
                    this.c[index]["sa"] = false;
                    this.c[index]["nv"] = false;
                    this.c[index]["so"] = false;
                    this.c[index]["o"] = false;
                }
            } else if(type == "fc") {
                if(this.c[index]["be"] == true) {
                    this.c[index]["fc"] = bol;
                    this.c[index]["sa"] = false;
                    this.c[index]["nv"] = false;
                    this.c[index]["so"] = false;
                    this.c[index]["o"] = false;
                } else {
                    this.c[index]["be"] = false;
                    this.c[index]["fc"] = bol;
                    this.c[index]["sa"] = false;
                    this.c[index]["nv"] = false;
                    this.c[index]["so"] = false;
                    this.c[index]["o"] = false;
                }
            } else if(type == 'sa') {
                this.c[index]["be"] = false;
                this.c[index]["fc"] = false;
                this.c[index]["sa"] = bol;
                this.c[index]["nv"] = false;
                this.c[index]["so"] = false;
                this.c[index]["o"] = false;
            } else if(type == 'nv') {
                this.c[index]["be"] = false;
                this.c[index]["fc"] = false;
                this.c[index]["sa"] = false;
                this.c[index]["nv"] = bol;
                this.c[index]["so"] = false;
                this.c[index]["o"] = false;
            } else if(type == 'so') {
                this.c[index]["be"] = false;
                this.c[index]["fc"] = false;
                this.c[index]["sa"] = false;
                this.c[index]["nv"] = false;
                this.c[index]["so"] = bol;
                this.c[index]["o"] = false;
            }
            else if(type == 'o') {
                // check false for delete observation conncte with title
                if(bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                } 

                this.c[index]["be"] = false;
                this.c[index]["fc"] = false;
                this.c[index]["sa"] = false;
                this.c[index]["nv"] = false;
                this.c[index]["so"] = false;
                this.c[index]["o"] = bol;
            }

            return this.sauvegarde();
        },

        checkD(index, type, bol) {

            if(type == "be") {
                if(this.d[index]["fc"] == true) {
                    this.d[index]["be"] = bol;
                    this.d[index]["sa"] = false;
                    this.d[index]["nv"] = false;
                    this.d[index]["so"] = false;
                    this.d[index]["o"] = false;
                } else {
                    this.d[index]["be"] = bol;
                    this.d[index]["fc"] = false;
                    this.d[index]["sa"] = false;
                    this.d[index]["nv"] = false;
                    this.d[index]["so"] = false;
                    this.d[index]["o"] = false;
                }
            } else if(type == "fc") {
                if(this.d[index]["be"] == true) {
                    this.d[index]["fc"] = bol;
                    this.d[index]["sa"] = false;
                    this.d[index]["nv"] = false;
                    this.d[index]["so"] = false;
                    this.d[index]["o"] = false;
                } else {
                    this.d[index]["be"] = false;
                    this.d[index]["fc"] = bol;
                    this.d[index]["sa"] = false;
                    this.d[index]["nv"] = false;
                    this.d[index]["so"] = false;
                    this.d[index]["o"] = false;
                }
            } else if(type == 'sa') {
                this.d[index]["be"] = false;
                this.d[index]["fc"] = false;
                this.d[index]["sa"] = bol;
                this.d[index]["nv"] = false;
                this.d[index]["so"] = false;
                this.d[index]["o"] = false;
            } else if(type == 'nv') {
                this.d[index]["be"] = false;
                this.d[index]["fc"] = false;
                this.d[index]["sa"] = false;
                this.d[index]["nv"] = bol;
                this.d[index]["so"] = false;
                this.d[index]["o"] = false;
            } else if(type == 'so') {
                this.d[index]["be"] = false;
                this.d[index]["fc"] = false;
                this.d[index]["sa"] = false;
                this.d[index]["nv"] = false;
                this.d[index]["so"] = bol;
                this.d[index]["o"] = false;
            }
            else if(type == 'o') {
                // check false for delete observation conncte with title
                if(bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                } 

                this.d[index]["be"] = false;
                this.d[index]["fc"] = false;
                this.d[index]["sa"] = false;
                this.d[index]["nv"] = false;
                this.d[index]["so"] = false;
                this.d[index]["o"] = bol;
            }

            return this.sauvegarde();
        },

        checkE(index, type, bol) {
            if(type == "be") {
                if(this.e[index]["fc"] == true) {
                    this.e[index]["be"] = bol;
                    this.e[index]["sa"] = false;
                    this.e[index]["nv"] = false;
                    this.e[index]["so"] = false;
                    this.e[index]["o"] = false;
                } else {
                    this.e[index]["be"] = bol;
                    this.e[index]["fc"] = false;
                    this.e[index]["sa"] = false;
                    this.e[index]["nv"] = false;
                    this.e[index]["so"] = false;
                    this.e[index]["o"] = false;
                }
            } else if(type == "fc") {
                if(this.e[index]["be"] == true) {
                    this.e[index]["fc"] = bol;
                    this.e[index]["sa"] = false;
                    this.e[index]["nv"] = false;
                    this.e[index]["so"] = false;
                    this.e[index]["o"] = false;
                } else {
                    this.e[index]["be"] = false;
                    this.e[index]["fc"] = bol;
                    this.e[index]["sa"] = false;
                    this.e[index]["nv"] = false;
                    this.e[index]["so"] = false;
                    this.e[index]["o"] = false;
                }
            } else if(type == 'sa') {
                this.e[index]["be"] = false;
                this.e[index]["fc"] = false;
                this.e[index]["sa"] = bol;
                this.e[index]["nv"] = false;
                this.e[index]["so"] = false;
                this.e[index]["o"] = false;
            } else if(type == 'nv') {
                this.e[index]["be"] = false;
                this.e[index]["fc"] = false;
                this.e[index]["sa"] = false;
                this.e[index]["nv"] = bol;
                this.e[index]["so"] = false;
                this.e[index]["o"] = false;
            } else if(type == 'so') {
                this.e[index]["be"] = false;
                this.e[index]["fc"] = false;
                this.e[index]["sa"] = false;
                this.e[index]["nv"] = false;
                this.e[index]["so"] = bol;
                this.e[index]["o"] = false;
            }
            else if(type == 'o') {
                // check false for delete observation conncte with title
                if(bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                } 

                this.e[index]["be"] = false;
                this.e[index]["fc"] = false;
                this.e[index]["sa"] = false;
                this.e[index]["nv"] = false;
                this.e[index]["so"] = false;
                this.e[index]["o"] = bol;
            }

            return this.sauvegarde();
        },

        checkF(index, type, bol) {
            if(type == "be") {
                if(this.f[index]["fc"] == true) {
                    this.f[index]["be"] = bol;
                    this.f[index]["sa"] = false;
                    this.f[index]["nv"] = false;
                    this.f[index]["so"] = false;
                    this.f[index]["o"] = false;
                } else {
                    this.f[index]["be"] = bol;
                    this.f[index]["fc"] = false;
                    this.f[index]["sa"] = false;
                    this.f[index]["nv"] = false;
                    this.f[index]["so"] = false;
                    this.f[index]["o"] = false;
                }
            } else if(type == "fc") {
                if(this.f[index]["be"] == true) {
                    this.f[index]["fc"] = bol;
                    this.f[index]["sa"] = false;
                    this.f[index]["nv"] = false;
                    this.f[index]["so"] = false;
                    this.f[index]["o"] = false;
                } else {
                    this.f[index]["be"] = false;
                    this.f[index]["fc"] = bol;
                    this.f[index]["sa"] = false;
                    this.f[index]["nv"] = false;
                    this.f[index]["so"] = false;
                    this.f[index]["o"] = false;
                }
            } else if(type == 'sa') {
                this.f[index]["be"] = false;
                this.f[index]["fc"] = false;
                this.f[index]["sa"] = bol;
                this.f[index]["nv"] = false;
                this.f[index]["so"] = false;
                this.f[index]["o"] = false;
            } else if(type == 'nv') {
                this.f[index]["be"] = false;
                this.f[index]["fc"] = false;
                this.f[index]["sa"] = false;
                this.f[index]["nv"] = bol;
                this.f[index]["so"] = false;
                this.f[index]["o"] = false;
            } else if(type == 'so') {
                this.f[index]["be"] = false;
                this.f[index]["fc"] = false;
                this.f[index]["sa"] = false;
                this.f[index]["nv"] = false;
                this.f[index]["so"] = bol;
                this.f[index]["o"] = false;
            }
            else if(type == 'o') {
                // check false for delete observation conncte with title
                if(bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                } 

                this.f[index]["be"] = false;
                this.f[index]["fc"] = false;
                this.f[index]["sa"] = false;
                this.f[index]["nv"] = false;
                this.f[index]["so"] = false;
                this.f[index]["o"] = bol;
            }

            return this.sauvegarde();
        },

        checkG(index, type, bol) {
            if(type == "be") {
                if(this.g[index]["fc"] == true) {
                    this.g[index]["be"] = bol;
                    this.g[index]["sa"] = false;
                    this.g[index]["nv"] = false;
                    this.g[index]["so"] = false;
                    this.g[index]["o"] = false;
                } else {
                    this.g[index]["be"] = bol;
                    this.g[index]["fc"] = false;
                    this.g[index]["sa"] = false;
                    this.g[index]["nv"] = false;
                    this.g[index]["so"] = false;
                    this.g[index]["o"] = false;
                }
            } else if(type == "fc") {
                if(this.g[index]["be"] == true) {
                    this.g[index]["fc"] = bol;
                    this.g[index]["sa"] = false;
                    this.g[index]["nv"] = false;
                    this.g[index]["so"] = false;
                    this.g[index]["o"] = false;
                } else {
                    this.g[index]["be"] = false;
                    this.g[index]["fc"] = bol;
                    this.g[index]["sa"] = false;
                    this.g[index]["nv"] = false;
                    this.g[index]["so"] = false;
                    this.g[index]["o"] = false;
                }
            } else if(type == 'sa') {
                this.g[index]["be"] = false;
                this.g[index]["fc"] = false;
                this.g[index]["sa"] = bol;
                this.g[index]["nv"] = false;
                this.g[index]["so"] = false;
                this.g[index]["o"] = false;
            } else if(type == 'nv') {
                this.g[index]["be"] = false;
                this.g[index]["fc"] = false;
                this.g[index]["sa"] = false;
                this.g[index]["nv"] = bol;
                this.g[index]["so"] = false;
                this.g[index]["o"] = false;
            } else if(type == 'so') {
                this.g[index]["be"] = false;
                this.g[index]["fc"] = false;
                this.g[index]["sa"] = false;
                this.g[index]["nv"] = false;
                this.g[index]["so"] = bol;
                this.g[index]["o"] = false;
            }
            else if(type == 'o') {
                // check false for delete observation conncte with title
                if(bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                } 

                this.g[index]["be"] = false;
                this.g[index]["fc"] = false;
                this.g[index]["sa"] = false;
                this.g[index]["nv"] = false;
                this.g[index]["so"] = false;
                this.g[index]["o"] = bol;
            }

            return this.sauvegarde();
        },

        checkH(index, type, bol) {
            if(type == "be") {
                if(this.h[index]["fc"] == true) {
                    this.h[index]["be"] = bol;
                    this.h[index]["sa"] = false;
                    this.h[index]["nv"] = false;
                    this.h[index]["so"] = false;
                    this.h[index]["o"] = false;
                } else {
                    this.h[index]["be"] = bol;
                    this.h[index]["fc"] = false;
                    this.h[index]["sa"] = false;
                    this.h[index]["nv"] = false;
                    this.h[index]["so"] = false;
                    this.h[index]["o"] = false;
                }
            } else if(type == "fc") {
                if(this.h[index]["be"] == true) {
                    this.h[index]["fc"] = bol;
                    this.h[index]["sa"] = false;
                    this.h[index]["nv"] = false;
                    this.h[index]["so"] = false;
                    this.h[index]["o"] = false;
                } else {
                    this.h[index]["be"] = false;
                    this.h[index]["fc"] = bol;
                    this.h[index]["sa"] = false;
                    this.h[index]["nv"] = false;
                    this.h[index]["so"] = false;
                    this.h[index]["o"] = false;
                }
            } else if(type == 'sa') {
                this.h[index]["be"] = false;
                this.h[index]["fc"] = false;
                this.h[index]["sa"] = bol;
                this.h[index]["nv"] = false;
                this.h[index]["so"] = false;
                this.h[index]["o"] = false;
            } else if(type == 'nv') {
                this.h[index]["be"] = false;
                this.h[index]["fc"] = false;
                this.h[index]["sa"] = false;
                this.h[index]["nv"] = bol;
                this.h[index]["so"] = false;
                this.h[index]["o"] = false;
            } else if(type == 'so') {
                this.h[index]["be"] = false;
                this.h[index]["fc"] = false;
                this.h[index]["sa"] = false;
                this.h[index]["nv"] = false;
                this.h[index]["so"] = bol;
                this.h[index]["o"] = false;
            }
            else if(type == 'o') {
                // check false for delete observation conncte with title
                if(bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                } 

                this.h[index]["be"] = false;
                this.h[index]["fc"] = false;
                this.h[index]["sa"] = false;
                this.h[index]["nv"] = false;
                this.h[index]["so"] = false;
                this.h[index]["o"] = bol;
            }

            return this.sauvegarde();
        },

        checkI(index, type, bol) {
            if(type == "be") {
                if(this.i[index]["fc"] == true) {
                    this.i[index]["be"] = bol;
                    this.i[index]["sa"] = false;
                    this.i[index]["nv"] = false;
                    this.i[index]["so"] = false;
                    this.i[index]["o"] = false;
                } else {
                    this.i[index]["be"] = bol;
                    this.i[index]["fc"] = false;
                    this.i[index]["sa"] = false;
                    this.i[index]["nv"] = false;
                    this.i[index]["so"] = false;
                    this.i[index]["o"] = false;
                }
            } else if(type == "fc") {
                if(this.i[index]["be"] == true) {
                    this.i[index]["fc"] = bol;
                    this.i[index]["sa"] = false;
                    this.i[index]["nv"] = false;
                    this.i[index]["so"] = false;
                    this.i[index]["o"] = false;
                } else {
                    this.i[index]["be"] = false;
                    this.i[index]["fc"] = bol;
                    this.i[index]["sa"] = false;
                    this.i[index]["nv"] = false;
                    this.i[index]["so"] = false;
                    this.i[index]["o"] = false;
                }
            } else if(type == 'sa') {
                this.i[index]["be"] = false;
                this.i[index]["fc"] = false;
                this.i[index]["sa"] = bol;
                this.i[index]["nv"] = false;
                this.i[index]["so"] = false;
                this.i[index]["o"] = false;
            } else if(type == 'nv') {
                this.i[index]["be"] = false;
                this.i[index]["fc"] = false;
                this.i[index]["sa"] = false;
                this.i[index]["nv"] = bol;
                this.i[index]["so"] = false;
                this.i[index]["o"] = false;
            } else if(type == 'so') {
                this.i[index]["be"] = false;
                this.i[index]["fc"] = false;
                this.i[index]["sa"] = false;
                this.i[index]["nv"] = false;
                this.i[index]["so"] = bol;
                this.i[index]["o"] = false;
            }
            else if(type == 'o') {
                // check false for delete observation conncte with title
                if(bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                } 

                this.i[index]["be"] = false;
                this.i[index]["fc"] = false;
                this.i[index]["sa"] = false;
                this.i[index]["nv"] = false;
                this.i[index]["so"] = false;
                this.i[index]["o"] = bol;
            }

            return this.sauvegarde();
        },

        checkJ(index, type, bol) {

            if(type == "be") {
                if(this.j[index]["fc"] == true) {
                    this.j[index]["be"] = bol;
                    this.j[index]["sa"] = false;
                    this.j[index]["nv"] = false;
                    this.j[index]["so"] = false;
                    this.j[index]["o"] = false;
                } else {
                    this.j[index]["be"] = bol;
                    this.j[index]["fc"] = false;
                    this.j[index]["sa"] = false;
                    this.j[index]["nv"] = false;
                    this.j[index]["so"] = false;
                    this.j[index]["o"] = false;
                }
            } else if(type == "fc") {
                if(this.j[index]["be"] == true) {
                    this.j[index]["fc"] = bol;
                    this.j[index]["sa"] = false;
                    this.j[index]["nv"] = false;
                    this.j[index]["so"] = false;
                    this.j[index]["o"] = false;
                } else {
                    this.j[index]["be"] = false;
                    this.j[index]["fc"] = bol;
                    this.j[index]["sa"] = false;
                    this.j[index]["nv"] = false;
                    this.j[index]["so"] = false;
                    this.j[index]["o"] = false;
                }
            } else if(type == 'sa') {
                this.j[index]["be"] = false;
                this.j[index]["fc"] = false;
                this.j[index]["sa"] = bol;
                this.j[index]["nv"] = false;
                this.j[index]["so"] = false;
                this.j[index]["o"] = false;
            } else if(type == 'nv') {
                this.j[index]["be"] = false;
                this.j[index]["fc"] = false;
                this.j[index]["sa"] = false;
                this.j[index]["nv"] = bol;
                this.j[index]["so"] = false;
                this.j[index]["o"] = false;
            } else if(type == 'so') {
                this.j[index]["be"] = false;
                this.j[index]["fc"] = false;
                this.j[index]["sa"] = false;
                this.j[index]["nv"] = false;
                this.j[index]["so"] = bol;
                this.j[index]["o"] = false;
            }
            else if(type == 'o') {
                // check false for delete observation conncte with title
                if(bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                } 

                this.j[index]["be"] = false;
                this.j[index]["fc"] = false;
                this.j[index]["sa"] = false;
                this.j[index]["nv"] = false;
                this.j[index]["so"] = false;
                this.j[index]["o"] = bol;
            }

            return this.sauvegarde();
        },

        checkK(index, type, bol) {
            if(type == "be") {
                if(this.k[index]["fc"] == true) {
                    this.k[index]["be"] = bol;
                    this.k[index]["sa"] = false;
                    this.k[index]["nv"] = false;
                    this.k[index]["so"] = false;
                    this.k[index]["o"] = false;
                } else {
                    this.k[index]["be"] = bol;
                    this.k[index]["fc"] = false;
                    this.k[index]["sa"] = false;
                    this.k[index]["nv"] = false;
                    this.k[index]["so"] = false;
                    this.k[index]["o"] = false;
                }
            } else if(type == "fc") {
                if(this.k[index]["be"] == true) {
                    this.k[index]["fc"] = bol;
                    this.k[index]["sa"] = false;
                    this.k[index]["nv"] = false;
                    this.k[index]["so"] = false;
                    this.k[index]["o"] = false;
                } else {
                    this.k[index]["be"] = false;
                    this.k[index]["fc"] = bol;
                    this.k[index]["sa"] = false;
                    this.k[index]["nv"] = false;
                    this.k[index]["so"] = false;
                    this.k[index]["o"] = false;
                }
            } else if(type == 'sa') {
                this.k[index]["be"] = false;
                this.k[index]["fc"] = false;
                this.k[index]["sa"] = bol;
                this.k[index]["nv"] = false;
                this.k[index]["so"] = false;
                this.k[index]["o"] = false;
            } else if(type == 'nv') {
                this.k[index]["be"] = false;
                this.k[index]["fc"] = false;
                this.k[index]["sa"] = false;
                this.k[index]["nv"] = bol;
                this.k[index]["so"] = false;
                this.k[index]["o"] = false;
            } else if(type == 'so') {
                this.k[index]["be"] = false;
                this.k[index]["fc"] = false;
                this.k[index]["sa"] = false;
                this.k[index]["nv"] = false;
                this.k[index]["so"] = bol;
                this.k[index]["o"] = false;
            }
            else if(type == 'o') {
                // check false for delete observation conncte with title
                if(bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                    .then((result) => {
                        console.log(result)
                    })
                    .catch((error) => {
                        console.log(error.message);
                    });
                } 

                this.k[index]["be"] = false;
                this.k[index]["fc"] = false;
                this.k[index]["sa"] = false;
                this.k[index]["nv"] = false;
                this.k[index]["so"] = false;
                this.k[index]["o"] = bol;
            }

            return this.sauvegarde();
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

                if (result.data.examen != null) {
                    this.flagReset = true;
                    this.a = result.data.examen.a;
                    this.b = result.data.examen.b;
                    this.c = result.data.examen.c;
                    this.d = result.data.examen.d;
                    this.e = result.data.examen.e;
                    this.f = result.data.examen.f;
                    this.g = result.data.examen.g;
                    this.h = result.data.examen.h;
                    this.i = result.data.examen.i;
                    this.j = result.data.examen.j;
                    this.k = result.data.examen.k;
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

table tr td:nth-child(1) {
    width: 200px;
    text-align: start;
}

table tr th:nth-child(1) {
    width: 200px;
    text-align: start;
}

table tr td:nth-child(2) {
    width: 500px;
    text-align: start;
}

table tr th:nth-child(2) {
    width: 200px;
    text-align: start;
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

td > p {
   color: red;
   cursor: pointer;
}

td > p:hover {
    color: #04AA6D;
}

</style>@/requests/appareil_levage/famille1_lev1/commentaire