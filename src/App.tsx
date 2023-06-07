import { observer } from 'mobx-react-lite';
import { useLoadData } from './hooks/loadData';
import { useStore } from './hooks/store';
import PagingState from './components/PagingState';
import List from './components/List';

const App = observer(() => {
  const { pagingStore } = useStore();
  // 数据层：暴露内部状态给视图层渲染
  const { loading, end, onePage, fail, list } = pagingStore;

  // 操作层：设置远程加载数据的触发点
  useLoadData({
    load: pagingStore.load.bind(pagingStore),
  });

  return (
    <div className="App">
      {/* 视图层：渲染滚动分页的各个状态，该组件是一个无状态组件 */}
      <PagingState
        loading={loading}
        end={end}
        onePage={onePage}
        fail={fail}
        count={list.length}
      >
        <List list={list} />
      </PagingState>
    </div>
  );
});

export default App;
