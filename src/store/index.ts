import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist'
import base from './base';

const vuexPersist = new VuexPersist({
  key: 'workalongo-extension',
  storage: window.localStorage,
  modules: ['base'],
})

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    plugins: [vuexPersist.plugin],
    modules: {
      base
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV === 'true',
  })

  return Store
}
