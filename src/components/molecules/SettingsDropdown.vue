<template>
  <Dropdown>
    <template v-slot:dropdown-title>
      <span class="icon-settings"></span>
    </template>
    <template v-slot:dropdown-content>
      <div class="settings-container">
        <SettingsGroup
          title="The title"
          subtitle="The subtitle that is longer"
          hasCheckbox
          accordion
        >
          <template v-slot:content>
            bruhh
          </template>
        </SettingsGroup>
      </div>
    </template>
  </Dropdown>
</template>

<script setup>
import Dropdown from "@/components/molecules/Dropdown.vue";
import SettingsGroup from "@/components/SettingsGroup.vue";
</script>

<style lang="scss" scoped>
.icon-settings {
  font-size: 1.25rem;
}
.settings-container {
  padding: 20px 20px 30px 30px;
  width: 300px;
  max-width: 100%;
}
</style>