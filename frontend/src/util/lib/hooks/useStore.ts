import React from "react";
import { MobXProviderContext } from "mobx-react";
import StoreType from "../../types/Store";

export default (): StoreType => {
  return React.useContext(MobXProviderContext) as StoreType;
};
