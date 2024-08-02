import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/DashboardView.vue'
import InterventionsView from '../views/InterventionsView.vue'
import ObservateursView from '../views/ObservateursView.vue'
import FormulaireView from '@/views/FormulaireView.vue'
import Previsualisation from '@/views/PrevisualisationView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: DashboardView
  },
  {
    path: '/interventions',
    name: 'interventions',
    component: InterventionsView
  },
  {
    path: '/observateurs',
    name: 'observateurs',
    component: ObservateursView
  },
  {
    path: '/formulaire',
    name: 'formulaire',
    component: FormulaireView
  },
  {
    path: '/previsualisation',
    name: 'previsualisation',
    component: Previsualisation
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
