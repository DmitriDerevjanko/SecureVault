import { defineStore } from 'pinia';

export const useMasterKeyStore = defineStore('masterKey', {
  state: () => ({
    masterKey: localStorage.getItem('masterKey') || '',
    isMasterKeySet: !!localStorage.getItem('masterKey'),
  }),
  actions: {
    setMasterKey(key: string) {
      this.masterKey = key;
      localStorage.setItem('masterKey', key);
      this.isMasterKeySet = true;
    },
    clearMasterKey() {
      this.masterKey = '';
      localStorage.removeItem('masterKey');
      this.isMasterKeySet = false;
    },
  },
});
