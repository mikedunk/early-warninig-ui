<template>
  <div
    class="modal fade"
    id="modal-default"
    tabindex="-1"
    role="dialog"
    aria-labelledby="modal-default"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="h6 modal-title">Terms of Service</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ fondle }}
          <p>
            With less than a month to go before the European Union enacts new
            consumer privacy laws for its citizens, companies around the world
            are updating their terms of service agreements to comply.
          </p>
          <p>
            The European Union’s General Data Protection Regulation (G.D.P.R.)
            goes into effect on May 25 and is meant to ensure a common set of
            data rights in the European Union. It requires organizations to
            notify users as soon as possible of high-risk data breaches that
            could personally affect them.
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary">Accept</button>
          <button
            type="button"
            class="btn btn-link text-gray ms-auto"
            data-bs-dismiss="modal"
            @click="closeinside()"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>








<script>
import Service from "@/apis/services";
export default {
  emits: ["finsih"],
  props: {
    fondle: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
        complaints:[]
    };
  },
  name: "DisplayModal",
   mounted() {
    this.getComplaints();
  },

  methods: {
    closeinside() {
      console.log("modal dismissed");
      this.$emit("finsih");
    },
    async getComplaints() {
      try {
        const complaints = await Service.getComplaints();
        this.complaints = complaints.data;
        console.log(complaints.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>