// import something here

// "async" is optional
export default ({ /* app, router, Vue, ... */ }) => {
  // something to do
  /* eslint:ignore */
  (function(w, d, f, s) {
    w.buglog = w.buglog || {};
    buglog.id = 'GM5RG1PX14';
    f = d.getElementsByTagName('head')[0];
    s = d.createElement('script');
    s.async = 1;
    s.src = 'https://api.buglog.io/website/' + buglog.id + '/code';
    f.appendChild(s);
  })(window, document);
}
