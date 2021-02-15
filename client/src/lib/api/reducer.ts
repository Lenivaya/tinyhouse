export interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

export type Action<TData> =
  | { type: "FETCH" }
  | { type: "FETCH_SUCCESS"; payload: TData }
  | { type: "FETCH_ERROR" };

export const reducer = <TData>() => (
  state: State<TData>,
  action: Action<TData>
): State<TData> => {
  switch (action.type) {
    case "FETCH":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { data: action.payload, loading: false, error: false };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: true };
    default:
      throw new Error();
  }
};
