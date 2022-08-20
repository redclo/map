import UserModule from "..";

export default (module: UserModule) => ({
  create() {
    module.http.getUserInfo();
  },
});
