import { useEffect, useRef } from "react";

const usePrevious = <T>(value: T): T | undefined => {
  // useRef로 생성된 초기 값은 리렌더링 여부와 상관없이 항상 같은 값으로 유지됨.
  const ref = useRef<T>(null);

  // 컴포넌트가 리렌더링 될 때마다 ref에 값 할당
  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};

export default usePrevious;
