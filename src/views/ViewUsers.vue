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
          <template v-for="(one, index) in allUsers" :key="index">
            <ListItem
              :user="one"
              :ind="index"
              @showMod="showGModal"
              @showCModal="showCoModal"
              @thisuser="setRandomUser"
            />
          </template>
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
  <UserModal
    :visible="showUserModal"
    :title="'User Details'"
    :rand="randomUser"
    @closeUserModal="closeModal"
  >
  </UserModal>

  <ConfirmModal
    :visible="showConfirmModal"
    :title="'Confirm'"
    :rand="randomUser"
    :action="buttonAction"
    @closeConfirmModal="closeCModal"
    @ok="okSignalReceived"
  >
    <!-- <template v-slot:body> -->
  </ConfirmModal>
</template>

<script>
import Service from "@/apis/services";
import UserModal from "../components/UserModal.vue";
import Pagination from "../components/Pagination.vue";
import ListItem from "../components/ListItem.vue";
import ConfirmModal from "../components/ConfirmModal.vue";

export default {
  components: {
    Pagination,
    UserModal,
    ListItem,
    ConfirmModal,
  },
  data() {
    return {
      allUsers: [],
      total: 0,
      page: 1,
      numberOfItems: 10,
      pageCount: 1,
      showUserModal: false,
      showConfirmModal: false,
      randomUser: [],
      form: {},
      modalErrorDiv: null,
      showFor: false,
      usertypes: [],
      searchterm: "",
      randomRole: null,
      fullName: null,
      buttonAction: "act",
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
        if (error.response) {
          this.error = error.response.data.message;
        } else this.error = error.message;
      }
    },
    async getRoles() {
      try {
        const roles = await Service.getAuthRoles();
        this.usertypes = roles.data.user_types;
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message;
        } else this.error = error.message;
      }
    },
    setRandomUser(rand) {
      this.randomUser = rand;
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

    showGModal() {
      this.showUserModal = true;
    },
    showCoModal(action) {
      console.log(action);
      this.buttonAction = action;
      this.showConfirmModal = true;
    },

    closeCModal() {
      this.showConfirmModal = false;
    },

    closeModal() {
      this.showUserModal = false;
    },

    okSignalReceived() {
      this.getAllUsers({ role: this.randomRole, search: this.searchterm });
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
  computed: {},
};
</script>