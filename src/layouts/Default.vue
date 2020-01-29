<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="glossy bg-grey-1">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDawer()"
          @hide="toggleLeftDawer()"
          class="text-primary"
          aria-label="Menu"
          icon="mdi-menu"
        />

        <q-toolbar-title>
          <img src="statics/logo.png" class="logo" />
        </q-toolbar-title>

        <div class="text-primary">Beta</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>
        <q-item to="/" exact>
          <q-item-section avatar>
            <q-icon name="mdi-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/about" exact>
          <q-item-section avatar>
            <q-icon name="mdi-information-outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>About</q-item-label>
          </q-item-section>
        </q-item>

        <!-- Feedback -->
        <q-item>
          <q-item-side icon="mdi-bullhorn"></q-item-side>
          <q-item-main>
            <span @click="openFeedback()">
              FEEDBACK
            </span>
          </q-item-main>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'LayoutDefault',
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters({
      loading: 'base/getLoading',
      error: 'base/getError',
      // leftDrawerOpen: 'base/getLeftDrawerOpen',
    }),
    leftDrawerOpen: {
      get() {
        return this.$store.getters['base/getLeftDrawerOpen'];
      },
      set() {
        this.$store.dispatch('base/toggleLeftDrawerOpen');
      },
    },
  },
  methods: {
    toggleLeftDawer() {
      this.$store.dispatch('base/toggleLeftDrawerOpen');
    },

    openFeedback() {
      this.$store.commit('base/setLeftDrawerOpen', false);
      const feedbackBtn = document.getElementById('_buglog-btn');
      if (feedbackBtn) {
        feedbackBtn.click();
      }
    },
  },
});
</script>

<style scoped lang="scss">
.logo {
  max-width: 180px;
}
</style>