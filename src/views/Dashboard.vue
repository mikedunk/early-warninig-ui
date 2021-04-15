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
                  <th>Nurse</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody class="table table-hover">
                <!-- Item -->
                <tr v-for="item in pendingcomplaints" :key="item.id">
                  <td class="fw-bold">
                    {{ item.resident_name }}
                  </td>
                  <td class="fw-normal">
                    {{ item.care_giver_name }}
                  </td>
                  <td class="fw-normal">
                    {{ item.reported_to }}
                  </td>
                  <td class="fw-normal">
                    {{ item.created_at_date }}
                  </td>
                  <td class="fw-normal">
                    {{ item.created_at_date }}
                  </td>
                  <td>
                    <div class="btn-group">
                      <button
                        class="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <span class="icon icon-sm">
                          <span class="fas fa-ellipsis-h icon-dark"></span>
                        </span>
                        <span class="sr-only">Toggle Dropdown</span>
                      </button>
                      <div class="dropdown-menu py-0">
                        <a
                          class="dropdown-item rounded-top"
                          data-bs-toggle="modal"
                          data-bs-target="#dashboard-pending-complaint"
                          href="#"
                          ><span class="fas fa-eye me-2"></span>View Details</a
                        >
                      </div>
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
//import BasePagination from "../components/BasePagination";

import Pagination from "../components/Pagination";

export default {
  components: {
    Pagination,
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
  },
};

//.toLocalDateString('en-US',{ weekday:'short', day : 'numeric', month : 'short', year : 'numeric'})
</script>