import { ModuleRoot, StateRoot } from "@/queenjs/framework";

class State extends StateRoot {
  tabs = [1, 2, 3];
  currTabIndex = 0;
  currTabItem = this.computed((state) => {
    return state.tabs[state.currTabIndex];
  });
}

export default class extends ModuleRoot {
  state = new State().reactive();

  switchTab(index: number) {
    this.state.currTabIndex = index;
  }

  async uploadImage() {
    // uploader.requestConfig = {
    //   prefix: "/assetcenter",
    //   baseURL: "http://192.168.110.207:7800/spu3d",
    // };

    // const ret = await uploader.uploadOneImage();
    // console.log(ret);
  }
}
