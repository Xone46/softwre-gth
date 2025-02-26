<template>
    <div class="examen">

                
        <div class="sauvegarder">
            <button :class="[watched_sauvegarder == true ? 'watch' : 'not-watch']" @click="sauvegarde">
                {{ watched_sauvegarder == true ? "Déjà envoyé" : "Envoyer" }}
            </button>
            <button @click="reset">Initialiser</button>
        </div>
        

        <table>
            <tr>
                <th>INSTALLATION (Appareil fixe)</th>
                <th></th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in examen.a" :key="index">
                <td></td>
                <td
                    :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']">
                    {{ item.titre }}</td>
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
                <th>CHARPENTE - SUPPORT DE CHARGE</th>
                <th></th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in examen.b" :key="index">
                <td></td>
                <td
                    :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']">
                    {{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkB(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" disabled v-model="item.fc" @change="checkB(index, 'fc', item.fc)">
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
                <th>SOURCES D'ENERGIE</th>
                <th></th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in examen.c" :key="index">
                <td></td>
                <td
                    :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']">
                    {{ item.titre }}</td>
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
                <th>ECLAIRAGE INCORPORE A L'APPAREIL</th>
                <th></th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in examen.d" :key="index">
                <td></td>
                <td
                    :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']">
                    {{ item.titre }}</td>
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
            <tr v-for="(item, index) in examen.e" :key="index">
                <td></td>
                <td
                    :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']">
                    {{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkE(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkE(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" disabled v-model="item.sa" @change="checkE(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" disabled v-model="item.nv" @change="checkE(index, 'nv', item.nv)">
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
            <tr v-for="(item, index) in examen.f" :key="index">
                <td></td>
                <td
                    :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']">
                    {{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkF(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkF(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" disabled v-model="item.sa" @change="checkF(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" disabled v-model="item.nv" @change="checkF(index, 'nv', item.nv)">
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
                <th>SUSPENTES POULIES</th>
                <th></th>
                <th>BE</th>
                <th>FC</th>
                <th>SA</th>
                <th>NV</th>
                <th>SO</th>
                <th>O</th>
                <th></th>
            </tr>
            <tr v-for="(item, index) in examen.g" :key="index">
                <td></td>
                <td
                    :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']">
                    {{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkG(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkG(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" disabled v-model="item.sa" @change="checkG(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" disabled v-model="item.nv" @change="checkG(index, 'nv', item.nv)">
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
            <tr v-for="(item, index) in examen.h" :key="index">
                <td></td>
                <td
                    :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']">
                    {{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkH(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkH(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" disabled v-model="item.sa" @change="checkH(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" disabled v-model="item.nv" @change="checkH(index, 'nv', item.nv)">
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
            <tr v-for="(item, index) in examen.i" :key="index">
                <td></td>
                <td
                    :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']">
                    {{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkI(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkI(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" disabled v-model="item.sa" @change="checkI(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" disabled v-model="item.nv" @change="checkI(index, 'nv', item.nv)">
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
            <tr v-for="(item, index) in examen.j" :key="index">
                <td></td>
                <td
                    :class="[(item.be == true || item.fc == true || item.sa == true || item.nv == true || item.so == true || item.o == true) ? 'saved' : 'not-saved']">
                    {{ item.titre }}</td>
                <td>
                    <input type="checkbox" v-model="item.be" @change="checkJ(index, 'be', item.be)">
                </td>
                <td>
                    <input type="checkbox" v-model="item.fc" @change="checkJ(index, 'fc', item.fc)">
                </td>
                <td>
                    <input type="checkbox" disabled v-model="item.sa" @change="checkJ(index, 'sa', item.sa)">
                </td>
                <td>
                    <input type="checkbox" disabled v-model="item.nv" @change="checkJ(index, 'nv', item.nv)">
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


        <Reserve v-if="flagReserve" :infoReserve="infoReserve" :observateurId="observateurId" @valider="validerReserve"
            @annuler="annulerReserve" @sortir="sortir" />

        <Loading v-if="flagLoading" />


    </div>
</template>

<script>
import Examens from "@/requests/appareil_levage/famille5_lev5/Examens"
import Commentaires from "@/requests/commentaire";
import Reserve from "@/components/models/Reserve.vue"
import Loading from "@/components/models/Loading.vue";

export default {
    name: 'renseignement-component',
    data() {
        return {

            flagLoading: false,
            counter_watched: 0,
            watched_sauvegarder: false,
            flagReset: false,
            flagReserve: false,
            infoReserve: [],
            examen: {
                a: [
                    { titre: "- Distance a obstacle fixe ou entre appareils", nv: false, be: false, fc: false, sa: false, statusCritique: false, so: false, o: false },
                    { titre: "- Assise, fixations, scellements", nv: false, be: false, fc: false, sa: false, statusCritique: false, so: false, o: false },
                ],

                b: [
                    { titre: "- Châssis de base, colonnes, poteaux, mât, ciseaux, parallélogrammes", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Supports de charge (chemin de roulement, bras articulés, plate-forme)", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Accès et passerelle à demeure", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
                ],

                c: [
                    { titre: "- Interrupteur à l'origine de l'installation condamnable en position d'ouverture", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Equipements et canalisations", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Protection des pièces nues sous tensions", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
                ],

                d: [
                    { titre: "- Eclairage de la zone de travail", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
                ],

                e: [
                    { titre: "- Implantation", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Visibilité", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
                ],

                f: [
                    { titre: "- Identification des organes de service", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Mise en marche- Arrêt normal - Sélecteur", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Retour automatique au point neutre des commandes", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Autres arrêts accessibles (urgence)", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Retour automatique au point neutre des commandes", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Indicateurs", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
                ],

                g: [
                    { titre: "- Suspentes (câbles, chaînes, sangles)", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Attaches", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Tambour, poulies, noix, pignons", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                ],

                h: [
                    { titre: "- Groupes moto-réducteurs", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Organes de transmission, accouplements", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Vérins et canalisations, distributeurs", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Système Vis / Ecrou Jeu vis / Ecrou constructeur (mm) : ……… Mesuré(mm) : …………", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Freins des mouvements concourant au levage", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Limitation de la vitesse (absence d'emballement) :……………………", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Dispositif d'immobilisation des appareils mobiles", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Protection des organes mobiles de transmission", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                ],

                i: [
                    { titre: "- Limiteurs de course haute (asservissement)", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Autres limiteurs de course/hors course", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Dispositif de retenue a l'arrêt - Visualisation", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Dispositif de retenue en cours de manoeuvre", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Contrôle de synchronisme et/ou d'horizontalité", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Limiteur de charge, de capacité", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Détecteur de mou de suspente", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Interrupteur écrou de sécurité", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Calage immobilisation du véhicule", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Protection contre les risques d'écrasement des pieds", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                ],

                j: [
                    { titre: "- Plaque constructeur", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Affichage capacité (charge / portée)", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Instructions de manœuvre et consignes de sécurité (lisibilité)", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false },
                    { titre: "- Délimitation au sol de la zone de travail (pont ou plate-forme tournante)", be: false, fc: false, sa: false, nv: false, so: false, o: false, statusCritique: false }
                ]
            }



        }
    },

    props: {
        observateurId: String
    },

    components: {
        Reserve,
        Loading
    },


    watch: {
        examen: {
            handler() {

                if ((this.counter_watched++) > 0) {
                    this.watched_sauvegarder = false;
                }

                this.notEmpty();
            },
            deep: true
        }
    },


    methods: {

        validerReserve(value) {

            const indexA = this.examen.a.findIndex((el) => el.titre == value[2]);
            if (indexA != -1) {
                this.examen.a[indexA]["o"] = true;
            }

            const indexB = this.examen.b.findIndex((el) => el.titre == value[2]);
            if (indexB != -1) {
                this.examen.b[indexB]["o"] = true;
            }

            const indexC = this.examen.c.findIndex((el) => el.titre == value[2]);
            if (indexC != -1) {
                this.examen.c[indexC]["o"] = true;
            }

            const indexD = this.examen.d.findIndex((el) => el.titre == value[2]);
            if (indexD != -1) {
                this.examen.d[indexD]["o"] = true;
            }

            const indexE = this.examen.e.findIndex((el) => el.titre == value[2]);
            if (indexE != -1) {
                this.examen.e[indexE]["o"] = true;
            }

            const indexF = this.examen.f.findIndex((el) => el.titre == value[2]);
            if (indexF != -1) {
                this.examen.f[indexF]["o"] = true;
            }

            const indexG = this.examen.g.findIndex((el) => el.titre == value[2]);
            if (indexG != -1) {
                this.examen.g[indexG]["o"] = true;
            }

            const indexH = this.examen.h.findIndex((el) => el.titre == value[2]);
            if (indexH != -1) {
                this.examen.h[indexH]["o"] = true;
            }

            const indexI = this.examen.i.findIndex((el) => el.titre == value[2]);
            if (indexI != -1) {
                this.examen.i[indexI]["o"] = true;
            }

            const indexJ = this.examen.j.findIndex((el) => el.titre == value[2]);
            if (indexJ != -1) {
                this.examen.j[indexJ]["o"] = true;
            }

            this.flagReserve = false;
        },

        annulerReserve(value) {

            this.flagReserve = false;

            if ("A" == value[0]) {
                this.examen.a[value[1]].o = false;
            }

            if ("B" == value[0]) {
                this.examen.b[value[1]].o = false;
            }

            if ("C" == value[0]) {
                this.examen.c[value[1]].o = false;
            }

            if ("D" == value[0]) {
                this.examen.d[value[1]].o = false;
            }

            if ("E" == value[0]) {
                this.examen.e[value[1]].o = false;
            }

            if ("F" == value[0]) {
                this.examen.f[value[1]].o = false;
            }

            if ("G" == value[0]) {
                this.examen.g[value[1]].o = false;
            }

            if ("H" == value[0]) {
                this.examen.h[value[1]].o = false;
            }

            if ("I" == value[0]) {
                this.examen.i[value[1]].o = false;
            }

            if ("J" == value[0]) {
                this.examen.j[value[1]].o = false;
            }

        },


        sortir() {
            this.flagReserve = false;
        },

        checkAObs(index) {
            this.infoReserve = ["A", index, this.examen.a[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },
        checkBObs(index) {
            this.infoReserve = ["B", index, this.examen.b[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },
        checkCObs(index) {
            this.infoReserve = ["C", index, this.examen.c[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },
        checkDObs(index) {
            this.infoReserve = ["D", index, this.examen.d[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },
        checkEObs(index) {
            this.infoReserve = ["E", index, this.examen.e[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },
        checkFObs(index) {
            this.infoReserve = ["F", index, this.examen.f[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },
        checkGObs(index) {
            this.infoReserve = ["G", index, this.examen.g[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },

        checkHObs(index) {
            this.infoReserve = ["H", index, this.examen.h[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },

        checkIObs(index) {
            this.infoReserve = ["I", index, this.examen.i[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },

        checkJObs(index) {
            this.infoReserve = ["J", index, this.examen.j[index]["titre"], this.observateurId]
            this.flagReserve = true;
        },


        checkA(index, type, bol) {

            if (type == "be") {
                if (this.examen.a[index]["fc"] == true) {
                    this.examen.a[index]["be"] = bol;
                    this.examen.a[index]["sa"] = false;
                    this.examen.a[index]["nv"] = false;
                    this.examen.a[index]["so"] = false;
                    this.examen.a[index]["o"] = false;
                } else {
                    this.examen.a[index]["be"] = bol;
                    this.examen.a[index]["fc"] = false;
                    this.examen.a[index]["sa"] = false;
                    this.examen.a[index]["nv"] = false;
                    this.examen.a[index]["so"] = false;
                    this.examen.a[index]["o"] = false;
                }
            } else if (type == "fc") {
                if (this.examen.a[index]["be"] == true) {
                    this.examen.a[index]["fc"] = bol;
                    this.examen.a[index]["sa"] = false;
                    this.examen.a[index]["nv"] = false;
                    this.examen.a[index]["so"] = false;
                    this.examen.a[index]["o"] = false;
                } else {
                    this.examen.a[index]["be"] = false;
                    this.examen.a[index]["fc"] = bol;
                    this.examen.a[index]["sa"] = false;
                    this.examen.a[index]["nv"] = false;
                    this.examen.a[index]["so"] = false;
                    this.examen.a[index]["o"] = false;
                }
            } else if (type == 'sa') {
                this.examen.a[index]["be"] = false;
                this.examen.a[index]["fc"] = false;
                this.examen.a[index]["sa"] = bol;
                this.examen.a[index]["nv"] = false;
                this.examen.a[index]["so"] = false;
                this.examen.a[index]["o"] = false;
            } else if (type == 'nv') {
                this.examen.a[index]["be"] = false;
                this.examen.a[index]["fc"] = false;
                this.examen.a[index]["sa"] = false;
                this.examen.a[index]["nv"] = bol;
                this.examen.a[index]["so"] = false;
                this.examen.a[index]["o"] = false;
            } else if (type == 'so') {
                this.examen.a[index]["be"] = false;
                this.examen.a[index]["fc"] = false;
                this.examen.a[index]["sa"] = false;
                this.examen.a[index]["nv"] = false;
                this.examen.a[index]["so"] = bol;
                this.examen.a[index]["o"] = false;
            }
            else if (type == 'o') {
                // check false for delete observation conncte with title
                if (bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                        .then((result) => {
                            console.log(result)
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }

                this.examen.a[index]["be"] = false;
                this.examen.a[index]["fc"] = false;
                this.examen.a[index]["sa"] = false;
                this.examen.a[index]["nv"] = false;
                this.examen.a[index]["so"] = false;
                this.examen.a[index]["o"] = bol;
            }

        },


        checkB(index, type, bol) {
            if (type == "be") {
                if (this.examen.b[index]["fc"] == true) {
                    this.examen.b[index]["be"] = bol;
                    this.examen.b[index]["sa"] = false;
                    this.examen.b[index]["nv"] = false;
                    this.examen.b[index]["so"] = false;
                    this.examen.b[index]["o"] = false;
                } else {
                    this.examen.b[index]["be"] = bol;
                    this.examen.b[index]["fc"] = false;
                    this.examen.b[index]["sa"] = false;
                    this.examen.b[index]["nv"] = false;
                    this.examen.b[index]["so"] = false;
                    this.examen.b[index]["o"] = false;
                }
            } else if (type == "fc") {
                if (this.examen.b[index]["be"] == true) {
                    this.examen.b[index]["fc"] = bol;
                    this.examen.b[index]["sa"] = false;
                    this.examen.b[index]["nv"] = false;
                    this.examen.b[index]["so"] = false;
                    this.examen.b[index]["o"] = false;
                } else {
                    this.examen.b[index]["be"] = false;
                    this.examen.b[index]["fc"] = bol;
                    this.examen.b[index]["sa"] = false;
                    this.examen.b[index]["nv"] = false;
                    this.examen.b[index]["so"] = false;
                    this.examen.b[index]["o"] = false;
                }
            } else if (type == 'sa') {
                this.examen.b[index]["be"] = false;
                this.examen.b[index]["fc"] = false;
                this.examen.b[index]["sa"] = bol;
                this.examen.b[index]["nv"] = false;
                this.examen.b[index]["so"] = false;
                this.examen.b[index]["o"] = false;
            } else if (type == 'nv') {
                this.examen.b[index]["be"] = false;
                this.examen.b[index]["fc"] = false;
                this.examen.b[index]["sa"] = false;
                this.examen.b[index]["nv"] = bol;
                this.examen.b[index]["so"] = false;
                this.examen.b[index]["o"] = false;
            } else if (type == 'so') {
                this.examen.b[index]["be"] = false;
                this.examen.b[index]["fc"] = false;
                this.examen.b[index]["sa"] = false;
                this.examen.b[index]["nv"] = false;
                this.examen.b[index]["so"] = bol;
                this.examen.b[index]["o"] = false;
            }
            else if (type == 'o') {
                // check false for delete observation conncte with title
                if (bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                        .then((result) => {
                            console.log(result)
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }

                this.examen.b[index]["be"] = false;
                this.examen.b[index]["fc"] = false;
                this.examen.b[index]["sa"] = false;
                this.examen.b[index]["nv"] = false;
                this.examen.b[index]["so"] = false;
                this.examen.b[index]["o"] = bol;
            }
        },

        checkC(index, type, bol) {
            if (type == "be") {
                if (this.examen.c[index]["fc"] == true) {
                    this.examen.c[index]["be"] = bol;
                    this.examen.c[index]["sa"] = false;
                    this.examen.c[index]["nv"] = false;
                    this.examen.c[index]["so"] = false;
                    this.examen.c[index]["o"] = false;
                } else {
                    this.examen.c[index]["be"] = bol;
                    this.examen.c[index]["fc"] = false;
                    this.examen.c[index]["sa"] = false;
                    this.examen.c[index]["nv"] = false;
                    this.examen.c[index]["so"] = false;
                    this.examen.c[index]["o"] = false;
                }
            } else if (type == "fc") {
                if (this.examen.c[index]["be"] == true) {
                    this.examen.c[index]["fc"] = bol;
                    this.examen.c[index]["sa"] = false;
                    this.examen.c[index]["nv"] = false;
                    this.examen.c[index]["so"] = false;
                    this.examen.c[index]["o"] = false;
                } else {
                    this.examen.c[index]["be"] = false;
                    this.examen.c[index]["fc"] = bol;
                    this.examen.c[index]["sa"] = false;
                    this.examen.c[index]["nv"] = false;
                    this.examen.c[index]["so"] = false;
                    this.examen.c[index]["o"] = false;
                }
            } else if (type == 'sa') {
                this.examen.c[index]["be"] = false;
                this.examen.c[index]["fc"] = false;
                this.examen.c[index]["sa"] = bol;
                this.examen.c[index]["nv"] = false;
                this.examen.c[index]["so"] = false;
                this.examen.c[index]["o"] = false;
            } else if (type == 'nv') {
                this.examen.c[index]["be"] = false;
                this.examen.c[index]["fc"] = false;
                this.examen.c[index]["sa"] = false;
                this.examen.c[index]["nv"] = bol;
                this.examen.c[index]["so"] = false;
                this.examen.c[index]["o"] = false;
            } else if (type == 'so') {
                this.examen.c[index]["be"] = false;
                this.examen.c[index]["fc"] = false;
                this.examen.c[index]["sa"] = false;
                this.examen.c[index]["nv"] = false;
                this.examen.c[index]["so"] = bol;
                this.examen.c[index]["o"] = false;
            }
            else if (type == 'o') {
                // check false for delete observation conncte with title
                if (bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                        .then((result) => {
                            console.log(result)
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }

                this.examen.c[index]["be"] = false;
                this.examen.c[index]["fc"] = false;
                this.examen.c[index]["sa"] = false;
                this.examen.c[index]["nv"] = false;
                this.examen.c[index]["so"] = false;
                this.examen.c[index]["o"] = bol;
            }
        },

        checkD(index, type, bol) {

            if (type == "be") {
                if (this.examen.d[index]["fc"] == true) {
                    this.examen.d[index]["be"] = bol;
                    this.examen.d[index]["sa"] = false;
                    this.examen.d[index]["nv"] = false;
                    this.examen.d[index]["so"] = false;
                    this.examen.d[index]["o"] = false;
                } else {
                    this.examen.d[index]["be"] = bol;
                    this.examen.d[index]["fc"] = false;
                    this.examen.d[index]["sa"] = false;
                    this.examen.d[index]["nv"] = false;
                    this.examen.d[index]["so"] = false;
                    this.examen.d[index]["o"] = false;
                }
            } else if (type == "fc") {
                if (this.examen.d[index]["be"] == true) {
                    this.examen.d[index]["fc"] = bol;
                    this.examen.d[index]["sa"] = false;
                    this.examen.d[index]["nv"] = false;
                    this.examen.d[index]["so"] = false;
                    this.examen.d[index]["o"] = false;
                } else {
                    this.examen.d[index]["be"] = false;
                    this.examen.d[index]["fc"] = bol;
                    this.examen.d[index]["sa"] = false;
                    this.examen.d[index]["nv"] = false;
                    this.examen.d[index]["so"] = false;
                    this.examen.d[index]["o"] = false;
                }
            } else if (type == 'sa') {
                this.examen.d[index]["be"] = false;
                this.examen.d[index]["fc"] = false;
                this.examen.d[index]["sa"] = bol;
                this.examen.d[index]["nv"] = false;
                this.examen.d[index]["so"] = false;
                this.examen.d[index]["o"] = false;
            } else if (type == 'nv') {
                this.examen.d[index]["be"] = false;
                this.examen.d[index]["fc"] = false;
                this.examen.d[index]["sa"] = false;
                this.examen.d[index]["nv"] = bol;
                this.examen.d[index]["so"] = false;
                this.examen.d[index]["o"] = false;
            } else if (type == 'so') {
                this.examen.d[index]["be"] = false;
                this.examen.d[index]["fc"] = false;
                this.examen.d[index]["sa"] = false;
                this.examen.d[index]["nv"] = false;
                this.examen.d[index]["so"] = bol;
                this.examen.d[index]["o"] = false;
            }
            else if (type == 'o') {
                // check false for delete observation conncte with title
                if (bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                        .then((result) => {
                            console.log(result)
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }

                this.examen.d[index]["be"] = false;
                this.examen.d[index]["fc"] = false;
                this.examen.d[index]["sa"] = false;
                this.examen.d[index]["nv"] = false;
                this.examen.d[index]["so"] = false;
                this.examen.d[index]["o"] = bol;
            }

        },

        checkE(index, type, bol) {
            if (type == "be") {
                if (this.examen.e[index]["fc"] == true) {
                    this.examen.e[index]["be"] = bol;
                    this.examen.e[index]["sa"] = false;
                    this.examen.e[index]["nv"] = false;
                    this.examen.e[index]["so"] = false;
                    this.examen.e[index]["o"] = false;
                } else {
                    this.examen.e[index]["be"] = bol;
                    this.examen.e[index]["fc"] = false;
                    this.examen.e[index]["sa"] = false;
                    this.examen.e[index]["nv"] = false;
                    this.examen.e[index]["so"] = false;
                    this.examen.e[index]["o"] = false;
                }
            } else if (type == "fc") {
                if (this.examen.e[index]["be"] == true) {
                    this.examen.e[index]["fc"] = bol;
                    this.examen.e[index]["sa"] = false;
                    this.examen.e[index]["nv"] = false;
                    this.examen.e[index]["so"] = false;
                    this.examen.e[index]["o"] = false;
                } else {
                    this.examen.e[index]["be"] = false;
                    this.examen.e[index]["fc"] = bol;
                    this.examen.e[index]["sa"] = false;
                    this.examen.e[index]["nv"] = false;
                    this.examen.e[index]["so"] = false;
                    this.examen.e[index]["o"] = false;
                }
            } else if (type == 'sa') {
                this.examen.e[index]["be"] = false;
                this.examen.e[index]["fc"] = false;
                this.examen.e[index]["sa"] = bol;
                this.examen.e[index]["nv"] = false;
                this.examen.e[index]["so"] = false;
                this.examen.e[index]["o"] = false;
            } else if (type == 'nv') {
                this.examen.e[index]["be"] = false;
                this.examen.e[index]["fc"] = false;
                this.examen.e[index]["sa"] = false;
                this.examen.e[index]["nv"] = bol;
                this.examen.e[index]["so"] = false;
                this.examen.e[index]["o"] = false;
            } else if (type == 'so') {
                this.examen.e[index]["be"] = false;
                this.examen.e[index]["fc"] = false;
                this.examen.e[index]["sa"] = false;
                this.examen.e[index]["nv"] = false;
                this.examen.e[index]["so"] = bol;
                this.examen.e[index]["o"] = false;
            }
            else if (type == 'o') {
                // check false for delete observation conncte with title
                if (bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                        .then((result) => {
                            console.log(result)
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }

                this.examen.e[index]["be"] = false;
                this.examen.e[index]["fc"] = false;
                this.examen.e[index]["sa"] = false;
                this.examen.e[index]["nv"] = false;
                this.examen.e[index]["so"] = false;
                this.examen.e[index]["o"] = bol;
            }
        },

        checkF(index, type, bol) {
            if (type == "be") {
                if (this.examen.f[index]["fc"] == true) {
                    this.examen.f[index]["be"] = bol;
                    this.examen.f[index]["sa"] = false;
                    this.examen.f[index]["nv"] = false;
                    this.examen.f[index]["so"] = false;
                    this.examen.f[index]["o"] = false;
                } else {
                    this.examen.f[index]["be"] = bol;
                    this.examen.f[index]["fc"] = false;
                    this.examen.f[index]["sa"] = false;
                    this.examen.f[index]["nv"] = false;
                    this.examen.f[index]["so"] = false;
                    this.examen.f[index]["o"] = false;
                }
            } else if (type == "fc") {
                if (this.examen.f[index]["be"] == true) {
                    this.examen.f[index]["fc"] = bol;
                    this.examen.f[index]["sa"] = false;
                    this.examen.f[index]["nv"] = false;
                    this.examen.f[index]["so"] = false;
                    this.examen.f[index]["o"] = false;
                } else {
                    this.examen.f[index]["be"] = false;
                    this.examen.f[index]["fc"] = bol;
                    this.examen.f[index]["sa"] = false;
                    this.examen.f[index]["nv"] = false;
                    this.examen.f[index]["so"] = false;
                    this.examen.f[index]["o"] = false;
                }
            } else if (type == 'sa') {
                this.examen.f[index]["be"] = false;
                this.examen.f[index]["fc"] = false;
                this.examen.f[index]["sa"] = bol;
                this.examen.f[index]["nv"] = false;
                this.examen.f[index]["so"] = false;
                this.examen.f[index]["o"] = false;
            } else if (type == 'nv') {
                this.examen.f[index]["be"] = false;
                this.examen.f[index]["fc"] = false;
                this.examen.f[index]["sa"] = false;
                this.examen.f[index]["nv"] = bol;
                this.examen.f[index]["so"] = false;
                this.examen.f[index]["o"] = false;
            } else if (type == 'so') {
                this.examen.f[index]["be"] = false;
                this.examen.f[index]["fc"] = false;
                this.examen.f[index]["sa"] = false;
                this.examen.f[index]["nv"] = false;
                this.examen.f[index]["so"] = bol;
                this.examen.f[index]["o"] = false;
            }
            else if (type == 'o') {
                // check false for delete observation conncte with title
                if (bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                        .then((result) => {
                            console.log(result)
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }

                this.examen.f[index]["be"] = false;
                this.examen.f[index]["fc"] = false;
                this.examen.f[index]["sa"] = false;
                this.examen.f[index]["nv"] = false;
                this.examen.f[index]["so"] = false;
                this.examen.f[index]["o"] = bol;
            }

        },

        checkG(index, type, bol) {
            if (type == "be") {
                if (this.examen.g[index]["fc"] == true) {
                    this.examen.g[index]["be"] = bol;
                    this.examen.g[index]["sa"] = false;
                    this.examen.g[index]["nv"] = false;
                    this.examen.g[index]["so"] = false;
                    this.examen.g[index]["o"] = false;
                } else {
                    this.examen.g[index]["be"] = bol;
                    this.examen.g[index]["fc"] = false;
                    this.examen.g[index]["sa"] = false;
                    this.examen.g[index]["nv"] = false;
                    this.examen.g[index]["so"] = false;
                    this.examen.g[index]["o"] = false;
                }
            } else if (type == "fc") {
                if (this.examen.g[index]["be"] == true) {
                    this.examen.g[index]["fc"] = bol;
                    this.examen.g[index]["sa"] = false;
                    this.examen.g[index]["nv"] = false;
                    this.examen.g[index]["so"] = false;
                    this.examen.g[index]["o"] = false;
                } else {
                    this.examen.g[index]["be"] = false;
                    this.examen.g[index]["fc"] = bol;
                    this.examen.g[index]["sa"] = false;
                    this.examen.g[index]["nv"] = false;
                    this.examen.g[index]["so"] = false;
                    this.examen.g[index]["o"] = false;
                }
            } else if (type == 'sa') {
                this.examen.g[index]["be"] = false;
                this.examen.g[index]["fc"] = false;
                this.examen.g[index]["sa"] = bol;
                this.examen.g[index]["nv"] = false;
                this.examen.g[index]["so"] = false;
                this.examen.g[index]["o"] = false;
            } else if (type == 'nv') {
                this.examen.g[index]["be"] = false;
                this.examen.g[index]["fc"] = false;
                this.examen.g[index]["sa"] = false;
                this.examen.g[index]["nv"] = bol;
                this.examen.g[index]["so"] = false;
                this.examen.g[index]["o"] = false;
            } else if (type == 'so') {
                this.examen.g[index]["be"] = false;
                this.examen.g[index]["fc"] = false;
                this.examen.g[index]["sa"] = false;
                this.examen.g[index]["nv"] = false;
                this.examen.g[index]["so"] = bol;
                this.examen.g[index]["o"] = false;
            }
            else if (type == 'o') {
                // check false for delete observation conncte with title
                if (bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                        .then((result) => {
                            console.log(result)
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }

                this.examen.g[index]["be"] = false;
                this.examen.g[index]["fc"] = false;
                this.examen.g[index]["sa"] = false;
                this.examen.g[index]["nv"] = false;
                this.examen.g[index]["so"] = false;
                this.examen.g[index]["o"] = bol;
            }
        },

        checkH(index, type, bol) {
            if (type == "be") {
                if (this.examen.h[index]["fc"] == true) {
                    this.examen.h[index]["be"] = bol;
                    this.examen.h[index]["sa"] = false;
                    this.examen.h[index]["nv"] = false;
                    this.examen.h[index]["so"] = false;
                    this.examen.h[index]["o"] = false;
                } else {
                    this.examen.h[index]["be"] = bol;
                    this.examen.h[index]["fc"] = false;
                    this.examen.h[index]["sa"] = false;
                    this.examen.h[index]["nv"] = false;
                    this.examen.h[index]["so"] = false;
                    this.examen.h[index]["o"] = false;
                }
            } else if (type == "fc") {
                if (this.examen.h[index]["be"] == true) {
                    this.examen.h[index]["fc"] = bol;
                    this.examen.h[index]["sa"] = false;
                    this.examen.h[index]["nv"] = false;
                    this.examen.h[index]["so"] = false;
                    this.examen.h[index]["o"] = false;
                } else {
                    this.examen.h[index]["be"] = false;
                    this.examen.h[index]["fc"] = bol;
                    this.examen.h[index]["sa"] = false;
                    this.examen.h[index]["nv"] = false;
                    this.examen.h[index]["so"] = false;
                    this.examen.h[index]["o"] = false;
                }
            } else if (type == 'sa') {
                this.examen.h[index]["be"] = false;
                this.examen.h[index]["fc"] = false;
                this.examen.h[index]["sa"] = bol;
                this.examen.h[index]["nv"] = false;
                this.examen.h[index]["so"] = false;
                this.examen.h[index]["o"] = false;
            } else if (type == 'nv') {
                this.examen.h[index]["be"] = false;
                this.examen.h[index]["fc"] = false;
                this.examen.h[index]["sa"] = false;
                this.examen.h[index]["nv"] = bol;
                this.examen.h[index]["so"] = false;
                this.examen.h[index]["o"] = false;
            } else if (type == 'so') {
                this.examen.h[index]["be"] = false;
                this.examen.h[index]["fc"] = false;
                this.examen.h[index]["sa"] = false;
                this.examen.h[index]["nv"] = false;
                this.examen.h[index]["so"] = bol;
                this.examen.h[index]["o"] = false;
            }
            else if (type == 'o') {
                // check false for delete observation conncte with title
                if (bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                        .then((result) => {
                            console.log(result)
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }

                this.examen.h[index]["be"] = false;
                this.examen.h[index]["fc"] = false;
                this.examen.h[index]["sa"] = false;
                this.examen.h[index]["nv"] = false;
                this.examen.h[index]["so"] = false;
                this.examen.h[index]["o"] = bol;
            }

        },

        checkI(index, type, bol) {
            if (type == "be") {
                if (this.examen.i[index]["fc"] == true) {
                    this.examen.i[index]["be"] = bol;
                    this.examen.i[index]["sa"] = false;
                    this.examen.i[index]["nv"] = false;
                    this.examen.i[index]["so"] = false;
                    this.examen.i[index]["o"] = false;
                } else {
                    this.examen.i[index]["be"] = bol;
                    this.examen.i[index]["fc"] = false;
                    this.examen.i[index]["sa"] = false;
                    this.examen.i[index]["nv"] = false;
                    this.examen.i[index]["so"] = false;
                    this.examen.i[index]["o"] = false;
                }
            } else if (type == "fc") {
                if (this.examen.i[index]["be"] == true) {
                    this.examen.i[index]["fc"] = bol;
                    this.examen.i[index]["sa"] = false;
                    this.examen.i[index]["nv"] = false;
                    this.examen.i[index]["so"] = false;
                    this.examen.i[index]["o"] = false;
                } else {
                    this.examen.i[index]["be"] = false;
                    this.examen.i[index]["fc"] = bol;
                    this.examen.i[index]["sa"] = false;
                    this.examen.i[index]["nv"] = false;
                    this.examen.i[index]["so"] = false;
                    this.examen.i[index]["o"] = false;
                }
            } else if (type == 'sa') {
                this.examen.i[index]["be"] = false;
                this.examen.i[index]["fc"] = false;
                this.examen.i[index]["sa"] = bol;
                this.examen.i[index]["nv"] = false;
                this.examen.i[index]["so"] = false;
                this.examen.i[index]["o"] = false;
            } else if (type == 'nv') {
                this.examen.i[index]["be"] = false;
                this.examen.i[index]["fc"] = false;
                this.examen.i[index]["sa"] = false;
                this.examen.i[index]["nv"] = bol;
                this.examen.i[index]["so"] = false;
                this.examen.i[index]["o"] = false;
            } else if (type == 'so') {
                this.examen.i[index]["be"] = false;
                this.examen.i[index]["fc"] = false;
                this.examen.i[index]["sa"] = false;
                this.examen.i[index]["nv"] = false;
                this.examen.i[index]["so"] = bol;
                this.examen.i[index]["o"] = false;
            }
            else if (type == 'o') {
                // check false for delete observation conncte with title
                if (bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                        .then((result) => {
                            console.log(result)
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }

                this.examen.i[index]["be"] = false;
                this.examen.i[index]["fc"] = false;
                this.examen.i[index]["sa"] = false;
                this.examen.i[index]["nv"] = false;
                this.examen.i[index]["so"] = false;
                this.examen.i[index]["o"] = bol;
            }
        },

        checkJ(index, type, bol) {

            if (type == "be") {
                if (this.examen.j[index]["fc"] == true) {
                    this.examen.j[index]["be"] = bol;
                    this.examen.j[index]["sa"] = false;
                    this.examen.j[index]["nv"] = false;
                    this.examen.j[index]["so"] = false;
                    this.examen.j[index]["o"] = false;
                } else {
                    this.examen.j[index]["be"] = bol;
                    this.examen.j[index]["fc"] = false;
                    this.examen.j[index]["sa"] = false;
                    this.examen.j[index]["nv"] = false;
                    this.examen.j[index]["so"] = false;
                    this.examen.j[index]["o"] = false;
                }
            } else if (type == "fc") {
                if (this.examen.j[index]["be"] == true) {
                    this.examen.j[index]["fc"] = bol;
                    this.examen.j[index]["sa"] = false;
                    this.examen.j[index]["nv"] = false;
                    this.examen.j[index]["so"] = false;
                    this.examen.j[index]["o"] = false;
                } else {
                    this.examen.j[index]["be"] = false;
                    this.examen.j[index]["fc"] = bol;
                    this.examen.j[index]["sa"] = false;
                    this.examen.j[index]["nv"] = false;
                    this.examen.j[index]["so"] = false;
                    this.examen.j[index]["o"] = false;
                }
            } else if (type == 'sa') {
                this.examen.j[index]["be"] = false;
                this.examen.j[index]["fc"] = false;
                this.examen.j[index]["sa"] = bol;
                this.examen.j[index]["nv"] = false;
                this.examen.j[index]["so"] = false;
                this.examen.j[index]["o"] = false;
            } else if (type == 'nv') {
                this.examen.j[index]["be"] = false;
                this.examen.j[index]["fc"] = false;
                this.examen.j[index]["sa"] = false;
                this.examen.j[index]["nv"] = bol;
                this.examen.j[index]["so"] = false;
                this.examen.j[index]["o"] = false;
            } else if (type == 'so') {
                this.examen.j[index]["be"] = false;
                this.examen.j[index]["fc"] = false;
                this.examen.j[index]["sa"] = false;
                this.examen.j[index]["nv"] = false;
                this.examen.j[index]["so"] = bol;
                this.examen.j[index]["o"] = false;
            }
            else if (type == 'o') {
                // check false for delete observation conncte with title
                if (bol == false) {
                    const ref = "A";
                    Commentaires.deleteByRefAndObservateurId(ref, this.observateurId)
                        .then((result) => {
                            console.log(result)
                        })
                        .catch((error) => {
                            console.log(error.message);
                        });
                }

                this.examen.j[index]["be"] = false;
                this.examen.j[index]["fc"] = false;
                this.examen.j[index]["sa"] = false;
                this.examen.j[index]["nv"] = false;
                this.examen.j[index]["so"] = false;
                this.examen.j[index]["o"] = bol;
            }
        },

        reset() {
            Examens.reset(this.observateurId)
                .then((result) => {
                    if (result.data) {

                        this.examen.a.forEach((element) => {
                            element.be = false;
                            element.fc = false;
                            element.sa = false;
                            element.nv = false;
                            element.so = false;
                            element.o = false;
                        }
                        );

                        this.examen.b.forEach((element) => {
                            element.be = false;
                            element.fc = false;
                            element.sa = false;
                            element.nv = false;
                            element.so = false;
                            element.o = false;
                        }
                        );

                        this.examen.c.forEach((element) => {
                            element.be = false;
                            element.fc = false;
                            element.sa = false;
                            element.nv = false;
                            element.so = false;
                            element.o = false;
                        }
                        );

                        this.examen.d.forEach((element) => {
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

                        this.examen.g.forEach((element) => {
                            element.be = false;
                            element.fc = false;
                            element.sa = false;
                            element.nv = false;
                            element.so = false;
                            element.o = false;
                        }
                        );

                        this.examen.h.forEach((element) => {
                            element.be = false;
                            element.fc = false;
                            element.sa = false;
                            element.nv = false;
                            element.so = false;
                            element.o = false;
                        }
                        );

                        this.examen.i.forEach((element) => {
                            element.be = false;
                            element.fc = false;
                            element.sa = false;
                            element.nv = false;
                            element.so = false;
                            element.o = false;
                        }
                        );

                        this.examen.j.forEach((element) => {
                            element.be = false;
                            element.fc = false;
                            element.sa = false;
                            element.nv = false;
                            element.so = false;
                            element.o = false;
                        }
                        );

                        this.flagReset = false;
                        this.watched_sauvegarder = false;
                        this.$emit("changeColorExamen_famille5_lev5", false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },

        checkProperties(a, b, c, d, e, f, g, h, i, j) {

            for (let i = 0; i < a.length; i++) {
                const arr = [a[i].be, a[i].fc, a[i].nv, a[i].o, a[i].sa, a[i].so, a[i].statusCritique];
                if (!arr.includes(true)) {
                    return false;
                }
            }

            for (let i = 0; i < b.length; i++) {

                const arr = [b[i].be, b[i].fc, b[i].nv, b[i].o, b[i].sa, b[i].so, b[i].statusCritique];

                if (!arr.includes(true)) {
                    return false
                }
            }

            for (let i = 0; i < c.length; i++) {

                const arr = [c[i].be, c[i].fc, c[i].nv, c[i].o, c[i].sa, c[i].so, c[i].statusCritique];

                if (!arr.includes(true)) {
                    return false;
                }
            }

            for (let i = 0; i < d.length; i++) {

                const arr = [d[i].be, d[i].fc, d[i].nv, d[i].o, d[i].sa, d[i].so, d[i].statusCritique];

                if (!arr.includes(true)) {
                    return false;
                }
            }

            for (let i = 0; i < e.length; i++) {

                const arr = [e[i].be, e[i].fc, e[i].nv, e[i].o, e[i].sa, e[i].so, e[i].statusCritique];

                if (!arr.includes(true)) {
                    return false;
                }
            }

            for (let i = 0; i < f.length; i++) {

                const arr = [f[i].be, f[i].fc, f[i].nv, f[i].o, f[i].sa, f[i].so, f[i].statusCritique];

                if (!arr.includes(true)) {
                    return false;
                }
            }

            for (let i = 0; i < g.length; i++) {

                const arr = [g[i].be, g[i].fc, g[i].nv, g[i].o, g[i].sa, g[i].so, g[i].statusCritique];

                if (!arr.includes(true)) {
                    return false;
                }
            }

            for (let i = 0; i < h.length; i++) {

                const arr = [h[i].be, h[i].fc, h[i].nv, h[i].o, h[i].sa, h[i].so, h[i].statusCritique];

                if (!arr.includes(true)) {
                    return false;
                }
            }

            for (let z = 0; z < i.length; z++) {

                const arr = [i[z].be, i[z].fc, i[z].nv, i[z].o, i[z].sa, i[z].so, i[z].statusCritique];

                if (!arr.includes(true)) {
                    return false;
                }
            }

            for (let i = 0; i < j.length; i++) {

                const arr = [j[i].be, j[i].fc, j[i].nv, j[i].o, j[i].sa, j[i].so, j[i].statusCritique];

                if (!arr.includes(true)) {
                    return false;
                }
            }

            return true;
        },

        notEmpty() {
            this.$emit("changeColorExamen_famille5_lev5", this.checkProperties(this.examen.a, this.examen.b, this.examen.c, this.examen.d, this.examen.e, this.examen.f, this.examen.g, this.examen.h, this.examen.i, this.examen.j));
        },

        sauvegarde() {
            Examens.create(this.examen.a, this.examen.b, this.examen.c, this.examen.d, this.examen.e, this.examen.f, this.examen.g, this.examen.h, this.examen.i, this.examen.j, this.observateurId)
                .then((result) => {
                    if (result) {
                        this.watched_sauvegarder = true;
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }



    },

    created() {

        this.flagLoading = true;
        Examens.select(this.observateurId)
            .then((result) => {


                if (result.data.examen != null) {

                    this.examen.a = result.data.examen.a;
                    this.examen.b = result.data.examen.b;
                    this.examen.c = result.data.examen.c;
                    this.examen.d = result.data.examen.d;
                    this.examen.e = result.data.examen.e;
                    this.examen.f = result.data.examen.f;
                    this.examen.g = result.data.examen.g;
                    this.examen.h = result.data.examen.h;
                    this.examen.i = result.data.examen.i;
                    this.examen.j = result.data.examen.j;

                    this.flagLoading = false;
                    this.watched_sauvegarder = true;
                    return this.notEmpty();
                } else {

                    // delete all commentaires connected by examen but not saved
                    Examens.deleteAllCommentairesExamen(this.observateurId)
                        .then(() => {
                            console.log(true);
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                    this.flagLoading = false;
                }

                this.flagLoading = false;
                return this.notEmpty();

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
    margin-bottom: 150px;
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
    width: 500px;
    text-align: start;
}

table tr th:nth-child(1) {
    width: 500px;
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


.sauvegarder {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-top: 5px;
    margin-top: 5px;
    padding: 5px;
    border-bottom: 1px solid #141293;
}

.sauvegarder button {
    margin-left: 5px;
    margin-right: 5px;
}

.sauvegarder .watch {
    background-color: green;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}

.sauvegarder .watch:hover {
    background-color: rgb(2, 49, 2);
}

.sauvegarder .not-watch {
    background-color: red;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}

.sauvegarder .not-watch:hover {
    background-color: rgb(84, 1, 1);
}

.sauvegarder button {
    background-color: red;
    color: white;
    height: 30px;
    width: 200px;
    border: 0px;
    border-radius: 5px;
    cursor: pointer;
}

.sauvegarder button:hover {
    background-color: rgb(84, 1, 1);
}

.saved {
    color: #04AA6D;
}

.not-saved {
    color: red;
}

td>p {
    color: red;
    cursor: pointer;
}

td>p:hover {
    color: #04AA6D;
}
</style>