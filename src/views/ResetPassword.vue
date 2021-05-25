<template>
  <!-- Section -->
  <section class="vh-lg-100 mt-4 mt-lg-0 bg-soft d-flex align-items-center">
    <div class="container">
      <div class="row justify-content-center form-bg-image">
        <p class="text-center">
          <router-link to="/" class="text-gray-700"
            ><i class="fas fa-angle-left me-2"></i> Back to Login
          </router-link>
        </p>
        <div class="col-12 d-flex align-items-center justify-content-center">
          <div
            class="signin-inner my-3 my-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500"
          >
            <h1 class="h3">Forgot your password?</h1>
            <p class="mb-4">Don't get worked up! Just type in your email</p>
            <form @submit.prevent="resetPassword" v-if="!success">
              <!-- Form -->
              <div class="mb-4">
                <label for="email">Your Email</label>
                <div class="input-group">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="john@company.com"
                    required
                    autofocus
                    v-model="form.email"
                    @click="error = null"
                  />
                </div>
              </div>
              <!-- End of Form -->
              <div class="d-grid">
                <button type="submit" class="btn btn-dark">
                  Recover password
                </button>
              </div>
            </form>
            <div v-if="success">
              <div class="h1">
                <i class="fa fa-check-circle fa-fw text-success"></i>
              </div>
              Your password has been reset, please check your email
            </div>
            <div class="text-danger" v-show="error">
              {{ error }}
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
  name: "Login",
  data() {
    return {
      form: {
        email: "",
      },
      error: null,
      success: false,
    };
  },
  methods: {
    async login() {
      try {
        const res = await Service.login(this.form);
        if (typeof Storage !== "undefined") {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("user", JSON.stringify(res.data.userobj));
        } else throw new Error("Session Storage Disabled");
        this.$router.push({ path: "/auth/dashboard" });
      } catch (error) {
        console.log(error);
        sessionStorage.clear();
        if (error.response) {
          this.error = error.response.data.message;
        } else this.error = error.message;
      }
    },
    async resetPassword() {
      try {
        await Service.resetUserPassword({ email: this.form.email });
        this.success = true;
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message;
        } else this.error = error.message;
      }
    },
    goSignup() {
      this.$router.push({ path: "/signup" });
    },
  },
};
</script>