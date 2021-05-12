<template>
  <tr>
    <td class="fw-bold">
      {{ user.first_name.charAt(0).toUpperCase()
      }}{{ user.first_name.substring(1) }}
    </td>
    <td class="fw-normal">
      {{ user.last_name.charAt(0).toUpperCase()
      }}{{ user.last_name.substring(1) }}
    </td>
    <td class="fw-normal">
      {{ user.email }}
    </td>
    <td class="fw-normal" :class="roleGuru(user.Role.name)">
      {{ user.Role.description }}
    </td>
    <td class="fw-normal" :class="textGuru(user.is_active)">
      {{ status(user.is_active) }}
    </td>
    <td>
      <div class="btn-group">
        <button
          class="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
          @click="showOptions()"
        >
          <span class="icon icon-sm pt-1"
            ><span class="fas fa-ellipsis-h icon-dark"></span> </span
          ><span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu" :class="{ show: showFor }">
          <a class="dropdown-item rounded-top" href="#"
            ><span class="fas fa-user-shield me-2"></span> Reset Pass</a
          >
          <a class="dropdown-item" href="#"
            ><span class="fas fa-eye me-2"></span>View Details</a
          >
          <a class="dropdown-item text-danger rounded-bottom" href="#"
            ><span class="fas fa-user-times me-2"></span>Suspend</a
          >
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  name: "ListItem",
  emits: ["action"],
  props: {
    user: {
      type: Object,
      required: true,
    },
    ind: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      showFor: false,
    };
  },

  methods: {
    showOptions() {
      this.showFor = !this.showFor;
    },
    showGModal(item) {
      this.randomUser = item;
      this.showUserModal = true;
    },
    closeGModal() {
      this.showUserModal = false;
    },
    textGuru(text) {
      if (text == true) return "text-success";
      else if (text == false) return "text-danger";
      else "text-primary";
    },
    status(stat) {
      if (stat == true) {
        return "Active";
      } else return "Inactive";
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
    handleModalClose() {
      this.form.complaint = [];
      this.$emit("action");
    },
  },
};
</script>