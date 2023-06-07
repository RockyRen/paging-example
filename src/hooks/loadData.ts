import { useEffect, useRef } from 'react';

export const useLoadData = ({
  load,
}: {
  load: () => void,
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 初始化时加载第一页的数据
  useEffect(() => {
    load();
  }, []);

  // 滚动到底部是加载下一页数据
  useEffect(() => {
    const scrollFetch = ((): void => {
      if (timerRef.current) return;
      // 节流
      timerRef.current = setTimeout(() => {
        if (window.scrollY > document.body.clientHeight - document.documentElement.clientHeight - 200) {
          load();
        }
        timerRef.current = null;
      }, 200);
    });

    document.body.addEventListener('touchmove', scrollFetch);
    return () => {
      document.body.removeEventListener('touchmove', scrollFetch);
    };
  }, []);
};
