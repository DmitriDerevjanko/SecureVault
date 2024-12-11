<template>
  <PeopleDataList :title="title" />
</template>

<script setup lang="ts">
import PeopleDataList from '@/components/PeopleDataList.vue';

defineProps<{ title: string }>();
</script>
