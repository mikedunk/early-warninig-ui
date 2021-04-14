<template>
  <nav aria-label="navigation">
    <ul class="pagination mb-0">
      <li class="page-item" :class="{ disabled: isPreviousButtonDisabled }">
        <a @click="previousPage" class="page-link">Previous</a>
      </li>
      <li
        :class="{ active: i === currentPage }"
        class="page-item"
        v-for="i in pages"
        :key="i"
      >
        <a @click="onLoadPage(i)" class="page-link">{{ i }}</a>
      </li>

      <li class="page-item" :class="{ disabled: isNextButtonDisabled }">
        <a @click="nextPage" class="page-link">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  emits: ["nextPage", "previousPage", "loadPage"],

  props: {
    itemsPerPage: {
      type: Number,
      required: true,
    
    },
    currentPage: {
      type: Number,
      required: true,
    
    },
    pages: {
      type: Number,
      required: true,
      
    },
  },
  computed: {
    isPreviousButtonDisabled() {
      return this.currentPage === 1;
    },
    isNextButtonDisabled() {
      return this.currentPage === this.pages;
    },
    onThisPage(i) {
      return i === this.currentPage;
    },
  },
  methods: {
    nextPage() {
      this.$emit("nextPage");
    },
    previousPage() {
      this.$emit("previousPage");
    },
    onLoadPage(value) {
      this.$emit("loadPage", value);
    },
  },
};
</script>