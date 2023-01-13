<template>
  <div class="controls">
    <div class="controls-group">
      <div class="controls-group-item">
        <span class="label">Fingerings per page</span>
        <ListDropdown
          class="block"
          :options="fppOptions"
        />
      </div>
      <div class="controls-group-item">
        <span class="label">Fingerings</span>
        <Dropdown>
          <template v-slot:dropdown-title>
            fingerings
          </template>
          <template v-slot:dropdown-content>
            <div class="settings-container">
              double bruh this is a very long dropdown text
            </div>
          </template>
        </Dropdown>
      </div>
      <div class="controls-group-item">
        <span class="label">Flashcard mode</span>
        <SwitchInput v-model="flashcardMode" />
      </div>
    </div>
    <IconButton icon="shuffle" activateOnClick />
  </div>
</template>

<script setup>
import IconButton from "@/components/molecules/IconButton.vue";
import SwitchInput from "@/components/molecules/SwitchInput.vue";
import Dropdown from "@/components/molecules/Dropdown.vue";
import ListDropdown from "@/components/molecules/ListDropdown.vue";
import { ref } from "@vue/reactivity";

const fppOptions = ref([
  { value: "6", displayValue: "6" },
  { value: "10", displayValue: "10" },
  { value: "12", displayValue: "12" },
  { value: "14", displayValue: "All (14)" },
]);

const flashcardMode = ref(false);
</script>

<style lang="scss" scoped>
.controls {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  &-group {
    display: flex;
    gap: 20px;

    &-item {
      .label {
        display: block;
        margin-bottom: 10px;
        font-size: .875rem;
      }
      .block {
        display: block;
      }
    }
  }
}
</style>