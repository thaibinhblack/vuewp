import VueI18n from 'vue-i18n';
import Vue from 'vue';
import vi from '@/i18n/locales/vi';

Vue.use(VueI18n);

const messages = {
  vi,
};

const i18n = new VueI18n({
  locale: 'vi',
  messages,
});

export default i18n;
