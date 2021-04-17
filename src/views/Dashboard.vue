<template>
  <main class="content">
    <div class="row">
      <div class="col-12 mb-4">
        <div class="card border-light shadow-sm">
          <div class="card-header">
            <div class="row">
              <div class="col text-left">
                <h2 class="h5">Pending Complaints</h2>
              </div>
              <div
                v-if="usertype == 'admin' || usertype == 'nurse'"
                class="col text-right"
              >
                <router-link
                  to="/user/pendingcomplaints"
                  class="btn btn-sm btn-secondary"
                  >See all</router-link
                >
              </div>
            </div>
          </div>
          <div class="card-body table-wrapper table-responsive">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Resident's Name</th>
                  <th>Reported By</th>
                  <th>Nurse reported to</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Show details</th>
                </tr>
              </thead>
              <tbody class="table-hover">
                <!-- Item -->
                <tr v-for="item in pendingcomplaints" :key="item.id">
                  <td class="fw-bold">
                    {{ item.resident_name }}
                  </td>
                  <td class="fw-normal">
                    {{ item.care_giver_name }}
                  </td>
                  <td class="fw-normal">
                    {{ getReported(item.reported_to) }}
                  </td>
                  <td class="fw-normal">
                    {{ item.created_at_date }}
                  </td>
                  <td class="fw-normal">
                    {{ item.created_at_time }}
                  </td>
                  <td>
                    <div class="btn-group">
                      <button
                        class="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                        aria-haspopup="true"
                        aria-expanded="false"
                        @click="showGModal(item)"
                      >
                        <span class="icon icon-sm">
                          <span class="fas fa-ellipsis-h icon-dark"></span>
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!-- pagination footer -->
          <div
            class="card-footer px-3 border-0 d-flex align-items-center justify-content-between"
          >
            <Pagination
              :pages="pageCount"
              :itemsPerPage="numberOfItems"
              :currentPage="page"
              @nextPage="pageChangeHandle('next')"
              @previousPage="pageChangeHandle('previous')"
              @loadPage="pageChangeHandle"
            />

            <div class="fw-bold small d-none d-lg-block">
              Showing <b>{{ pendingcomplaints.length }}</b> out of
              <b>{{ total }}</b> entries
            </div>
          </div>
        </div>
      </div>
      <GenericModal
        :visible="showGenericModal"
        :title="'Pending Complaints'"
        :rand="randomItem"
        :okButtonText="'Respsond'"
        @closeGenericModal="closeGModal"
        @submitData="respondToComplaint"

      >
         <template v-slot:body>
            <h2 class="h5 mb-4">Complaint Details</h2>
            <ul class="list-group list-group-flush ">
              <li
                class="list-group-item d-flex align-items-center justify-content-center px-0 border-top border-bottom"
              >
                <div>
                    <h2 class="small mb-1">Resident's Name</h2>
                    <p class="h5 pe-4">
                  <b>{{ randomItem.resident_name }} </b>
                    </p>
                </div>
              </li>
             <li
                class="list-group-item align-items-center justify-content-between px-0 border-bottom"
              >
                <div>
                  <h3 class="small mb-1">Complaints</h3>
                  <p class="small pe-4">
                <ul
                    class=" align-items-center justify-content-between" 
                    v-for="i in randomItem.complaint"
                    :key="i.id"
                  >
                    <li>
                      <b>{{ i.description }}</b>
                    </li>
               </ul>
                  </p>
                </div>
                <p class="small">by</p>
                <div><b>{{randomItem.care_giver_name}}</b></div>
                <div class="justify-content-center">
                   <div class="small ">{{randomItem.created_at_date}}  at {{randomItem.created_at_time}}</div>
                </div>

              </li>
              <li
                v-if="randomItem.reported_to !== 'null' || '' || null"
                class="list-group-item d-flex align-items-center justify-content-center px-0 border-bottom"
              ><div>
                  <h2 class="small mb-1">Reported to</h2>

                  <p class="h5 pe-4">
                 <b>{{ randomItem.reported_to }} </b>
                  </p>
               </div>
              </li>            
             <li
                class="list-group-item   justify-content-center px-0"
              >
              <div>
              <label for="treatComplaint" class="form-label small"
                >Respond to complaint</label
              >
              <textarea
                class="form-control"
                id="treatComplaint"
                rows="3"
                v-model="form.nurse_response"
                required
                  @click="modalErrorDiv = null"
              ></textarea>
              </div>
             </li>
              <div class="text-danger" v-show="modalErrorDiv">
                {{ modalErrorDiv }}
              </div>
            </ul>
       
        </template>
      </GenericModal>
    </div>
    <div class="row justify-content-md-center">
      <div class="col-12 col-sm-6 col-xl-6 mb-4">
        <div class="card border-light shadow-sm">
          <div class="card-body">
            <div class="row d-block d-xl-flex align-items-center">
              <div
                class="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center"
              >
                <div
                  class="icon icon-shape icon-md icon-shape-primary rounded me-4 me-sm-0"
                >
                  <span class="fas fa-chart-line"></span>
                </div>
                <div class="d-sm-none">
                  <h2 class="h5">All Pendng complaints</h2>
                  <h3 class="mb-1">{{ total }}</h3>
                </div>
              </div>
              <div class="col-12 col-xl-7 px-xl-0">
                <div class="d-none d-sm-block">
                  <h2 class="h5">All Pendng complaints</h2>
                  <h3 class="mb-1">{{ total }}</h3>
                </div>
                <!-- <small
                  >Feb 1 - Apr 1 <span class="icon icon-small"></span>
                </small> -->
                <!-- <div class="small mt-2">
                  <span class="fas fa-angle-up text-success"></span>
                  <span class="text-success fw-bold">18.2%</span> Since last
                  month
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-6 col-xl-6 mb-4">
        <div class="card border-light shadow-sm">
          <div class="card-body">
            <div class="row d-block d-xl-flex align-items-center">
              <div
                class="col-12 col-xl-5 text-xl-center mb-3 mb-xl-0 d-flex align-items-center justify-content-xl-center"
              >
                <div
                  class="icon icon-shape icon-md icon-shape-secondary rounded me-4"
                >
                  <span class="fas fa-cash-register"></span>
                </div>
                <div class="d-sm-none">
                  <h2 class="h5">All Treated Complaints</h2>
                  <h3 class="mb-1">{{ treatedCount }}</h3>
                </div>
              </div>
              <div class="col-12 col-xl-7 px-xl-0">
                <div class="d-none d-sm-block">
                  <h2 class="h5">All Treated Complaints</h2>
                  <h3 class="mb-1">{{ treatedCount }}</h3>
                </div>
                <!-- <small
                  >Feb 1 - Apr 1 <span class="icon icon-small"> </span>
                </small>
                <div class="small mt-2">
                  <span class="fas fa-angle-up text-success"></span>
                  <span class="text-success fw-bold">28.2%</span> Since last
                  month
                </div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>



