<template>
  <main class="content">
    <div
      class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4"
    >
      <div class="btn-toolbar dropdown">
        <button
          type="button"
          class="btn btn-block btn-dark mb-3"
          data-bs-toggle="modal"
          data-bs-target="#modal-default"
          @click="cons"
        >
          New Complaint
        </button>

        <!-- <DisplayModal :fondle="asun" @cfinsih="closeModal" /> -->
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
          <tr>
            <td>
              <a href="#" class="fw-bold"> John James </a>
            </td>
            <td>
              <span class="fw-normal">Barack Barnes</span>
            </td>
            <td><span class="fw-normal">1 Jun 2020</span></td>
            <td><span class="fw-bold">10:00 AM</span></td>
            <td><span class="fw-bold text-success">Treated</span></td>
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
                  <a class="dropdown-item rounded-top" href="#"
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
        <nav aria-label="Page navigation example">
          <ul class="pagination mb-0">
            <li class="page-item">
              <a class="page-link" href="#">Previous</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">1</a>
            </li>
            <li class="page-item active">
              <a class="page-link" href="#">2</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">3</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">4</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">5</a>
            </li>
            <li class="page-item">
              <a class="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
        <div class="fw-bold small d-none d-lg-block">
          Showing <b>6</b> out of <b>25</b> entries
        </div>
      </div>
    </div>

    <div class="theme-settings card pt-2 collapse" id="theme-settings">
      <div class="card-body pt-4">
        <button
          type="button"
          class="btn-close theme-settings-close"
          aria-label="Close"
          data-bs-toggle="collapse"
          href="#theme-settings"
          role="button"
          aria-expanded="false"
          aria-controls="theme-settings"
        ></button>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <p class="m-0 mb-1 me-4 fs-7">
            Open source <span role="img" aria-label="gratitude">💛</span>
          </p>
          <a
            class="github-button"
            href="https://github.com/themesberg/volt-bootstrap-5-dashboard"
            data-color-scheme="no-preference: dark; light: light; dark: light;"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star themesberg/volt-bootstrap-5-dashboard on GitHub"
            >Star</a
          >
        </div>
        <a
          href="https://themesberg.com/product/admin-dashboard/volt-bootstrap-5-dashboard"
          target="_blank"
          class="btn btn-primary mb-3 w-100"
          >Download <i class="fas fa-download ms-2"></i
        ></a>
        <p class="fs-7 text-gray-700 text-center">
          Available in the following technologies:
        </p>
      </div>
    </div>

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
//import Pagination from "../components/Pagination";
//import DisplayModal from "../components/DisplayModal.vue";
//import ComplaintModal from "../components/ComplaintModal.vue";

export default {
  components: {
   // DisplayModal,
    //  ComplaintModal,
  },

  data() {
    return {
      visible: false,
      asun: "asun",
      craft:'asun'
    };
  },
  name: "MyComplaints",
  props: {
    msg: String,
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    closeModal() {
      this.visible = false;
      console.log("im not okobo once again");
    },
    cons() {
      console.log("im not okobo");
    },
  },
};
</script>