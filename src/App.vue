<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

/* declare global {
  interface Window { chrome: any; }
}

window.chrome = window.chrome; */

export default Vue.extend({
  name: 'App',
  created() {
    if (window.chrome) {
      /* Send message to background to pass tabId */
      window.chrome.runtime.sendMessage({ type: 'getTabId' }, (res: any) => {
        console.log('inside popup tabId=', res.tabId);
      });
      const bodyObj = document.getElementsByTagName('body');
      if (bodyObj) {
        bodyObj[0].addEventListener('mouseenter', (e) => {
          window.chrome.runtime.sendMessage({ type: 'popupMouseEnter' });
        });

        bodyObj[0].addEventListener('mouseleave', (e) => {
          window.chrome.runtime.sendMessage({ type: 'popupMouseLeave' });
        });
      }
    }

  },
});
</script>
