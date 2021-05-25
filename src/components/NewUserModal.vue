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
        <div class="modal-body">
          <slot name="body"> default body </slot>
        </div>
        <div class="modal-footer" >
          <button type="button" class="btn btn-secondary" @click="handleSubmit">
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
      </div>
    </div>
  </div>
</template>


<script>
import bootstrap from "bootstrap/dist/js/bootstrap";
export default {
  emits: ["closeUserModal", "submitData"],
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
    rand:{
        type:Object
    }
  },
  data() {
    return {
      complaints: "",
    };
  },
  mounted() {
    this.modal = new bootstrap.Modal(document.getElementById("user-modal"), {
      keyboard: false,
      backdrop:'static'
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
    handleSubmit(){
        this.$emit("submitData");
    }
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

