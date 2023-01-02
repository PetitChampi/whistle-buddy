<template>
  <Dropdown>
    <template v-slot:dropdown-title>
      <span class="icon-settings"></span>
    </template>
    <template v-slot:dropdown-content>
      <div class="settings-container">
        double bruh
      </div>
    </template>
  </Dropdown>
</template>

<script setup>
import Dropdown from "@/components/molecules/Dropdown.vue";
</script>

<style lang="scss" scoped>
.icon-settings {
  font-size: 1.25rem;
}
.settings-container {
  padding: 20px 20px 30px 30px;
}
</style>