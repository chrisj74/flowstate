<template>
  <q-page>
    <div class="tab-wrapper flex" v-show="!showAddTab">
      <vue-tabs-chrome ref="activeTab" v-model="activeTab" :tabs="tabs" insert-to-after />
      <i class="mdi mdi-plus add-tab self-center" @click="onAddTab(true)"></i>
    </div>
    <div class="tab-content">
      <template v-for="(tab, index) in tabs">
        <div :key="tab.key" v-show="tab.type === tabTypes.WEB && tab.key === activeTab && !showAddTab">
          <iframe
            :src="tab.url"
            :name="'workalongoIframe' + index"
            class="tab-iframe"
            sandbox="allow-forms allow-modals allow-popups allow-scripts allow-same-origin"
            ></iframe>
          <div class="tab-iframe-footer">
            <q-btn color="secondary" @click="openMainWindow(tab.url)">Open in main window</q-btn>
          </div>
        </div>
      </template>
      <div v-if="showAddTab" class="new-tab q-pa-md ">
        <div class="row justify-between items-start">
          <h3 class="text-h6">Add Tab To Space</h3>
          <q-btn flat round icon="mdi-close" @click="onAddTab(false)"></q-btn>
        </div>
        <div class="row items-start q-gutter-md">
          <q-card class="col-grow bg-white">
            <q-card-section class="bg-primary text-white">
              <div class="text-h6">Add web page</div>
            </q-card-section>

            <q-separator dark />

            <q-card-section>
              <q-btn @click="setCurrentTab()" color="secondary" v-if="lastFocusedTabUrl">Use main tab</q-btn>
              <q-input v-model="newTabUrl" color="secondary" label="Enter web address" />
              <q-input v-model="newTabLabel" color="secondary" label="Enter short label" />
            </q-card-section>

            <q-separator dark />

            <q-card-actions align="right">
              <q-btn @click="addTab()" color="secondary" :disabled="!newTabUrl || !newTabLabel">Add</q-btn>
            </q-card-actions>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script lang="ts">
export enum tabTypes {
  WEB = 'web',
}

import Vue from 'vue';
import { uuid } from 'uuidv4';

export default Vue.extend ({
  name: 'Home',
  data() {
    return {
      showAddTab: false,
      tabTypes: tabTypes,

      lastFocusedTabUrl: null,
      lastFocusedTabFavicon: null,
      lastFocusedTabLabel: null,
      lastFocusedWindowId: 0,

      newTabUrl: null,
      newTabFavicon: null,
      newTabLabel: null,

      activeTab: 'google',
      tabs: [
        {
          label: 'Google',
          key: 'google',
          type: 'web',
          url: 'https://www.google.com'
        },
        {
          label: 'Stack overflow',
          key: 'so',
          type: 'web',
          url: 'https://www.stackoverflow.com'
        },
      ]
    };
  },
  methods: {
    onAddTab(show: boolean) {
      this.newTabUrl = null;
      this.newTabFavicon = null;
      this.newTabLabel = null;
      this.showAddTab = show;
      this.getCurrentTab();
    },

    getCurrentTab() {
      if (window.chrome) {
        const _this = this;
        window.chrome.runtime.sendMessage({ type: 'getLastFocused' }, (res: any) => {
          this.lastFocusedTabUrl = res.lastFocusedTabUrl;
          this.lastFocusedTabFavicon = res.lastFocusedTabFavicon;
          this.lastFocusedTabLabel = res.lastFocusedTabLabel;
          this.lastFocusedWindowId = res.lastFocusedWindowId;
        });
      }
    },

    setCurrentTab() {
      this.newTabUrl = this.lastFocusedTabUrl;
      this.newTabFavicon = this.lastFocusedTabFavicon;
      this.newTabLabel = this.lastFocusedTabLabel;
    },

    addTab() {
      const newKey: any = uuid();
      const newTab: any = {
        label: this.newTabLabel,
        key: newKey,
        type: 'web',
        url: this.newTabUrl,
      };

      if (this.newTabFavicon) {
        newTab['favico'] = this.newTabFavicon;
      }

      const newTabArr: any[] = [];
      newTabArr.push(newTab);
      (this.$refs.activeTab as any).addTab(...newTabArr);
      this.activeTab = newKey;
      this.showAddTab = false;
    },
    openMainWindow(url: string) {
      const _this = this;
      window.chrome.runtime.sendMessage({ type: 'getLastFocused' }, (res: any) => {
        window.chrome.tabs.create({windowId: res.lastFocusedWindowId, url: url,})
      });

    },
  },
});
</script>

<style scoped lang="scss">
  .tab-wrapper {
    background: #dee1e6;
    .vue-tabs-chrome {
      flex-grow: 1;
    }
    .add-tab {
      padding: 6px 10px;
      cursor: pointer;
      border-bottom: #fff 4px solid;
      display: inline-block;
      font-size: 1.5em;
    }
  }

  .tab-content {
    .tab-iframe {
      width: 100%; height: calc(100vh - 150px);
      border: none;
    }
  }
</style>
