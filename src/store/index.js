import { atom } from "recoil";

const authentication = atom({
  key: 'auth',
  default: {
    check: false,
    user: []
  }
});

export {authentication};