<template>
<div class="app">
    <router-view />
</div>
</template>

<script>
import {
  ALL_POSTS
} from '@/graphql/allPost';

export default {
  name: 'App',

  created() {
    this.$apollo.query({
      query: ALL_POSTS
    });
  }
};
</script>
