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

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      treated: [],
      total: 0,
      page: 1,
      numberOfItems: 10,
      pageCount: 1,
    };
  },
  async created() {
    this.getAllResolvedComplaints();
  },
  methods: {
    async getAllResolvedComplaints(page, pageSize) {
      try {
        const res = await Service.getAllResolvedComplaints(page, pageSize);

        console.log(res.data.resolved_complaints.data[0]);

        this.treated = res.data.resolved_complaints.data;
        this.total = res.data.resolved_complaints.total;
        this.page = res.data.resolved_complaints.page;
        this.numberOfItems = res.data.resolved_complaints.numberOfItems;
        this.pageCount = res.data.resolved_complaints.numberOfPages;
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

      await this.getAllResolvedComplaints(this.page, this.numberOfItems);
    },
  },
};

//.toLocalDateString('en-US',{ weekday:'short', day : 'numeric', month : 'short', year : 'numeric'})
</script>