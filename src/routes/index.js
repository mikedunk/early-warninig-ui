import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import MyComplaints from "@/views/MyComplaints.vue";
import PendingComplaints from "@/views/PendingComplaints.vue";
import TreatedComplaints from "@/views/TreatedComplaints.vue";
import Navigation from '@/views/Navigation.vue';
import SignUp from '@/views/SignUp.vue';
import Login from '@/views/Login.vue';
import ViewUsers from '@/views/ViewUsers.vue';
import NewUsers from '@/views/NewUsers.vue'

let user_ ;
let token;

const routes = [
    {
        path: "/signup",
        name: "signup",
        component: SignUp,
        meta: { requiresAuth: false }
    },
    {
        path: "/",
        name: "login",
        component: Login,
        meta: { requiresAuth: false },
        beforeEnter: (to, from, next) => {
            sessionStorage.clear()
            next()
        }
    },
    {
        path: "/auth",
        name: "nav",
        component: Navigation,
        redirect: { name: 'dashboard' },
        children: [
 
            {
                path: "dashboard",
                name: "Dashboard",
                component: Dashboard,
                meta: { requiresAuth: true },
                beforeEnter: (to, from, next) => {
                    if (user_ == undefined && token== undefined){
                        next({ name: 'login' })
                    }
                    else next()
                    // ...
                  }
            },
            {
                path: "mycomplaints",
                name: "mycomplaints",
                component: MyComplaints,
                meta: { requiresAuth: true, userType: 'care_giver' },
                beforeEnter: (to, from, next) => {
                    if (user_ == undefined  && token== undefined){
                        next({ name: 'login' })
                    }
                    else next()
                    // ...
                  }

            },
            {
                path: "pendingcomplaints",
                name: "pendingcomplaints",
                component: PendingComplaints,
                meta: { requiresAuth: true, userType: 'nurse' },
                beforeEnter: (to, from, next) => {
                    if (user_ == undefined  && token== undefined ){
                        next({ name: 'login' })
                    }
                    else next()
                    // ...
                  }
            },
            {
                path: "treatedcomplaints",
                name: "treatedcomplaints",
                component: TreatedComplaints,
                meta: { requiresAuth: true, userType: 'nurse' },
                beforeEnter: (to, from, next) => {
                    if (user_ == undefined  && token== undefined){
                        next({ name: 'login' })
                    }
                    else next()
                    // ...
                  }
            },
            {
                path: "users",
                name: "users",
                component: ViewUsers,
                meta: { requiresAuth: true, userType: 'admin' },
                beforeEnter: (to, from, next) => {
                    if (user_ == undefined  && token== undefined){
                        next({ name: 'login' })
                    }
                    else next()
                    // ...
                  }
            },
            {
                path: "users/new",
                name: "newusers",
                component: NewUsers,
                meta: { requiresAuth: true, userType: 'admin' },
                beforeEnter: (to, from, next) => {
                    if (user_ == undefined  && token== undefined){
                        next({ name: 'login' })
                    }
                    else next()
                    // ...
                  }
            },



        ]
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});



router.beforeEach((to, from, next) => {

     user_ = sessionStorage.user
     token = sessionStorage.token
    next()

});


export default router;