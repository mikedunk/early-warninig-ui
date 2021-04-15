<template>
  <div
    class="modal fade"
    id="complaint-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="complaint-modal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <div></div>
          <p class="text-center">
            If you have identified a change while caring for or observing a
            resident please <u>check</u> the change and notify a nurse. Either
            give the nurse a copy of this tool or review it with him/her as soon
            as you can
          </p>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="handleModalClose"
          ></button>
        </div>
        <div class="modal-body">
          <template v-for="complaint in complaints" :key="complaint.id">
            <li>
              <input
                class="form-check-input"
                type="checkbox"
                value="123"
                id="check1"
              />
              <label class="form-check-label" for="check1">
                <!-- <b class="text-danger fs-5">S</b>eems different than usual -->
                {{ complaint.description }}
              </label>
            </li>
          </template>
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
//import Service from "@/apis/services";

export default {
  emits: ["close"],
  name: "ComplaintModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },

    complaints: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {};
  },
  mounted() {
    console.log(this.$props);
    this.modal = new bootstrap.Modal(
      document.getElementById("complaint-modal"),
      {
        keyboard: false,
        backdrop: "static",
      }
    );
  },
  methods: {
    async displayModal() {
      if (this.visible) {
        this.modal.show();
        //  await this.getComplaints();
      }
    },
    hideModal() {
      this.modal.hide();
    },
    handleModalClose() {
      this.$emit("close");
    },
  },
  updated() {
    // console.log("updated: ", this.$props);
    if (this.visible) {
      this.displayModal();
    } else {
      this.hideModal();
    }
  },
  // computed() {
  //   // console.log("updated: ", this.$props);
  //   if (this.visible) {
  //     this.displayModal();
  //   } else {
  //     this.hideModal();
  //   }
  // },
};
</script>



