import Axios from 'axios';

import router from '../routes'


let token;


export default {

    login(body) {
        return Axios.post('user/login', body)
    },
    signup(body) {
        return Axios.post('user/register', body)
    },

    getAllRaisedComplaints(page, pageSize) {
        token = sessionStorage.token;
        const head = { "auth-token": token }

        return Axios.get('complaint/all', { headers: head, params: { page, pageSize } })
    },
    getAllPendingComplaints(page, pageSize) {
        token = sessionStorage.token;
        const head = { "auth-token": token }

        return Axios.get('complaint/all/pending', { headers: head, params: { page, pageSize } })
    },
    getAllResolvedComplaints(page, pageSize) {
        token = sessionStorage.token;
        const head = { "auth-token": token }

        return Axios.get('complaint/all/resolved', { headers: head, params: { page, pageSize } })
    },
    respondToComplaints(body) {
        token = sessionStorage.token;
        const head = { "auth-token": token }

        return Axios.post('complaint/respond', body, { headers: head })
    },
    raiseNewComplaint(body) {
        token = sessionStorage.token;
        const head = { "auth-token": token }

        return Axios.post('complaint/raise', body, { headers: head })
    },
    getComplaintsResolvedByMe(page, pageSize) {
        token = sessionStorage.token;
        const head = { "auth-token": token }

        return Axios.get('complaint/resolved/me', { headers: head, params: { page, pageSize } })
    },
    getComplaintsRaisedByMe(page, pageSize) {
        token = sessionStorage.token;
        const head = { "auth-token": token }

        return Axios.get('/complaint/raised/me', { headers: head, params: { page, pageSize } })
    },
    getComplaintsAssignedToMe(page, pageSize) {
        token = sessionStorage.token;
        const head = { "auth-token": token }

        return Axios.get('complaint/assigned/me', { headers: head, params: { page, pageSize } })
    },

    getTreatedCount() {
        token = sessionStorage.token;
        const head = { "auth-token": token }

        return Axios.get("complaint/treatedcount", { headers: head })

    },
    logout() {
        token = sessionStorage.token;
        const head = { "auth-token": token }

        return Axios.get("complaint/logout", { headers: head })
    },
    getRoles() {
        return Axios.get("/user/usertypes")
    },

    getComplaints() {
        token = sessionStorage.token;
        const head = { "auth-token": token }

        return Axios.get("backoffice/complaint/active", { headers: head })
    },

    getNurses() {
        token = sessionStorage.token;
        const head = { "auth-token": token }

        return Axios.get('user/nurses', { headers: head })
    },

    getCareGivers() {
        token = sessionStorage.token;
        const head = { "auth-token": token }

        return Axios.get('user/caregivers', { headers: head })
    },

    getAuthRoles() {
        token = sessionStorage.token;
        const head = { "auth-token": token }
        return Axios.get('user/auth/usertypes', { headers: head })

    },

    getAllUsers(parameters) {
        token = sessionStorage.token;
        const head = { "auth-token": token }
        return Axios.get('user/all', { headers: head, params: parameters })

    },

    backOfficeSignUp(body) {

        token = sessionStorage.token;
        const head = { "auth-token": token }
        return Axios.post('user/backofficesignup', body, { headers: head })

    },
    deactivateUser(usercode) {
        token = sessionStorage.token;
        const head = { "auth-token": token }
        return Axios.get(`user/deactivate/${usercode}`, { headers: head })

    },

    activateUser(usercode) {
        token = sessionStorage.token;
        const head = { "auth-token": token }
        return Axios.get(`user/activate/${usercode}`, { headers: head })

    },
    resetUserPassword(usercode) {
        token = sessionStorage.token;
        const head = { "auth-token": token }
        return Axios.get(`user/pwdreset/${usercode}`, { headers: head })

    },




}


Axios.interceptors.response.use(function (response) {
    if (401 == response.status) {
        router.push({ path: "/" })
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    if (401 == error.response.status) {
        router.push({ path: "/" })
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});