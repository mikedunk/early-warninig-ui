<template>

  <div
    class="modal fade"
    id="display-modal"
    tabindex="-1"
    role="dialog"
    data-bs-backdrop="static" 
    aria-labelledby="display-modal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="h6 modal-title">Details</h2>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="handleModalClose"
          ></button>
        </div>
        <div class="modal-body">
          <p>
            Content of this complaint
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary">Create</button>
          <button
            type="button"
            class="btn btn-link text-gray ms-auto"
            @click="handleModalClose"
          >
            Close
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
  emits: ["close"],
  name: "displaymodal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      complaints: "",
    };
  },
  mounted() {
    console.log(this.$props)
    this.modal = new bootstrap.Modal(document.getElementById('display-modal'), {
      keyboard: false
    })
  },
  methods: {
    async getComplaints() {
      try {
        const complaints = await Service.getComplaints();
        this.complaints = complaints.data;
        console.log(complaints.data);
      } catch (error) {
        console.log(error);
      }
    },
    async displayModal() {
      if (this.visible) {
        this.modal.show();
        await this.getComplaints();
      }
    },
    hideModal() {
      this.modal.hide();
    },
    handleModalClose() {
      this.$emit("close");
    }
  },
  updated() {
    console.log("updated: ", this.$props)
    if(this.visible) {
      this.displayModal();
    } else {
      this.hideModal();
    }
  }
};
</script>



