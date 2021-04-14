import { createWebHistory, createRouter } from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import MyComplaints from "@/views/MyComplaints.vue";
import PendingComplaints from "@/views/PendingComplaints.vue";
import TreatedComplaints from "@/views/TreatedComplaints.vue";
import Navigation from '@/views/Navigation.vue';
import SignUp from '@/views/SignUp.vue';
import Login from '@/views/Login.vue';

let user_ = null

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
        path: "/user",
        name: "nav",
        component: Navigation,
        redirect: { name: 'login' },
        children: [
 
            {
                path: "dashboard",
                name: "Dashboard",
                component: Dashboard,
                meta: { requiresAuth: true },
                beforeEnter: (to, from, next) => {
                    if (user_ == undefined){
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
                    if (user_ == undefined){
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
                    if (user_ == undefined){
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
                    if (user_ == undefined){
                        next({ name: 'login' })
                    }
                    else next()
                    // ...
                  }
            }

        ]
    },

];

const router = createRouter({
    history: createWebHistory(''),
    routes,
});



router.beforeEach((to, from, next) => {

     user_ = sessionStorage.user
    next()

});


export default router;