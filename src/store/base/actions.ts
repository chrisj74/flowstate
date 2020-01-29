export const toggleLeftDrawerOpen = (state: any) => {
  console.log('state=', state);
  state.commit('setLeftDrawerOpen', !state.state.leftDrawerOpen);
};
