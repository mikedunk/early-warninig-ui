<template>
  <!-- Section -->
  <section class="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
    <div class="container">
      <p class="text-center">
        <router-link to="/" class="text-gray-700"
          ><i class="fas fa-angle-left me-2"></i> Back to Login
        </router-link>
      </p>
      <div
        class="row justify-content-center form-bg-image"
        data-background-lg="../../assets/img/illustrations/signin.svg"
      >
        <div class="col-12 d-flex align-items-center justify-content-center">
          <div
            class="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500"
          >
            <div class="text-center text-md-center mb-4 mt-md-0">
              <h1 class="mb-0 h3">Create an account</h1>
            </div>
            <form class="mt-4" @submit.prevent="signup()">
              <!-- Form -->
              <div class="form-group mb-4">
                <label for="email">Your Email</label>
                <div class="input-group">
                  <span class="input-group-text" id="email"
                    ><span class="fas fa-user"></span
                  ></span>
                  <input
                    type="email"
                    class="form-control"
                    placeholder="example@company.com"
                    id="email"
                    required
                    v-model="form.email"
                    @click="error = null"
                  />
                </div>
              </div>
              <!-- End of Form -->
              <div class="form-group">
                <!-- Form -->
                <div class="form-group mb-4">
                  <label for="password">Your Password</label>
                  <div class="input-group">
                    <span class="input-group-text" id="password"
                      ><span class="fas fa-unlock-alt"></span
                    ></span>
                    <input
                      type="password"
                      placeholder="Password"
                      class="form-control"
                      id="password"
                      required
                      v-model="form.password"
                      @click="error = null"
                    />
                  </div>
                  <div
                    class="text-danger"
                    v-if="
                      form.password !== '' &&
                      form.confirmPassword !== '' &&
                      form.password !== form.confirmPassword
                    "
                  >
                    {{ pwdmismatch }}
                  </div>
                </div>
                <!-- End of Form -->
                <!-- Form -->
                <div class="form-group mb-4">
                  <label for="confirm_password">Confirm Password</label>
                  <div class="input-group">
                    <span class="input-group-text" id="confirmPassword"
                      ><span class="fas fa-unlock-alt"></span
                    ></span>
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      class="form-control"
                      id="confirm_password"
                      :class="{ 'is-invalid': false}"
                      required
                      v-model="form.confirmPassword"
                    />
                  </div>
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
                  <!-- is-valid -->
                  <!-- <div class="valid-feedback">Looks good!</div> -->
                </div>
                <div class="mb-3">
                  <label for="firstName">Last name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lastName"
                    required
                    v-model="form.last_name"
                    @click="error = null"
                  />
                </div>

                <div class="mb-4">
                  <label class="my-1 me-2" for="role">Select User Role </label>
                  <select
                    v-model="form.user_type"
                    @click="error = null"
                    class="form-select"
                    id="role"
                    aria-label=""
                  >
                    <option
                      v-for="ut in usertypes"
                      :key="ut.id"
                      :value="ut.name"
                    >
                      {{ ut.description }}
                    </option>
                  </select>
                </div>
              </div>

              <div class="text-danger" v-if="error">
                {{ error }}
              </div>

              <div class="d-grid">
                <button
                  type="submit"
                  :disabled="buttonDisabled"
                  class="btn btn-dark"
                >
                  Sign in
                </button>
              </div>
            </form>
            <div class="d-flex justify-content-center align-items-center mt-4">
              <span class="fw-normal">
                Already have an account?
                <router-link class="fw-bold" to="/"> Login here </router-link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>



<script>
import Service from "@/apis/services";

export default {
  name: "signup",
  data() {
    return {
      form: {
        email: "",
        password: "",
        first_name: "",
        last_name: "",
        user_type: "",
        confirmPassword:""
      },
      error: null,
      usertypes: [],
      pwdmismatch: "Passwords Don't Match",
      unmatched: false,
      ifempty: false,
    };
  },

  async mounted() {
    this.getRoles();
  },

  methods: {
    async getRoles() {
      try {
        const roles = await Service.getRoles();
        this.usertypes = roles.data.user_types;
      console.log(this.usertypes)
      } catch (error) {
        console.log(error);
      }
    },

    async signup() {
      try {
        const newuser = await Service.signup(this.form);
        console.log(newuser);
        if (newuser.data.success === true) {
          const res = await Service.login({email:this.form.email, password:this.form.password});
          console.log(res);

          if (typeof Storage !== "undefined") {
            sessionStorage.setItem("token", res.data.token);
            sessionStorage.setItem("user", JSON.stringify(res.data.userobj));
          } else throw new Error("Session Storage Disabled");
          this.$router.push({ path: "/user/dashboard" });
        }
      } catch (error) {
        this.error = error.response.data.message;
        sessionStorage.clear();
        console.log(error);
      }
    },
  },
  computed: {
    buttonDisabled() {
      if (
        this.error !== null ||
        this.form.password !== this.form.confirmPassword ||
        this.form.user_type === ""
      ) {
        return true;
      } else return false;
    },
   
  },
};
</script>