import { PagingStore } from './paging-store';

export type RootStore = {
  pagingStore: PagingStore<any, any>;
}

const rootStore: RootStore = {
  pagingStore: new PagingStore<any, any>({
    fetchList: async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(null);
        }, 2000);
      });

      return {
        code: 200,
        data: {
          total: 40,
          list: (new Array(20)).fill(0).map((_, index) => {
            return {
              id: index,
            }
          }),
        }
      }
    },
  }),
};

export default rootStore;
