<template>
  <main class="content">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"
    >
      <div class="btn-toolbar dropdown">
        <button
          class="btn btn-dark btn-sm me-2 dropdown-toggle"
          aria-haspopup="true"
          aria-expanded="false"
          @click="showModal()"
        >
          <span class="fas fa-plus me-2"></span>
          New Complaint
        </button>
      </div>
      <div class="btn-group">
        <button type="button" class="btn btn-dark btn-sm me-2">Export</button>
      </div>
    </div>

    <div class="card card-body shadow-sm table-wrapper table-responsive">
      <div class="card-header border-bottom border-light">
        <h2 class="h5 mb-0">My Complaints</h2>
      </div>
      <table class="table table-hover">
        <thead>
          <tr></tr>
          <tr>
            <th>Resident's Name</th>
            <th>Nurse reported to</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Show details</th>
          </tr>
        </thead>
        <tbody>
          <!-- Item -->
          <tr v-for="item in mycomplaints" :key="item.id">
            <td class="fw-bold">
              {{ item.resident_name }}
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
            <td class="fw-normal" :class="textGuru(item.status)">
              {{ item.status }}
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
          Showing <b>{{ mycomplaints.length }}</b> out of
          <b>{{ total }}</b> entries
        </div>

        <GenericModal
          :visible="showGenericModal"
          :title="'Complaint Details'"
          :rand="randomItem"
          @closeGenericModal="closeGModal"
        >
          <template v-slot:body>
            <div class="list-group-item d-flex align-items-start">
              Resident's Name : &nbsp;&nbsp;
              <b>{{ randomItem.resident_name }} </b>
              <p></p>
              <p></p>
            </div>

            <div class="list-group-item d-flex align-items-start">
              Complaints :
            </div>

            <ul
              class="d-flex align-items-center"
              v-for="i in randomItem.complaint"
              :key="i.id"
            >
              <li>
                <b>{{ i.description }}</b>
              </li>
            </ul>
            <div
              class="list-group-item d-flex align-items-start"
              v-if="randomItem.reported_to !== 'null' || '' || null"
            >
              Reported To: &nbsp;&nbsp; <b>{{ randomItem.reported_to }}</b>
            </div>

            <div class="list-group-item d-flex align-items-start">
              Status: &nbsp;&nbsp;
              <b :class="textGuru(randomItem.status)">{{
                randomItem.status
              }}</b>
            </div>
            <div
              class="list-group-item d-flex align-items-start"
              v-if="randomItem.status !== 'pending'"
            >
              Nurse's Name: &nbsp;&nbsp; {{ randomItem.nurse_name }}
            </div>

            <div
              class="list-group-item d-flex align-items-start"
              v-if="randomItem.status !== 'pending'"
            >
              Nurse's Response: &nbsp;&nbsp;
              <p>{{ randomItem.nurse_response }}</p>
            </div>

            <div
              class="list-group-item d-flex align-items-start"
              v-if="randomItem.status !== 'pending'"
            >
              Date responded: &nbsp;&nbsp;
              <b>{{ randomItem.responded_at_date }} </b> &nbsp;&nbsp; Time
              responded: &nbsp;&nbsp; <b> {{ randomItem.responded_at_time }}</b>
            </div>
            <div
              class="list-group-item d-flex align-items-start"
              v-if="randomItem.status !== 'pending'"
            >
              Care giver's Name:&nbsp;&nbsp;
              <b>{{ randomItem.care_giver_name }}</b>
            </div>
          </template>
        </GenericModal>
      </div>
    </div>

    <ComplaintModal
      :visible="showComplaintModal"
      :complaint="datacomplaints"
      @close="closeModal"
    />
  </main>
</template>



<script>
import Service from "@/apis/services";
import Pagination from "../components/Pagination";
import ComplaintModal from "../components/ComplaintModal.vue";
import GenericModal from "../components/GenericModal.vue";

export default {
  components: {
    ComplaintModal,
    Pagination,
    GenericModal,
  },

  data() {
    return {
      showComplaintModal: false,
      mycomplaints: [],
      total: 0,
      page: 1,
      numberOfItems: 0,
      pageCount: 1,
      datacomplaints: [],
      showGenericModal: false,
      randomItem: {},
    };
  },
  name: "MyComplaints",
  props: {
    msg: String,
  },
  mounted() {
    this.getMyComplaints();
    this.getComplaints();
  },

  methods: {
    showModal() {
      this.showComplaintModal = true;
    },
    closeModal() {
      this.showComplaintModal = false;
      this.getMyComplaints();
    },

    showGModal(item) {
      this.randomItem = item;
      this.showGenericModal = true;
    },

    closeGModal() {
      this.showGenericModal = false;
    },

    async getMyComplaints(page, pageSize) {
      try {
        const res = await Service.getComplaintsRaisedByMe(page, pageSize);

        this.mycomplaints = res.data.raised.data;
        this.total = res.data.raised.total;
        this.page = res.data.raised.page;
        this.numberOfItems = res.data.raised.numberOfItems;
        this.pageCount = res.data.raised.numberOfPages;
      } catch (error) {
        console.log(error);
      }
    },

    async getComplaints() {
      try {
        const res = await Service.getComplaints();
        this.datacomplaints = res.data;
      } catch (error) {
        console.log(error);
      }
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

      await this.getMyComplaints(this.page, this.numberOfItems);
    },
  },
};
</script>