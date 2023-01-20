import {MMKV} from 'react-native-mmkv';
const MMKV_KEY = '1627V-263BS-HBAYG-BAB21-6627S';

export default class MMKVStoragePersistHelper {
  storages: any = undefined;

  constructor(instance: string) {
    this.init = this.init.bind(this);
    this.setItem = this.setItem.bind(this);
    this.getItem = this.getItem.bind(this);
    this.removeItem = this.removeItem.bind(this);

    this.init(instance);
  }

  init(name: string) {
    let instance_name = name;
    this.storages = new MMKV({
      id: instance_name,
      encryptionKey: MMKV_KEY,
    });
  }

  setItem(name: string, value: any) {
    this.storages.set(name, value);
  }

  getItem(name: string) {
    return this.storages.getString(name);
  }

  removeItem(name: string) {
    this.storages.delete(name);
  }
}
