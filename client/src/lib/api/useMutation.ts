import { useReducer } from "react";
import { server } from "./server";
import { reducer, State } from "./reducer";

type MutationTuple<TData, TVariables> = [
  (variables?: TVariables | undefined) => Promise<void>,
  State<TData>
];

export const useMutation = <TData = any, TVariables = any>(
  query: string
): MutationTuple<TData, TVariables> => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false
  });

  const fetch = async (variables?: TVariables) => {
    try {
      dispatch({ type: "FETCH" });

      const { data, errors } = await server.fetch<TData, TVariables>({
        query,
        variables
      });

      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }

      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR" });
      throw console.error(err);
    }
  };

  return [fetch, state];
};
