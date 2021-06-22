import { useCallback, useState } from "react";

export default function useSideBar() {
  const [open, setOpen] = useState<boolean>(false);

  const sideBarOpenHandler = useCallback(
    (state: boolean) => {
      setOpen(state);
    },
    [setOpen]
  );

  return {
    open,
    sideBarOpenHandler,
  };
}
