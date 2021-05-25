<template>
  <!-- Section -->
  <section class="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
    <div class="container">
      <div class="row justify-content-center form-bg-image">
        <div class="col-12 d-flex align-items-center justify-content-center">
          <div class="rounded border-light p-4 p-lg-5 w-100 fmxw-500">
            <!-- <div class="bg-white shadow-soft borderrounded border-light p-4 p-lg-5 w-100 fmxw-500 "></div> -->
            <h1 class="h3 mb-4">Change password</h1>

            <form @submit.prevent="changepwd()">
              <!-- Form -->
              <div class="mb-4">
                <label for="old_password"> Old Password</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><span class="fas fa-unlock-alt"></span
                  ></span>
                  <input
                    type="password"
                    placeholder="Old Password"
                    class="form-control"
                    id="old_password"
                    v-model="form.old"
                    required
                    @click="error = null"
                    autofocus
                  />
                </div>
              </div>

              <!-- End of Form -->
              <!-- Form -->
              <div class="mb-4">
                <label for="new_password">New Password</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><span class="fas fa-unlock-alt"></span
                  ></span>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    class="form-control"
                    id="new_password"
                    v-model="form.new"
                    @click="error = null"
                    required
                  />
                </div>
                <div
                  class="text-danger"
                  v-show="
                    form.new !== '' &&
                    form.confirm !== '' &&
                    form.new !== form.confirm
                  "
                >
                  {{ pwdmismatch }}
                </div>
              </div>
              <!-- End of Form -->
              <!-- Form -->
              <div class="mb-4">
                <label for="confirm_password">Confirm Password</label>
                <div class="input-group">
                  <span class="input-group-text"
                    ><span class="fas fa-unlock-alt"></span
                  ></span>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    class="form-control"
                    id="confirm_password"
                    v-model="form.confirm"
                    @click="error = null"
                    required
                  />
                </div>
              </div>
              <div class="text-danger" v-show="error">
                {{ error }}
              </div>
              <!-- End of Form -->
              <div class="">
                <button
                  type="submit"
                  class="btn btn-dark"
                  :disabled="buttonDisabled"
                  @click="showCoModal"
                >
                  Change password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <CoModal
      :visible="showModal"
      :title="''"
      :hide="hidebuttons"
      :okButtonText="'Change'"
      @closeCoModal="closeCoModal"
      @ok="handleOk"
    >
      <template v-slot:body>
        <div class="modal-body" v-if="!success">
          <div v-if="!loading">
            <p>Are you sure you want to change your password</p>
          </div>
          <div class="loading" v-if="loading">
            <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
          </div>
          <div class="text-danger" v-show="error">
            {{ error }}
          </div>
        </div>
        <div class="modal-body" v-if="success">
          <div class="h1">
            <i class="fa fa-check-circle fa-fw text-success"></i>
          </div>
          <div class="small text-success">
            {{ successMsg.substring(0, 16) }}
          </div>
          <div class="">{{ successMsg.slice(18) }}</div>

          <div>{{ timerCount }}s</div>
        </div>
      </template>
    </CoModal>
  </section>
</template>

<script>
import Service from "@/apis/services";
import CoModal from "../components/CoModal.vue";

export default {
  name: "ChangePwd",
  components: {
    CoModal,
  },
  data() {
    return {
      form: {
        old: "",
        new: "",
        confirm: "",
      },
      error: null,
      pwdmismatch: "Passwords Don't Match",
      showModal: false,
      loading: false,
      hidebuttons: false,
      timerEnabled: false,
      timerCount: 5,
      success: false,
      successMsg: "",
    };
  },
  methods: {
    changepwd() {},

    showCoModal() {
      this.showModal = true;
    },

    closeCoModal() {
      this.showModal = false;
    },

    async handleOk() {
      this.loading = true;
      this.error = null;
      try {
        let res = await Service.changePassword(this.form);
        this.loading = false;
        this.hidebuttons = true;
        this.success = true;
        this.successMsg = res.data.message;
        this.timerEnabled = true;
        sessionStorage.clear();
      } catch (error) {
        this.loading = false;
        if (error.response) {
          this.error = error.response.data.message;
        } else this.error = error.message;
      }
    },
  },
  computed: {
    buttonDisabled() {
      if (this.error !== null || this.form.new !== this.form.confirm) {
        return true;
      } else return false;
    },
  },
  watch: {
    timerEnabled(value) {
      if (value) {
        setTimeout(() => {
          this.timerCount--;
        }, 1000);
      }
    },

    timerCount: {
      handler(value) {
        if (value > 0 && this.timerEnabled) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }
        if (value === 0) {
          this.closeCoModal();
          this.$router.push({ path: "/" });
        }
      },
      immediate: true, // This ensures the watcher is triggered upon creation
    },
  },
};
</script>