<template>
  <main class="content">
    <div class="card card-body shadow-sm table-wrapper table-responsive">
      <div class="card-header border-bottom border-light">
        <h2 class="h5 mb-0">Pending Complaints</h2>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>Resident's Name</th>
            <th>Reported By</th>
            <th>Nurse reported to</th>
            <th>Date</th>
            <th>Time</th>
            <th>View details</th>
          </tr>
        </thead>
        <tbody class=" table-hover">
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

    <div
      class="card theme-settings theme-settings-expand"
      id="theme-settings-expand"
    >
      <div class="card-body p-3 py-2">
        <span class="fw-bold h6">
          <i class="fas fa-cogs me-1 fs-7"></i> Settings
        </span>
      </div>
    </div>
  </main>
</template>

<script>
import Service from "@/apis/services";
import GenericModal from "../components/GenericModal.vue";
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
      showGenericModal: false,
      randomItem: {},
      form: {},
      modalErrorDiv: null,
    };
  },
  async mounted() {
    this.getAllPendingComplaints(1, 10);
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
        if (error.response) {
          this.error = error.response.data.message;
        } else this.error = error.message;
      }
    },

    getReported(item) {
      if (item == "null" || null || "") return "Not assigned";
      else return item;
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

    showGModal(item) {
      this.randomItem = item;
      this.showGenericModal = true;
    },
    textGuru(text) {
      if (text == "pending") return "text-secondary";
      else if (text == "treated") return "text-success";
      else "text-primary";
    },

    closeGModal() {
      this.showGenericModal = false;
    },

    async respondToComplaint() {
      try {
        this.form.id = this.randomItem.id;
        await Service.respondToComplaints(this.form);
        this.form = {};
        this.closeGModal();
        this.getAllPendingComplaints();
      } catch (error) {
        this.modalErrorDiv = error.response.data.message;
        if (error.response) {
          this.error = error.response.data.message;
        } else this.error = error.message;
      }
    },
  },
};
</script>