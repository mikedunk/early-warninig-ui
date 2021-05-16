<template>
  <tr>
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
          aria-haspopup="true"
          aria-expanded="false"
          @click="showOptions()"
        >
          <span class="icon icon-sm pt-1"
            ><span class="fas fa-ellipsis-h icon-dark"></span> </span
          ><span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu py-0" :class="{ show: showFor }">
          <button class="dropdown-item rounded-top" @click="resetPassword()">
            <span class="fas fa-user-shield me-2"></span> Reset Password
          </button>
          <button class="dropdown-item" @click="showGModal()">
            <span class="fas fa-eye me-2"></span>View Details
          </button>
          <button
            v-if="user.is_active === true"
            class="dropdown-item text-danger rounded-bottom"
            @click="changeUserStatus()"
          >
            <span class="fas fa-user-times me-2"></span>{{ checkStatus() }}
          </button>
          <button
            v-if="user.is_active === false"
            class="dropdown-item text-success rounded-bottom"
            @click="changeUserStatus()"
          >
            <span class="fas fa-user-plus me-2"></span>{{ checkStatus() }}
          </button>
        </div>
      </div>
    </td>
  </tr>
  <UserDetailsModal
    :visible="showUserModal"
    :title="'User Details'"
    :okButtonText="'Ok'"
    @closeUserModal="closeGModal"
  >
    <template v-slot:body>
      <h2 class="h5 mb-4">User Details</h2>
      <div>
        <!-- <h2 class="small mb-1">Email</h2> -->
        <p class="h5 pe-4">
          <b>{{ user.email }} </b>
        </p>
      </div>
      <div>
        <!-- <h2 class="small mb-1">Name</h2> -->
        <p class="h5 pe-4">
          <b>{{ user.first_name }} {{ user.last_name }}</b>
        </p>
      </div>
      <div>
        <!-- <h2 class="small mb-1">Role</h2> -->
        <p class="h5 pe-4">
          <b>{{ user.Role.description }}</b>
        </p>
      </div>
      <div>
        <!-- <h2 class="small mb-1">Role</h2> -->
        <p class="h5 pe-4">
          <b :class="textGuru(user.is_active)"> {{ status(user.is_active) }}</b>
        </p>
      </div>
    </template>
  </UserDetailsModal>
</template>

<script>
import Service from "@/apis/services";
import UserDetailsModal from "./UserDetailsModal.vue";
export default {
  components: {
    UserDetailsModal,
  },
  name: "ListItem",
  emits: ["randomuser","action"],
  props: {
    user: {
      type: Object,
      required: true,
    },
    ind: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      showFor: false,
      open: false,
      showUserModal: false,
    };
  },

  methods: {
    showOptions() {
      this.showFor = !this.showFor;
    },
    showGModal() {
      this.showUserModal = true;
      this.$emit("randomuser", this.user);
    },
    closeGModal() {
      this.showUserModal = false;
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
    handleModalClose() {
      this.form.complaint = [];
      this.$emit("action");
    },
    async resetPassword() {
      try {
        const code = this.user.code;
        await Service.resetUserPassword(code);
      } catch (error) {
        console.log(error);
      }
    },

    async changeUserStatus() {
      const code = this.user.code;
      try {
        if (this.user.is_active === true) {
          await Service.resetUserPassword(code);
        }
      } catch (error) {
        console.log(error);
      }
    },
    checkStatus() {
      if (this.user.is_active === false) {
        return "Activate";
      } else return "Deactivate";
    },
    userStatus() {
      if (this.user.is_active === false) {
        return "Active";
      } else return "Inactive";
    },
  },
};
</script>