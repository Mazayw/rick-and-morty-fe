export const initState = { page: 0, text: '' };

export const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  NEW_INPUT,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};

const reducer = (state: typeof initState, action: ReducerAction): typeof initState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, page: state.page + 1 };
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, page: state.page - 1 };
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return { ...state, text: action.payload ?? '' };
    default:
      throw new Error();
  }
};

export { reducer };
/*
type ChildrenType = {
    children: (num: number) => ReactNode
}
 */
