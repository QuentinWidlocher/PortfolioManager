import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#48ade0',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
});
