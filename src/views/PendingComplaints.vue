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
              {{ item.created_at_time }}
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

    <div class="card theme-settings theme-settings-expand" id="theme-settings-expand">
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

</script>