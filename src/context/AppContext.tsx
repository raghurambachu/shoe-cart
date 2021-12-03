import React, { createContext, Dispatch, useReducer } from "react";
import { appConfig } from "../appConfig";

const {
  dropdowns: { sortBy: sortByList },
} = appConfig;

type TSetTitle = {
  type: "SET_SEARCH";
  payload: { search: string };
};

type TSetSortBy = {
  type: "SET_SORTBY";
  payload: {
    sortBy: string;
  };
};

type TAppReducerAction = TSetTitle | TSetSortBy;

interface IAppContext {
  appState: IAppState;
  appDispatch: Dispatch<TAppReducerAction>;
}

interface IAppState {
  search: string;
  selectedProduct: string; //For displaying product details on right sidebar(its sku)
  selectedCategory: string[];
  priceRange: [number, number];
  selectedSizes: number[];
  sortBy: string;
}

const initialAppState: IAppState = {
  search: "",
  selectedProduct: "",
  selectedCategory: [],
  priceRange: [0, 0], //Todo: should be taken from appConfig
  selectedSizes: [38, 39], //Todo: should be taken from appConfig
  sortBy: sortByList[0].value, //Todo: should be taken form appConfig
};

function appReducer(state: IAppState, action: TAppReducerAction) {
  switch (action.type) {
    case "SET_SEARCH": {
      return {
        ...state,
        search: action.payload.search,
      };
    }
    case "SET_SORTBY": {
      return {
        ...state,
        sortBy: action.payload.sortBy,
      };
    }

    default:
      return { ...state };
  }
}

export const AppContext = createContext({} as IAppContext);

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appState, appDispatch] = useReducer(appReducer, initialAppState);

  return (
    <AppContext.Provider value={{ appState, appDispatch }}>
      {children}
    </AppContext.Provider>
  );
};
