<template>
  <div
    class="modal fade"
    id="complaint-modal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="complaint-modal"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="h6 modal-title">Early Warning Tool</h2>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="handleModalClose"
          ></button>
        </div>

        <div class="modal-body" v-if="!turnOnScanner">
          <form @submit.prevent="lodge">
            <p class="text-center">
              If you have identified a change while caring for or observing a
              resident please <u>check</u> the change and notify a nurse. Either
              give the nurse a copy of this tool or review it with him/her as
              soon as you can
            </p>
            <ul class="list-group">
              <li
                class="list-group-item d-flex align-items-start"
                v-for="comp in complaint"
                :key="comp.id"
              >
                <input
                  type="checkbox"
                  :id="comp.tag"
                  :checked="comp.checked"
                  :value="comp"
                  class="form-check-input"
                  v-model="form.complaint"
                  @click="error = null"
                />
                <label class="form-check-label" :for="comp.tag">
                  <b class="text-danger fs-5">{{
                    comp.description.charAt(0)
                  }}</b
                  >{{ comp.description.substring(1) }}
                </label>
                <p></p>
              </li>
            </ul>
            <div class="row">
              <div>
                <div>
                  <label for="resident_name">Resident's Name</label>
                  <div class="input-group">
                    <button class="input-group-text" @click="toggleScanner">
                      <span class="fa fa-camera"></span>
                    </button>
                    <input
                      ref="res_name"
                      class="form-control"
                      id="resident_name"
                      :autofocus="shouldFocus"
                      type="text"
                      placeholder="Enter resident's name"
                      required
                      v-model="form.resident_name"
                      @click="error = null"
                    />
                  </div>
                </div>
                <div>
                  <p></p>
                </div>

                <div>
                  <label for="reported_to">Reported to</label>
                  <input
                    class="form-control"
                    id="reported_to"
                    type="text"
                    placeholder="Start typing a nurse's name"
                    v-model="form.reported_to"
                    @click="error = null"
                  />
                </div>
                <div>
                  <label for="full_name">Your Name</label>
                  <input
                    class="form-control"
                    id="full_name"
                    :value="full_name"
                    type="text"
                    required
                    disabled
                  />
                </div>
              </div>
            </div>
          </form>
          <div class="text-danger" v-show="error">
            {{ error }}
          </div>
        </div>
        <div class="modal-footer" v-if="!turnOnScanner">
          <button
            type="button"
            class="btn btn-secondary"
            @click="lodge"
            :disabled="buttonDisabled"
          >
            Create
          </button>

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
    <!-- <SearchAutocomplete 
    @suggestions=nurses
    @selection=values
    
    /> -->
    <StreamBarcodeReader
      v-if="turnOnScanner"
      @decode="onDecode"
      @loaded="onLoaded"
    ></StreamBarcodeReader>
  </div>
</template>





<script>
import bootstrap from "bootstrap/dist/js/bootstrap";
import StreamBarcodeReader from "./StreamBarcodeReader.vue";
import Service from "@/apis/services";
//import SearchAutocomplete from "./SearchAutocomplete.vue";

export default {
  components: { StreamBarcodeReader },
  emits: ["close"],
  name: "ComplaintModal",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },

    complaint: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      lodgedComplaints: [],
      form: {
        complaint: [],
        resident_name: "",
        reported_to: "",
      },
      full_name: "",
      error: "",
      nurses: [],
      value: "",
      turnOnScanner: false,
      shouldFocus: false,
      restag: null,
      modal: null,
    };
  },
  mounted() {
    this.modal = new bootstrap.Modal(
      document.getElementById("complaint-modal"),
      {
        keyboard: false,
        backdrop: "static",
      }
    );

    const user = JSON.parse(sessionStorage.user);
    this.full_name = user.lastName + " " + user.firstName;
  },

  methods: {
    toggleScanner() {
      this.turnOnScanner = !this.turnOnScanner;
    },
    async displayModal() {
      if (this.visible) {
        this.modal.show();
      }
    },
    hideModal() {
      this.modal.hide();
      this.turnOnScanner = false;
    },
    handleModalClose() {
      this.form.complaint = [];
      this.$emit("close");
      this.turnOnScanner = false;
    },
    async lodge() {
      try {
        await Service.raiseNewComplaint(this.form);
        console.log(this.form);
        this.form = {};
        this.handleModalClose();
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message;
        } else this.error = error.message;
      }
    },
    async getNurses() {
      try {
        const nurses = await Service.getNurses();
        this.nurses = nurses.data.nurses;
      } catch (error) {
        if (error.response) {
          this.error = error.response.data.message;
        } else this.error = error.message;
      }
    },
    onDecode(result) {
      this.turnOnScanner = false;
      this.form.resident_name = result;
      this.shouldFocus = true;
    },
    onError(result) {
      console.log(result);
      this.turnOnScanner = false;
    },
  },

  updated() {
    if (this.visible) {
      this.displayModal();
    } else {
      this.hideModal();
    }
  },
  computed: {
    buttonDisabled() {
      if (this.error !== null || this.form.resident_name == null) {
        return true;
      } else return false;
    },
  },
};
</script>



