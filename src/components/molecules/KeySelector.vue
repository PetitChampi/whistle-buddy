<template>
  <ListDropdown
    :options="keyOptions"
    :defaultSelectedValue="generalParams.key.name.en"
    :closeOnInteraction="true"
    @@optionSelected="chooseKey($event)"
  />
</template>

<script setup lang="ts">
import ListDropdown from "./ListDropdown.vue";
import type { INote, INoteName, IOption } from "@/types/MusicalDataTypes";
import { computed } from "vue";
import { useMusicalDataStore } from "@/stores/musicalData";
import { useParamsStore } from "@/stores/params";
import { storeToRefs } from "pinia";

const musicalDataStore = useMusicalDataStore();
const paramsStore = useParamsStore();
const { notes, defaultKey } = storeToRefs(musicalDataStore);
const { generalParams } = storeToRefs(paramsStore);

const keyOptions = computed<IOption[]>(() => {
  const noteOpts: IOption[] = []; 
  notes.value.forEach(note => {
    note.names.forEach(name => noteOpts.push({
      value: name.en,
      displayValue: name.en.charAt(0).toUpperCase() + name.en.slice(1),
    }))
  });
  return noteOpts;
});

function chooseKey(key: IOption) {
  const note = notes.value.find(note => {
    return note.names.some(name => name.en === key.value);
  }) as INote;

  const noteToKey = {
    absolutePos: note.absolutePos,
    name: note.names.find(name => name.en === key.value) as INoteName
  }

  generalParams.value.key = noteToKey ?? defaultKey.value;
}
</script>