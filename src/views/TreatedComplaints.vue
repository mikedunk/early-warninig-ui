<template>
  <main class="content">
    <div class="card shadow-sm table-wrapper table-responsive">
      <div class="card-header border-bottom border-light">
        <h2 class="h5 mb-0">Treated Complaints</h2>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Resident's Name</th>
            <th>Reported By</th>
            <th>Treated By</th>
            <th>Date Reported</th>
            <th>Date Treated</th>
            <th>Time Treated</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in treated" :key="item.id">
            <td class="fw-bold">
              {{ item.resident_name }}
            </td>
            <td class="fw-nomal">
              {{ item.care_giver_name }}
            </td>
            <td class="fw-nomal">
              {{ item.nurse_name }}
            </td>
            <td class="fw-nomal">
              {{ item.created_at_date }}
            </td>
            <td class="fw-nomal">
              {{ item.responded_at_date }}
            </td>
            <td class="fw-nomal">
              {{ item.responded_at_time }}
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
          Showing <b>{{ treated.length }}</b> out of
          <b>{{ total }} </b> entries
        </div>
      </div>
    </div>
    <GenericModal
        :visible="showGenericModal"
        :title="'Pending Complaints'"
        :rand="randomItem"
        @closeGenericModal="closeGModal"
        @submitData="closeGModal"

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
                class="list-group-item align-items-center justify-content-center px-0"
              >
                <div>
                    <h2 class="small mb-1">Nurse's Response</h2>
                    <p class="h5 pe-4 justify-content-center">
                  <b>{{ randomItem.nurse_response }} </b>
                    </p>
                </div>
                <p class="small">by</p>
                <div><b>{{randomItem.nurse_name}}</b></div>
                <div class="justify-content-center">
                   <div class="small ">{{randomItem.responded_at_date}}  at {{randomItem.responded_at_time}}</div>
                </div>
              </li>  

            </ul>
       
        </template>
      </GenericModal>

    <!-- <div class="card theme-settings theme-settings-expand" id="theme-settings-expand">
      <div class="card-body p-3 py-2">
        <span class="fw-bold h6">
          <i class="fas fa-cogs me-1 fs-7"></i> Settings
        </span>
      </div>
    </div> -->
  </main>
</template>


<script>
import Service from "@/apis/services";

import Pagination from "../components/Pagination";
import GenericModal from "../components/GenericModal";

export default {
  components: {
    Pagination,
    GenericModal,
  },
  data() {
    return {
      treated: [],
      total: 0,
      page: 1,
      numberOfItems: 10,
      pageCount: 1,
      showGenericModal: false,
      randomItem: {},
    };
  },
  async created() {
    this.getAllResolvedComplaints();
  },
  methods: {
    async getAllResolvedComplaints(page, pageSize) {
      try {
        const res = await Service.getAllResolvedComplaints(page, pageSize);

        this.treated = res.data.resolved_complaints.data;
        this.total = res.data.resolved_complaints.total;
        this.page = res.data.resolved_complaints.page;
        this.numberOfItems = res.data.resolved_complaints.numberOfItems;
        this.pageCount = res.data.resolved_complaints.numberOfPages;
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message;
        } else this.error = error.message;
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

      await this.getAllResolvedComplaints(this.page, this.numberOfItems);
    },

    showGModal(item) {
      this.randomItem = item;
      this.showGenericModal = true;
    },
    closeGModal() {
      this.showGenericModal = false;
    },
  },
  textGuru(text) {
    if (text == "pending") return "text-secondary";
    else if (text == "resolved") return "text-success";
    else "text-primary";
  },
  getReported(item) {
    if (item == "null" || null || "") return "Not assigned";
    else return item;
  },
};

//.toLocalDateString('en-US',{ weekday:'short', day : 'numeric', month : 'short', year : 'numeric'})
</script>