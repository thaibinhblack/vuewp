<template>
<div class="app">
    <header-layout />
    <router-view />
</div>
</template>

<script>
import HeaderLayout from '@/components/statefull/HeaderLayout';

export default {
  name: 'App',

  components: {
    HeaderLayout,
  },
};
</script>

<style lang="scss">

</style>
