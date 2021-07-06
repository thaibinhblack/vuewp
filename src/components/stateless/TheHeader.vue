<template>
  <div class="the-header">
    <div class="the-header__top">
      <div class="page-max-container">
        <div class="the-header__container row">
          <div class="col-12 col-md-4">
            <ul class="the-header__menu-top menu">
                <li
                  v-for="(menu, index) in menuTop"
                  :key="index"
                  class="the-header__menu-item"
                >
                  <router-link
                    class="--txt-small --txt-link"
                    :to="menu.path"
                  >
                    {{ menu.label }}
                  </router-link>
                </li>
              </ul>
          </div>
          <div class="col-12 col-md-4">
            <div class="the-header__logo-container --txt-center">
              <router-link to="/">
                <img
                  v-img="srcLogo"
                  alt="logo"
                  class="the-header__logo"
                />
              </router-link>
            </div>
          </div>

          <div class="col-12 col-md-4">
            <ul class="the-header__menu-top --right menu">
              <li class="the-header__menu-item">
                <router-link class="--txt-small --txt-link" to="/">VI</router-link>
              </li>
              <li>/</li>
              <li class="the-header__menu-item">
                <router-link class="--txt-small --txt-link" to="#">EN</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="the-header__main">
      <div class="container">
        <div class="row">
            <ul class="the-header__menu-main menu col-12">
              <li
                class="the-header__menu-item"
                v-for="(item, index) in menu"
                :key="index"
              >
                <router-link
                  class="--txt-link --white"
                  :to="item.path"
                >
                  {{ item.label }}
                </router-link>
                <ul
                  class="the-header__menu-sub"
                  v-if="item.childItems.nodes.length > 0"
                >
                  <li
                    class="the-header__menu-item-sub"
                    v-for="(sub, index) in item.childItems.nodes" :key="index"
                  >
                    <router-link class="--link --txt-link" :to="sub.path">
                      {{ sub.label }}
                    </router-link>
                  </li>
                </ul>
              </li>
            </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import srcLogo from '@/assets/images/logo.png';

export default {
  name: 'TheHeader',

  props: {
    menu: {
      type: Array,
      default: () => [],
    },

    menuTop: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    srcLogo,
  })
};
</script>

<style lang="scss">
.the-header {
  $this: &;

  background-color: #fff;

  &__top {
    padding: fn.rem(15) 0;
  }

  &__main {
    padding: fn.rem(10) 0;
    background-color: colors.$color-the-header-main-bg;
  }

  &__menu-item {
    padding: fn.rem(5) fn.rem(20);
    position: relative;
    margin-bottom: fn.rem(3);

    &:hover {
      #{$this}__menu-sub {
        top: 100%;
        opacity: 1;
      }
    }
  }

  &__menu-sub {
    position: absolute;
  }

  &__menu-top {
    width: 100%;
    justify-content: left;

    &.\--right {
      justify-content: flex-end;
    }
  }

  &__menu-main {
    justify-content: space-between;
    color: colors.$color-the-header-main-txt;
  }

  &__menu-sub {
    position: absolute;
    transition: all 0.5s ease-in;
    top: 200%;
    min-width: fn.rem(200);
    background-color: colors.$color-the-header-main-bg-sub;
    z-index: 2;
    color: colors.$color-the-header-main-sub-txt;
    border: 1px solid colors.$color-the-header-main-sub-txt;
    display: flex;
    flex-wrap: wrap;
    opacity: 0;
  }

  &__menu-item-sub {
    padding: fn.rem(15);
    display: block;
    width: 100%;
  }

  &__logo {
    margin: auto;
    width: auto;
    max-height: fn.rem(65);
  }
}
</style>
