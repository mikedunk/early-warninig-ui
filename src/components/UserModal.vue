<template>
  <div
    class="modal fade"
    id="user-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="user-modal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="h6 modal-title align-content-center">{{ title }}</h2>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="handleModalClose"
          ></button>
        </div>
        <slot name="body">
          <div class="modal-body">
            <p>
              Name :

              <b> {{ getFullName() }}</b>
            </p>
            <p>
              Email :

              <b> {{ rand.email }}</b>
            </p>
            <p>
              Role :

              <b class="fw-normal" :class="roleGuru()"> {{ getRole() }}</b>
            </p>
            <p>
              Status :

              <b :class="textGuru(rand.is_active)">
                {{ status(rand.is_active) }}</b
              >
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              @click="handleSubmit"
            >
              {{ okButtonText }}
            </button>
            <button
              type="button"
              class="btn btn-link text-gray ms-auto"
              @click="handleModalClose"
            >
              {{ cancelButtonText }}
            </button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>


<script>
import bootstrap from "bootstrap/dist/js/bootstrap";

export default {
  emits: ["closeUserModal"],
  name: "UserModal",
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
      default: "Ok",
    },
    cancelButtonText: {
      type: String,
      default: "Close",
    },
    rand: {
      type: Object,
    },
  },

  data() {
    return {};
  },
  mounted() {
    this.modal = new bootstrap.Modal(document.getElementById("user-modal"), {
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
      this.$emit("closeUserModal");
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

    roleGuru() {
      if (this.rand.Role == undefined) {
        return "text-primary";
      }
      switch (this.rand.Role.name) {
        case "admin":
          return "text-danger";
        case "nurse":
          return "text-secondary";
        case "care_giver":
          return "text-info";

        default:
          return "text-primary";
      }
    },
    status(stat) {
      if (stat == true) {
        return "Active";
      } else return "Inactive";
    },
    getRole() {
      if (this.rand.Role == undefined) {
        return "Role not available";
      } else return this.rand.Role.description;
    },
    getFullName() {
      if (
        this.rand.first_name == undefined ||
        this.rand.last_name == undefined
      ) {
        return "Name not available";
      }
      return (
        this.rand.first_name.charAt(0).toUpperCase() +
        this.rand.first_name.slice(1) +
        " " +
        this.rand.last_name.charAt(0).toUpperCase() +
        this.rand.last_name.slice(1)
      );
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



