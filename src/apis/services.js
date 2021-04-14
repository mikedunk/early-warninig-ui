import Axios from 'axios';



const token = sessionStorage.token;
const head = { "auth-token": token }

export default {

    login(body) {
        return Axios.post('user/login', body)
    },
    signup(body) {
        return Axios.post('user/register', body)
    },

    getAllRaisedComplaints(page, pageSize) {
        return Axios.get('complaint/all', { headers: head, params: { page, pageSize } })
    },
    getAllPendingComplaints(page, pageSize) {
        return Axios.get('complaint/all/pending', { headers: head, params: { page, pageSize } })
    },
    getAllResolvedComplaints(page, pageSize) {
        return Axios.get('complaint/all/resolved', { headers: head, params: { page, pageSize } })
    },
    respondToComplaints(body) {
        return Axios.post('complaint/respond', body, { headers: head })
    },
    raiseNewComplaint(body) {
        return Axios.post('complaint/raise', body, { headers: head })
    },
    getComplaintsResolvedByMe(page, pageSize) {
        return Axios.get('complaint/resolved/me', { headers: head, params: { page, pageSize } })
    },
    getComplaintsRaisedByMe(page, pageSize) {
        return Axios.get('/complaint/raised/me', { headers: head, params: { page, pageSize } })
    },
    getComplaintsAssignedToMe(page, pageSize) {
        return Axios.get('complaint/assigned/me', { headers: head, params: { page, pageSize } })
    },

    getTreatedCount() {
        return Axios.get("complaint/treatedcount", { headers: head })
    },
    logout() {
        return Axios.get("complaint/logout", { headers: head })
    },
    getRoles() {
        return Axios.get("/user/usertypes")
    },

    getComplaints() {
        return Axios.get("backoffice/complaint/active", { headers: head })
    },

    getNurses() {
        return Axios.get('user/nurses', { headers: head })
    },

    getCareGivers() {
        return Axios.get('user/caregivers', { headers: head })
    }



}