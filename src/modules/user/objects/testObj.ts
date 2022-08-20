import { ModuleObject } from "queenjs/framework";
import UserModule from "..";

export class TestObj extends ModuleObject<UserModule>{
  ddd(){
    this.state.userInfo.avatar
  }
}