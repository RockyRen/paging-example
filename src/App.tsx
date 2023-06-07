import { observer } from 'mobx-react-lite';
import { useLoadData } from './hooks/loadData';
import { useStore } from './hooks/store';
import PagingState from './components/PagingState';
import List from './components/List';

const App = observer(() => {
  const { pagingStore } = useStore();
  const { loading, end, onePage, fail, list } = pagingStore;

  useLoadData({
    load: pagingStore.load.bind(pagingStore),
  });

  return (
    <div className="App">
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
