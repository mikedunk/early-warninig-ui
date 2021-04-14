<template>
  <!-- Section -->
  <section class="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
    <div class="container">
      <div
        class="row justify-content-center form-bg-image"
        data-background-lg="some-background-svg"
      >
        <div class="col-12 d-flex align-items-center justify-content-center">
          <div
            class="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500"
          >
            <div class="text-center text-md-center mb-4 mt-md-0">
              <h1 class="mb-0 h3">Login to the platform</h1>
            </div>
            <form class="mt-4" @submit.prevent="login">
              <!-- Form -->
              <div class="form-group mb-4">
                <label for="email">Your Email</label>
                <div class="input-group">
                  <span class="input-group-text" id="basic-addon1"
                    ><span class="fas fa-user"></span
                  ></span>
                  <input
                    type="username"
                    class="form-control"
                    placeholder="email"
                    id="username"
                    autofocus
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
                    <span class="input-group-text" id="basic-addon2"
                      ><span class="fas fa-unlock-alt"></span
                    ></span>
                    <input
                      type="password"
                      placeholder="password"
                      class="form-control"
                      id="password"
                      required
                      v-model="form.password"
                      @click="error = null"
                    />
                  </div>

                  <div class="text-danger" v-if="error">
                    {{ error }}
                  </div>
                </div>
                <!-- End of Form -->
              </div>
              <div class="d-grid">
                <button class="btn btn-dark">Login</button>
              </div>

            </form>

            <div class="d-flex justify-content-center align-items-center mt-4">
              <span class="fw-normal">
                Not registered?
                <router-link class="fw-bold" to="/signup">
                  Create account
                </router-link>
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
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      error: null,
    };
  },
  methods: {
     async login() {
      try {
        const res = await Service.login(this.form);
        if (typeof Storage !== "undefined") {
          sessionStorage.setItem("token", res.data.token);
          sessionStorage.setItem("user",JSON.stringify(res.data.userobj));
        } else throw new Error("Session Storage Disabled");

        console.log(sessionStorage.user)
        console.log(sessionStorage.token)
        this.$router.push({path : "/user/dashboard"})
      } catch (error) {
        console.log(error);
        sessionStorage.clear()
        this.error = error.response.data.message; //"Invalid Login Credentials"
      }
    },
    goSignup(){
       this.$router.push({path : "/signup"})

    }
  },
};
</script>