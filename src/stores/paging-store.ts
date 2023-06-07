import { makeAutoObservable } from 'mobx';
const defaultPageSize = 20;
const beginPageNum = 1;

// 分页store
export class PagingStore<Item, Res> {
  public pageNum = beginPageNum;  // 当前请求下标
  public pageSize = defaultPageSize;  // 每个分页的个数
  public list: Item[] = [];       // 数据列表
  public total = 0; // 数据总值
  public loading = false; // 是否正在请求数据
  public end = false;     // 是否到底了
  public onePage = false; // 是否只有一页数据
  public fail = false;    // 是否加载失败
  public fetchList: (pageNum: number, pageSize: number) => Promise<Res>;

  public constructor({pageSize, fetchList} : {
    pageSize?: number;
    fetchList: (pageNum: number, pageSize: number) => Promise<Res>;
  }) {
    makeAutoObservable(this);
    this.fetchList = fetchList;
    if (pageSize) this.pageSize = pageSize;
  }

  public async load(): Promise<Res | null> {
    // 如果处于loading状态或者到底了，则不load数据
    if (this.loading || this.end) return null;

    this.loading = true;

    const rawRes = await this.fetchList(this.pageNum, this.pageSize);

    const res = rawRes as {
      code: number;
      data: {
        total: number;
        list: Item[];
      };
    };

    if (res.code === 200) {
      this.list = this.list.concat(res.data?.list || []);
      const total = res.data?.total || 0;
      this.total = total;

      if (this.list.length >= total) {
        this.end = true;

        // 如果到底了且分页只有一页，则onePage为true
        if (this.pageNum === beginPageNum) {
          this.onePage = true;
        }
      }

      this.pageNum = this.pageNum + 1;
    } else {
      this.fail = true;
    }

    this.loading = false;

    return rawRes;
  }

  public reset(): void {
    this.pageNum = beginPageNum;
    this.pageSize = defaultPageSize;
    this.list = [];
    this.total = 0;
    this.loading = false;
    this.end = false;
    this.onePage = false;
    this.fail = false;
  }

  // 从第一页开始重新加载数据
  public async reload(): Promise<Res | null> {
    this.reset();
    return this.load();
  }
}
