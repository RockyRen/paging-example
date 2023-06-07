import { useEffect, useRef } from 'react';

export const useLoadData = ({
  load,
}: {
  load: () => void,
}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    load();
  }, []);

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
