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
        <div class="modal-header" v-if="!hide">
          <h2 class="h6 modal-title">{{ title }}</h2>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="handleModalClose"
          ></button>
        </div>
        <div class="modal-body">
          <slot name="body"> default body </slot>
          <div class="text-danger" v-show="error">
            {{ error }}
          </div>
        </div>
        <div class="modal-body" v-if="loading">
          <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        </div>

        <div class="modal-footer" v-if="!hide">
          <button
            @click="sendOkSignal"
            type="button"
            class="btn btn-success text-white"
            :disabled="error"
          >
            Yes
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
  emits: ["closeCoModal", "ok"],
  name: "CoModal",
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
    },
    hide: {
      type: Boolean,
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
      this.$emit("closeCoModal");
    },
    sendOkSignal() {
      this.$emit("ok");
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



