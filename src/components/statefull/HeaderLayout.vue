<template>
  <div class="header-layout">
    <the-header
      :menuTop="menuTop"
      :menu="menu"
    />
  </div>
</template>

<script>
import TheHeader from '@/components/stateless/TheHeader';
import GET_MENU from '@/graphql/menu';

export default {
  name: 'HeaderLayout',

  components: {
    TheHeader,
  },

  data: () => ({
    menuTop: [],
    menu: [],
  }),

  methods: {
    fetchMenu() {
      const vm = this;
      this.$apollo.query({
        query: GET_MENU,
        variables: {
          Id: 19
        }
      })
        .then((res) => {
          vm.menuTop = res.data.menu.menuItems.nodes;
        });

      this.$apollo.query({
        query: GET_MENU,
        variables: {
          Id: 2
        }
      })
        .then((res) => {
          vm.menu = res.data.menu.menuItems.nodes;
        });
    }
  },

  created() {
    this.fetchMenu();
  }
};
</script>
