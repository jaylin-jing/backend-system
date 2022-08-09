import Vue from 'vue'
import Router from 'vue-router'
const Main = () => import('views/Main')
const Home = () => import('views/home/Home')
const User = () => import('views/user/User')
const Mall = () => import('views/mall/Mall')
const PageOne = () => import('views/others/PageOne')
const PageTwo = () => import('views/others/PageTwo')
const Login = () => import('views/login/Login')

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/home',
    children: [
      // {
      //   path: 'home',
      //   name: 'home',
      //   component: Home
      // },
      // {
      //   path: 'user',
      //   name: 'user',
      //   component: User
      // },
      // {
      //   path: 'mall',
      //   name: 'mall',
      //   component: Mall
      // },
      // {
      //   path: 'page1',
      //   name: 'page1',
      //   component: PageOne
      // },
      // {
      //   path: 'page2',
      //   name: 'page2',
      //   component: PageTwo
      // }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new Router({
  mode:'history',
  routes
})

export default router