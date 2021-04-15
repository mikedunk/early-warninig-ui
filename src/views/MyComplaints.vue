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
            <th>Nurse</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <!-- Item -->
          <tr v-for="item in mycomplaints" :key="item.id">
            <td class="fw-bold">
              {{ item.resident_name }}
            </td>
            <td class="fw-normal">
              {{ item.nurse_name }}
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

            <!-- <td><span class="fw-bold text-success">Treated</span></td> -->
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
      </div>
    </div>

    <ComplaintModal :visible="showComplaintModal" :complaints="datacomplaints"  @close="closeModal" />
  </main>
</template>



<script>
import Service from "@/apis/services";
import Pagination from "../components/Pagination";
import ComplaintModal from "../components/ComplaintModal.vue";

export default {
  components: {
    ComplaintModal,
    Pagination,
  },

  data() {
    return {
      showComplaintModal: false,
      mycomplaints: [],
      total: 0,
      page: 1,
      numberOfItems: 0,
      pageCount: 1,
      datacomplaints :[]
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
    
    async getComplaints(){

           try {
        const res = await Service.getComplaints();
        this.datacomplaints = res.data
      } catch (error) {
        console.log(error);
      }
      
    },

    
    textGuru(text) {
      if (text == "pending") return "text-secondary";
      else if (text == "treated") return "text-success";
      else "text-primary";
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