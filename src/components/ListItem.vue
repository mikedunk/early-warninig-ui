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
      <div class="btn-group dropstart">
        <button
          class="btn btn-link text-dark dropdown-toggle dropdown-toggle-split m-0 p-0"
          aria-haspopup="true"
          aria-expanded="false"
          @click="showOptions"
        >
          <span class="icon icon-sm pt-1"
            ><span class="fas fa-ellipsis-h icon-dark"></span> </span
          ><span class="sr-only">Toggle Dropdown</span>
        </button>
        <div class="dropdown-menu py-0" :class="{ show: showFor }">
          <button class="dropdown-item rounded-top" @click="confirm('resetpassword')">
            <span class="fas fa-user-shield me-2"></span> Reset Password
          </button>
          <button class="dropdown-item" @click="showModal()">
            <span class="fas fa-eye me-2"></span>View Details
          </button>
          <button
            v-if="user.is_active === true"
            class="dropdown-item text-danger rounded-bottom"
            @click="confirm('changestatus')"
          >
            <span class="fas fa-user-times me-2"></span>{{ checkStatus() }}
          </button>
          <button
            v-if="user.is_active === false"
            class="dropdown-item text-success rounded-bottom"
            @click="confirm('changestatus')"
          >
            <span class="fas fa-user-plus me-2"></span>{{ checkStatus() }}
          </button>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  components: {},
  name: "ListItem",
  emits: ["showMod", "showCModal","thisuser"],
  props: {
    user: {
      type: Object,
      required: true,
    },
    ind: {
      type: Number,
      required: true,
    },
    active: {
      type: Boolean,
      required: false,
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
      this.$emit('thisuser',this.user)
    },

    showModal() {
      this.showFor = false;
      this.$emit("showMod", this.user);
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
 
    confirm(action) {
      this.showFor = false;
      this.$emit("showCModal", action);
     
    },

    checkStatus() {
      if (this.user.is_active === false) {
        return "Activate";
      } else return "Deactivate";
    },
  },
};
</script>