
const Retry = (): JSX.Element => {
  return (
    <div style={{
      paddingTop: 100,
      textAlign: 'center',
    }}>数据加载失败，请重试</div>
  )
};

const Empty = (): JSX.Element => {
  return (
    <div style={{
      paddingTop: 100,
      textAlign: 'center',
    }}>数据为空</div>
  )
};

const MiddleLoading = (): JSX.Element => {
  return (
    <div style={{
      paddingTop: 100,
      textAlign: 'center',
    }}>数据加载中……</div>
  )
};

const BottomLoading = (): JSX.Element => {
  return (
    <div style={{
      textAlign: 'center',
    }}>数据加载中……</div>
  )
};

const End = (): JSX.Element => {
  return (
    <div style={{
      textAlign: 'center',
    }}>已经到底了</div>
  )
};

const PagingState = ({
  children, count = 0, loading, end, onePage, fail,
}: {
  children?: string | JSX.Element | JSX.Element[];
  count?: number;
  loading?: boolean;
  end?: boolean;
  onePage?: boolean;
  fail?: boolean;
}): JSX.Element => {
  // 初始状态：重试
  if (fail) {
    return (
      <Retry />
    );
  }

  // 初始状态：第一页加载中
  if (count === 0 && loading) {
    return (
      <MiddleLoading />
    );
  }

  // 初始状态：空数据
  if (count === 0 && !loading) {
    return (
      <Empty />
    );
  }

  return (
    <>
      {children}
      {(loading && count > 0) && <BottomLoading />}
      {(end && !onePage) && <End />}
    </>
  )
};

export default PagingState