import { HttpRoot } from '../../extends/http';
import { StateRoot } from '../../extends/state';
import { useEffect } from '../../hooks/reactive';
import { toRaw } from 'vue';

class ListItemBase {
  _id?: string = '';
}

class StatePageList<T extends ListItemBase, Q> extends StateRoot {
  size: number = 10;
  page: number = 1;
  total: number = 0;
  list: T[] = [];
  query: Q = {} as any;
  fields: string = ''; //字段使用逗号隔开
  currSelId: string = '';
  loading: boolean = false;
  CurrItem = this.computed((state) => {
    if (!state.currSelId) return null;

    let n = state.list.length;
    while (n--) {
      if (state.list[n]._id == this.currSelId) return state.list[n];
    }
    return null;
  });

  canLoadNext = this.computed((state) => {
    const { size, page, total } = state;
    return page * size < total;
  });
}

/**
 * 分页列表控制器
 */
export class PageListController<T extends ListItemBase, Q> {
  state = new StatePageList<T, Q>().reactive();
  ctx: any;
  dataList: any[] = [];
  httpGet?: (
    page: number,
    size: number,
    query?: any,
    fields?: string
  ) => Promise<any>;
  httpDelete?: (id: string) => Promise<any>;
  httpAdd?: (query?: any) => Promise<any>;
  httpSave?: (item: T) => Promise<any>;
  hasLimit = false;
  listFilter: ((item: T) => T) | null = null;

  constructor(
    ctx: any,
    get?: () => (
      page: number,
      size: number,
      query?: any,
      fields?: string
    ) => Promise<any>
  ) {
    this.ctx = ctx;

    if (get) {
      this.httpGet = get();
    }
  }
  setCrudPrefix(prefix: string, http: HttpRoot) {
    this.httpGet = (
      page: number,
      size: number,
      query: any,
      fields?: string
    ) => {
      return http.crud(prefix, 'list', { page, size, query, fields });
    };
    this.httpAdd = (data: any) => {
      return http.crud(prefix, 'create', data);
    };
    this.httpSave = (data: any) => {
      return http.crud(prefix, 'update', data);
    };
    this.httpDelete = (id: string) => {
      return http.crud(prefix, 'delete', id);
    };
  }
  async resumeShow() {
    if (this.state.list.length < 1) {
      await this.loadPage(1);
    }
  }

  setup() {
    const state = this.state;
    useEffect(
      () => {
        if (!state.loading) {
          this.fresh();
        }
      },
      () => {
        const { query } = state;
      }
    );
  }

  //刷新页面，重新获取数据
  async fresh() {
    await this.loadPage(this.state.page, this.state.size);
  }

  loadNextPage = () => {
    return this.loadPage(this.state.page + 1);
  };

  async loadPage(page: number, size?: number): Promise<boolean> {
    if (!this.httpGet) return false;
    this.state.loading = true;

    if (!size) size = this.state.size;

    const ret = await this.httpGet(
      page,
      size,
      this.state.query,
      this.state.fields
    );
    this.state.loading = false;

    if (ret.errorNo == 200) {
      const result = ret.result;
      this.state.page = page;
      this.state.size = size;

      let list = [];
      if (this.listFilter) {
        list = result.list.map(this.listFilter) || [];
      } else {
        list = [...result.list];
      }
      if (page == 1 || !this.hasLimit) {
        this.dataList = [...result.list];
        this.state.list = list;
      } else {
        this.state.list = [...this.state.list, ...list];
        this.dataList = [...this.dataList, ...result.list];
      }
      setTimeout(() => {
        this.state.total = result.total;
      }, 100)
      return true;
    }

    return false;
  }

  getCurrSel(): T | null {
    return toRaw(this.state.CurrItem);
  }
  getCurrListItem(_id: string): any {
    return this.dataList.find((val) => {
      return val._id == _id;
    });
  }

  async addItem(data: ListItemBase) {
    if (!this.httpAdd) return { errorNo: 500, errorDesc: 'httpAdd 未定义' };
    this.state.loading = true;
    const ret = await this.httpAdd(data);
    this.state.loading = false;
    if (ret.errorNo == 200) {
      await this.fresh();
    }
    return ret;
  }

  async deleteItem(id: string) {
    if (!this.httpDelete) return;

    this.state.loading = true;

    const ret = await this.httpDelete(id);
    this.state.loading = false;

    if (ret.errorNo == 200) {
      await this.fresh();
    }
    return ret;
  }

  async saveItem(item: T) {
    if (!this.httpSave) return;
    this.state.loading = true;
    const ret = await this.httpSave(item);
    this.state.loading = false;
    if (ret.errorNo == 200) {
      this.updateCacheValue(item);
    }
    return ret;
  }

  updateCacheValue(values: any) {
    const originData = this.getCurrListItem(values._id);
    if (originData) {
      for (const k in values) {
        originData[k] = values[k];
      }
    }

    if (this.listFilter) {
      values = this.listFilter(values);
    }
    const listData = this.state.list.find((val) => {
      return val._id == values._id;
    });
    if (listData) {
      for (const k in listData) {
        listData[k] = values[k];
      }
    }

    return true;
  }
}
