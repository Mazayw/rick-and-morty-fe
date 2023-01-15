import { IResponseCard } from 'components/interfaces';

type InitState = {
  page: number;
  totalPages: number;
  search: string;
  cardsData: IResponseCard[] | never;
};

export const initState: InitState = { page: 1, totalPages: 0, search: '', cardsData: [] };
// const [cardsData, setCardsData] = useState<IResponseCard[] | never>([]);

export const enum REDUCER_ACTION_TYPE {
  NEXT_PAGE,
  PREV_PAGE,
  CHANGE_TOTAL_PAGES,
  CHANGE_SEARCH,
  CHANGE_CARDS_DATA,
}
/*
type SearchAction = {
  type: REDUCER_ACTION_TYPE;
  payload: string;
};
type CardsDataAction = {
  type: REDUCER_ACTION_TYPE;
  payload: string | IResponseCard[];
};
type ReducerAction = SearchAction | CardsDataAction;
*/
export type TReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string | number | IResponseCard[];
};

const reducer = (state: typeof initState, action: TReducerAction): typeof initState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.NEXT_PAGE:
      return { ...state, page: state.page + 1 };
    case REDUCER_ACTION_TYPE.PREV_PAGE:
      return { ...state, page: state.page - 1 };
    case REDUCER_ACTION_TYPE.CHANGE_TOTAL_PAGES:
      return { ...state, totalPages: action.payload as number };
    case REDUCER_ACTION_TYPE.CHANGE_SEARCH:
      return { ...state, search: action.payload as string };
    case REDUCER_ACTION_TYPE.CHANGE_CARDS_DATA:
      return { ...state, cardsData: action.payload as IResponseCard[] };
    default:
      throw new Error();
  }
};

export { reducer };
