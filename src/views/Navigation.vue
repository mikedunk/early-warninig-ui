<template>
  <body>
    <nav class="navbar navbar-dark navbar-theme-primary px-4 col-12 d-md-none">
      <div class="d-flex align-items-center">
        <button
          class="navbar-toggler d-md-none collapsed"
          type="button"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
          :class="{ collapsed: !turnOffShow }"
          @click="turnOffShow = true"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
    <nav
      id="sidebarMenu"
      class="sidebar d-md-block bg-dark text-white collapse"
      :class="{ show: turnOffShow }"
      data-simplebar
    >
      <div class="sidebar-inner px-4 pt-3">
        <div
          class="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4"
        >
          <!-- <div class="d-flex align-items-center"> -->
          <!-- <div class="user-avatar lg-avatar me-4">
            <img src="../../assets/img/team/profile-picture-3.jpg" class="card-img-top rounded-circle border-white"
              alt="Bonnie Green">
          </div> -->
          <!-- <div class="d-block">
            <h2 class="h6">Hi, Jane</h2>
            <a href="../../pages/examples/sign-in.html" class="btn btn-secondary text-dark btn-xs"><span
                class="me-2"><span class="fas fa-sign-out-alt"></span></span>Sign Out</a>
          </div> -->
          <!-- </div> -->
          <div class="collapse-close d-md-none" @click="turnOffShow = false">
            <a
              class="fas fa-times"
              aria-controls="sidebarMenu"
              aria-expanded="true"
              aria-label="Toggle navigation"
              @click="turnOffShow = false"
            ></a>
          </div>
        </div>
        <ul class="nav flex-column pt-3 pt-md-0">
          <li class="nav-item">
            <span class="sidebar-icon">
              <!-- <img src="../../assets/img/brand/dark.svg" height="20" width="20" alt="Volt Logo"> -->
            </span>
            <span class="mt-1 ms-1 sidebar-text">
              <h5>Early Warning Tool</h5>
            </span>
          </li>
          <div>
            <li class="nav nav-item">
              <router-link
                class="nav-link"
                to="/auth/dashboard"
                @click="turnOffShow = false"
              >
                <span class="sidebar-icon">
                  <span class="fas fa-chart-pie"></span>
                </span>
                <span class="sidebar-text">Dashboard</span>
              </router-link>
            </li>
          </div>
          <div>
            <li class="nav-item">
              <span
                class="nav-link d-flex justify-content-between align-items-center"
                :class="{ collapsed: !collapseMenu }"
                @click="toggle()"
              >
                <span>
                  <span class="sidebar-icon"
                    ><span class="fas fa-users "></span
                  ></span>
                  <span class="sidebar-text">Users</span>
                </span>
                <span class="link-arrow"
                  ><span class="fas" :class="selIcon"></span
                ></span>
              </span>
              <div
                class="multi-level collapse"
                role="list"
                id="user-menu"
                aria-expanded="false"
                :class="{ show: !collapseMenu }"
              >
                <ul class="d-flex nav">
                  <li class="nav-item">
                    <router-link class="nav-link" to="/auth/users">
                      <span class="sidebar-icon">
                        <span class="fas  fa-user"></span>
                      </span>
                      <span class="sidebar-text">View Users</span>
                    </router-link>
                  </li>
                  <li class="nav-item">
                    <router-link class="nav-link" to="/auth/users/new">
                      <span class="sidebar-icon">
                        <span class="fas   fa-user-plus"></span>
                      </span>
                      <span class="sidebar-text">New User</span>
                    </router-link>
                  </li>
                </ul>
              </div>
            </li>
          </div>
          <div
            v-if="usertype == 'admin' || usertype == 'care_giver'"
            @click="turnOffShow = false"
          >
            <li class="nav nav-item">
              <router-link class="nav-link" to="/auth/mycomplaints">
                <span class="sidebar-icon"
                  ><span class="fas fa-list"></span
                ></span>
                <span class="sidebar-text">My Complaints </span>
              </router-link>
            </li>
          </div>
          <div
            v-if="usertype == 'admin' || usertype == 'nurse'"
            @click="turnOffShow = false"
          >
            <li class="nav nav-item">
              <router-link class="nav-link" to="/auth/pendingcomplaints">
                <span class="sidebar-icon"
                  ><span class="fas fa-edit"></span
                ></span>
                <span class="sidebar-text">Pending Complaints </span>
              </router-link>
            </li>
          </div>

          <div
            v-if="usertype == 'admin' || usertype == 'nurse'"
            @click="turnOffShow = false"
          >
            <li class="nav nav-item">
              <router-link class="nav-link" to="/auth/treatedcomplaints">
                <span class="sidebar-icon">
                  <span class="fas fa-check-circle"></span>
                </span>
                <span class="sidebar-text">Treated Complaints</span>
              </router-link>
            </li>
          </div>

          <li class="nav nav-item">
            <router-link
              class="nav-link btn btn-secondary d-flex align-items-center justify-content-center btn-upgrade-pro"
              to="/"
            >
              <span class="sidebar-icon">
                <span class="fas fa-rocket me-2"></span>
              </span>
              <span @click="logout">Logout</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <router-view />
  </body>
</template>


<script>
export default {
  name: "Navigation",
  data() {
    return {
      usertype: null,
      turnOffShow: false,
      collapseMenu: true,
    };
  },
  mounted() {
    const user_ = JSON.parse(sessionStorage.user);
    this.usertype = user_.role;
  },
  methods: {
    logout() {
      try {
        sessionStorage.clear();
        this.$router.push({ path: "/" });
      } catch (error) {
        sessionStorage.clear();
        this.$router.push({ path: "/" });
        console.log(error);
      }
    },
    toggle() {
      this.collapseMenu = !this.collapseMenu;
      if (this.collapseMenu === true) {
        this.selIcon = "fa-chevron-right";
      } else this.selIcon = "fa-chevron-down";
    },
  },
  computed: {
    selIcon() {
      if (this.collapseMenu) {
        return "fa-chevron-right";
      } else return "fa-chevron-down";
    },
  },
};
</script>