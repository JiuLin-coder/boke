<template></template>

<style></style>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    fetch("http://localhost:3000/", {
      method: "POST",
      body: JSON.stringify({ date: [1, 2, 3] }),
      headers: { "Content-Type": "application/json" },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  },
  methods: {},
};
</script>
