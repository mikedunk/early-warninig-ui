<template>
  <main class="content">
    <div class="py-4">
      <div class="d-flex justify-content-between w-100 flex-wrap">
        <div class="mb-3 mb-lg-0">
          <h1 class="mb-0 h4">New User</h1>
          <p class="small mb-0">Create a new user</p>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 mb-4">
        <div class="card border-light shadow-sm components-section">
          <div class="card-body">
            <div class="row mb-4">
              <div class="col-lg-4 col-sm-6"></div>
              <div class="col-lg-4 col-sm-6">
                <form class="mt-4" @submit.prevent="">
                  <!-- Form -->

                  <div class="mb-4">
                    <label for="email">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      :class="{ 'is-valid': emailValid}"
                      id="email"
                      aria-describedby="emailHelp"
                      v-model="form.email"
                      @click="error = null"
                      @keyup="emailValid"
                    />
                  </div>
                  <div class="mb-3">
                    <label for="firstName">First name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="firstName"
                      required
                      v-model="form.first_name"
                      @click="error = null"
                    />
                    <!-- is-valid this class ticks green  -->
                  </div>

                  <div class="mb-3">
                    <label for="lastName">Last name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="lastName"
                      required
                      v-model="form.last_name"
                      @click="error = null"
                    />
                    <!-- is-valid this class ticks green  -->
                    <div class="valid-feedback">Looks good!</div>
                  </div>
                  <label class="my-1 me-2" for="role">Select Role</label>
                  <select
                    v-model="form.user_type"
                    class="form-select"
                    id="role"
                    aria-label="Select role"
                  >
                    <template v-for="role in usertypes" :key="role.name">
                      <option :value="role.name">{{ role.description }}</option>
                    </template>
                  </select>
                  <div>
                    <button
                      :disabled="buttonDisabled"
                      class="btn btn-dark"
                      type="submit"
                      @click="showGModal(form)"
                    >
                      Create user
                    </button>
                  </div>
                  <!-- End of Form -->
                </form>
              </div>
            </div>
            <div class="col-lg-4 col-sm-6"></div>
          </div>
        </div>
      </div>
    </div>
    <UserModal
      :visible="showUserModal"
      :title="'Create New User'"
      :rand="randomUser"
      :okButtonText="'Create'"
      @closeUserModal="closeGModal"
      @submitData="handleUserCreation"
    >
      <template v-slot:body>
        <div>
          <h5 class="h6 align-items-center">
            Are you sure you want to create a new user?
          </h5>
        </div>
        <ul class="justify-content-center border-top">
          <li>
            First name :
            <b> {{ randomUser.first_name }}</b>
          </li>
          <li>
            Last Name :
            <b>{{ randomUser.last_name }}</b>
          </li>
          <li>
            Email :
            <b>{{ randomUser.email }}</b>
          </li>
          <li>
            Role :

            <b> {{ randomUser.user_type }}</b>
          </li>
        </ul>
        <div class="text-danger" v-show="error">
          {{ error }}
        </div>
        <div class="loading" v-if="loading">
          <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        </div>
      </template>
    </UserModal>
  </main>
</template>


<script>
import Service from "@/apis/services";
import UserModal from "../components/UserModal.vue";

export default {
  components: {
    UserModal,
  },
  name: "signup",
  data() {
    return {
      form: {
        email: "",
        first_name: "",
        last_name: "",
        user_type: "",
      },
      error: null,
      usertypes: [],
      ifempty: false,
      emailAvailable: false,
      randomUser: {},
      showUserModal: false,
      userRoleDesc: "",
      createSuccess: false,
      loading: false,
      emailFormatValid: false,
    };
  },

  async mounted() {
    this.getRoles();
  },

  methods: {
    async getRoles() {
      try {
        const roles = await Service.getAuthRoles();
        this.usertypes = roles.data.user_types;
      } catch (error) {
        console.log(error);
      }
    },

    async createUser() {
      this.loading = true;
      try {
        const newuser = await Service.backOfficeSignUp(this.form);
        if (newuser.data.success === true) {
          this.createSuccess = true;
        }
      } catch (error) {
        console.log(error.response.data.error);
        this.error = error.response.data.error;
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    showGModal(item) {
      this.randomUser = item;
      this.showUserModal = true;
    },
    closeGModal() {
      this.showUserModal = false;
    },
    doNoth() {
      console.log("I'm not doing shit");
    },
    handleUserCreation() {
      this.createUser();
    },
    async checkIfEmailExists() {
      {
        try {
          const emailExists = await Service.validateEmail(this.form.email);
          if (emailExists.data.success === true) {
            this.emailAvailable = true;
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  computed: {
    buttonDisabled() {
      if (this.error !== null || this.form.user_type === "") {
        return true;
      } else return false;
    },

    emailValid() {
      if (this.form.email.length < 6) {
        return false;
      }
      const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      if (mailformat.test(this.form.email)) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>


<style scoped>
#axiosForm {
  /* Components Root Element ID */
  position: relative;
}
.loader {
  /* Loader Div Class */
  position: relative;
  top: 0px;
  right: 0px;
  width: 100%;
  height: 100%;
  background-color: #eceaea;
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: center;
  z-index: 10000000;
  opacity: 0.4;
  filter: alpha(opacity=40);
}
</style>