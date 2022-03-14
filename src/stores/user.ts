import { fetchUser } from '@/http/apis/user';
import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: {
      username: '',
      password: ''
    }
  }),
  getters: {
    username: state => `${state.user.username || 'UNKNOWN'}`
  },
  actions: {
    async fetchAccountInfo() {
      const resp = await fetchUser();
      if (!resp.code) {
        this.user = {
          ...this.user,
          ...resp.data
        };
      }
    }
  }
});