<script>
import Service from "@/apis/services";
import GenericModal from "../components/GenericModal";

import Pagination from "../components/Pagination";

export default {
  components: {
    Pagination,
    GenericModal,
  },
  data() {
    return {
      pendingcomplaints: [],
      total: 0,
      page: 1,
      numberOfItems: 10,
      pageCount: 1,
      treatedCount: 0,
      usertype: "",
      showGenericModal: false,
      randomItem: {},
      form: {},
      modalErrorDiv: null
    };
  },
  created() {
    this.getAllPendingComplaints();
    this.getTreatedCount();

    const user_ = JSON.parse(sessionStorage.user);
    this.usertype = user_.role;
  },
  methods: {
    async getAllPendingComplaints(page, pageSize) {
      try {
        const res = await Service.getAllPendingComplaints(page, pageSize);

        this.pendingcomplaints = res.data.complaints.data;
        this.total = res.data.complaints.total;
        this.page = res.data.complaints.page;
        this.numberOfItems = res.data.complaints.numberOfItems;
        this.pageCount = res.data.complaints.numberOfPages;
      } catch (error) {
        console.log(error);
      }
    },

    async getTreatedCount() {
      try {
        const count = await Service.getTreatedCount();
        this.treatedCount = count.data.numberOfTreatedComplaints;
      } catch (error) {
        console.log(error);
      }
    },
    async respondToComplaint() {
      try {
        this.form.id = this.randomItem.id
        await Service.respondToComplaints(this.form);
        this.form={}
        this.closeGModal();
        this.getAllPendingComplaints()

      } catch (error) {
        this.modalErrorDiv = error.response.data.message
        console.log(error);
      }
    },

    async pageChangeHandle(value) {
      switch (value) {
        case "next":
          this.page += 1;
          break;
        case "previous":
          this.page -= 1;
          break;
        default:
          this.page = value;
      }

      await this.getAllPendingComplaints(this.page, this.numberOfItems);
    },
    getReported(item) {
      if (item == "null" || null || "") return "Not assigned";
      else return item;
    },
    showGModal(item) {
      this.randomItem = item;
      this.showGenericModal = true;
    },
    closeGModal() {
      this.showGenericModal = false;    
    }

  },
};

//.toLocalDateString('en-US',{ weekday:'short', day : 'numeric', month : 'short', year : 'numeric'})
</script>