<template>
  <div
    class="modal fade"
    id="confirm-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="confirm-modal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-sm" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="h6 modal-title">{{ title }}</h2>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="handleModalClose"
          ></button>
        </div>
        <div class="modal-body">
          <div>
            <span
              ><p>
                Are you sure you want to
                <b class="h6" :class="actionColor()">
                  {{ actionText() }}
                </b>
              </p>
              <p class="h6">{{ rand.email }}</p></span
            >
          </div>
          <div class="text-danger" v-show="error">
            {{ error }}
          </div>
        </div>
        <div class="modal-body" v-if="loading">
          <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        </div>

        <div class="modal-footer">
          <button
            @click="sendOkSignal"
            type="button"
            class="btn btn-success text-white"
            :disabled="error"
          >
            Sure
          </button>
          <button
            type="button"
            class="btn btn-link text-gray ms-auto"
            @click="handleModalClose"
          >
            {{ cancelButtonText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import bootstrap from "bootstrap/dist/js/bootstrap";
import Service from "@/apis/services";

export default {
  emits: ["closeConfirmModal", "ok"],
  name: "ConfirmModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    title: {
      type: String,
      default: "Modal Title",
    },
    okButtonText: {
      type: String,
      default: "Sure",
    },
    cancelButtonText: {
      type: String,
      default: "Cancel",
    },
    rand: {
      type: Object,
    },
    action: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
      error: null,
    };
  },
  mounted() {
    this.modal = new bootstrap.Modal(document.getElementById("confirm-modal"), {
      keyboard: false,
      backdrop: "static",
    });
  },
  methods: {
    async displayModal() {
      if (this.visible) {
        this.modal.show();
      }
    },
    hideModal() {
      this.modal.hide();
    },
    handleModalClose() {
      this.error = null;
      this.$emit("closeConfirmModal");
    },
    sendOkSignal() {
      this.error = null;
      switch (this.action) {
        case "resetpassword":
          this.resetPassword();
          break;
        case "changestatus":
          this.changeUserStatus();
          break;

        default:
          break;
      }
    },
    //this.$emits("ok", this.rand);
    actionText() {
      if (this.action === "resetpassword") {
        return " reset the password for";
      } else if (this.action === "changestatus") {
        if (this.rand.is_active === true) {
          return "deactivate";
        } else return "activate";
      } else return "";
    },
    userStatus() {
      if (this.rand.is_active === false) {
        return "Active";
      } else return "Inactive";
    },
    textGuru(text) {
      if (text == true) return "text-success";
      else if (text == false) return "text-danger";
      else "text-primary";
    },

    actionColor() {
      if (this.rand.is_active === true) {
        if (this.action === "resetpassword") {
          return "text-primary";
        } else return "text-danger";
      } else return "text-success";
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

    async resetPassword() {
      this.loading = true;
      try {
        const email = { email: this.rand.email };

        await Service.resetUserPassword(email);
        this.loading = false;
        this.$emit("ok", this.rand);
        this.handleModalClose();
        this.$router.push({ path: "/auth/users" });
      } catch (error) {
        this.loading = false;
        if (error.response) {
          this.error = error.response.data.message;
        } else this.error = error.message;
      }
    },

    async changeUserStatus() {
      this.loading = true;
      const code = this.rand.code;
      try {
        if (this.rand.is_active === true) {
          await Service.deactivateUser(code);
        } else {
          await Service.activateUser(code);
        }
        this.loading = false;
        this.$emit("ok", this.rand);
        this.handleModalClose();
        this.$router.push({ path: "/auth/users" });
      } catch (error) {
        this.loading = false;
        if (error.response) {
          this.error = error.response.data.message;
        } else this.error = error.message;
      }
    },
    status(stat) {
      if (stat == true) {
        return "Active";
      } else return "Inactive";
    },
  },
  updated() {
    if (this.visible) {
      this.displayModal();
    } else {
      this.hideModal();
    }
  },
};
</script>



