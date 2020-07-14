<template>
  <p class="data_link">{{localeDate}}</p>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { toLocaleDate } from "@/utils/date";

@Component
export default class LocaleDate extends Vue {
  @Prop({ required: true }) date!: string;

  get localeDate() {
    return toLocaleDate(this.date);
  }
}
</script>
