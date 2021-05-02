<template>
  <main class="content">
    <div class="col-6 col-lg-4 d-flex mb-4">
      <div class="input-group me-2 me-lg-3">
        <span class="input-group-text"
          ><span class="fas fa-search"></span
        ></span>
        <input
          v-model="searchterm"
          type="text"
          class="form-control"
          placeholder="Search"
          @keyup="searchForItem()"
          @reset="getAllUsers()"
        />
      </div>
      <div>
        <select
          v-model="form.user_type"
          class="form-select"
          id="role"
          aria-label="Select role"
          @change="findSelection(form.user_type)"
        >
          <option selected="selected" value="all">All</option>
          <template v-for="role in usertypes" :key="role.name">
            <option :value="role.name">
              {{ role.description }}
            </option>
          </template>
        </select>
      </div>
    </div>
    <div class="card card-body shadow-sm table-wrapper table-responsive">
      <div class="card-header border-bottom border-light">
        <h2 class="h5 mb-0">Users</h2>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody class="table-hover">
          <!-- Item -->
          <tr v-for="user in allUsers" :key="user.code">
            <td class="fw-bold">
              {{ user.first_name.charAt(0).toUpperCase()
              }}{{ user.first_name.substring(1) }}
            </td>
            <td class="fw-normal">
              {{ user.last_name.charAt(0).toUpperCase()
              }}{{ user.last_name.substring(1) }}
            </td>
            <td class="fw-normal">
              {{ user.email }}
            </td>
            <td class="fw-normal" :class="roleGuru(user.Role.name)">
              {{ user.Role.description }}
            </td>
            <td class="fw-normal" :class="textGuru(user.is_active)">
              {{ status(user.is_active) }}
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
                  @click="showOptions(user)"
                >
                  <span class="icon icon-sm pt-1"
                    ><span class="fas fa-ellipsis-h icon-dark"></span> </span
                  ><span class="sr-only">Toggle Dropdown</span>
                </button>
                <div class="dropdown-menu py-0" :class="{ show: showFor }">
                  <a class="dropdown-item rounded-top" href="#"
                    ><span class="fas fa-user-shield me-2"></span> Reset Pass</a
                  >
                  <a class="dropdown-item" href="#"
                    ><span class="fas fa-eye me-2"></span>View Details</a
                  >
                  <a class="dropdown-item text-danger rounded-bottom" href="#"
                    ><span class="fas fa-user-times me-2"></span>Suspend</a
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
          Showing <b>{{ allUsers.length }}</b> out of <b>{{ total }}</b> entries
        </div>
      </div>
    </div>

    <GenericModal
      :visible="showGenericModal"
      :title="'Pending Complaints'"
      :rand="randomUser"
      :okButtonText="'Respsond'"
      @closeGenericModal="closeGModal"
      @submitData="doNoth"
    >
      <template v-slot:body> </template>
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
      allUsers: [],
      total: 0,
      page: 1,
      numberOfItems: 10,
      pageCount: 1,
      showGenericModal: false,
      randomUser: {},
      form: {},
      modalErrorDiv: null,
      showFor: false,
      usertypes: [],
      searchterm: "",
      randomRole: "all",
    };
  },
  async mounted() {
    this.getAllUsers();
    this.getRoles();
  },
  methods: {
    async getAllUsers(params) {
      try {
        const res = await Service.getAllUsers(params);
        console.log(res.data.all);

        this.allUsers = res.data.all.users;
        this.total = res.data.all.total;
        this.page = res.data.all.page;
        this.numberOfItems = res.data.all.numberOfItems;
        this.pageCount = res.data.all.numberOfPages;
      } catch (error) {
        console.log(error);
      }
    },
    async getRoles() {
      try {
        const roles = await Service.getAuthRoles();
        this.usertypes = roles.data.user_types;
      } catch (error) {
        console.log(error);
      }
    },

    doNoth() {
      console.log("fdxgc hvh");
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

      await this.getAllUsers({ page: this.page, role: this.randomRole });
    },

    showGModal(item) {
      this.randomUser = item;
      this.showGenericModal = true;
    },
    textGuru(text) {
      if (text == true) return "text-success";
      else if (text == false) return "text-danger";
      else "text-primary";
    },
    status(stat) {
      if (stat == true) {
        return "Active";
      } else return "Inactive";
    },
    roleGuru(role) {
      if (role == "admin") {
        return "text-danger";
      } else if (role == "nurse") {
        return "text-secondary";
      } else if (role == "care_giver") {
        return "text-info";
      } else return "text-primary";
    },

    closeGModal() {
      this.showGenericModal = false;
    },
    showOptions(user) {
      this.showFor = !this.showFor;
      this.randomUser = user;
    },

    findSelection(role) {
      this.randomRole = role;
      if (role == "all") {
        this.randomRole = null;
        this.getAllUsers();
      } else this.getAllUsers({ role: role });
    },
    searchForItem() {
      if (this.searchterm == "") {
        this.getAllUsers();
      }
      if (this.searchterm.length < 3) {
        return;
      }
      this.getAllUsers({ role: this.randomRole, search: this.searchterm });
    },
  },
};
</script>