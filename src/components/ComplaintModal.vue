<template>
  <teleport to="body">
    <div ref="modal-backdrop">
      <div class="modal">
        <div
          id="comp"
          role="document"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          Awiwi
        </div>
      </div>
    </div>
  </teleport>
</template>


<script>
import Service from "@/apis/services";
export default {
  emits: ["close"],
  name: "ComplaintModal",
  props: {
    showModal: {
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
    this.getComplaints();
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
  },
};
</script>