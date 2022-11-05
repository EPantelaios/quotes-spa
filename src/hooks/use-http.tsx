/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer, useCallback } from 'react';

type RequestFunctionProps = (requestData?: any) => Promise<any>;

type StateProps = {
  data: any;
  status: 'pending' | 'completed' | null;
  error: string | null | undefined;
};

type ActionProps = {
  type: 'SEND' | 'SUCCESS' | 'ERROR';
  responseData?: any;
  errorMessage?: string;
};

const httpReducer = (state: StateProps, action: ActionProps): StateProps => {
  if (action.type === 'SEND') {
    return {
      data: null,
      status: 'pending',
      error: null,
    };
  }

  if (action.type === 'SUCCESS') {
    return {
      data: action.responseData,
      status: 'completed',
      error: null,
    };
  }

  if (action.type === 'ERROR') {
    return {
      data: null,
      status: 'completed',
      error: action.errorMessage,
    };
  }

  return state;
};

function useHttp(
  requestFunction: RequestFunctionProps,
  startWithPending = false
) {
  const initialStateInput: StateProps = {
    data: null,
    status: startWithPending ? 'pending' : null,
    error: null,
  };

  const [httpState, dispatch] = useReducer(httpReducer, initialStateInput);

  const sendRequest = useCallback(
    async function (requestData?: any) {
      dispatch({ type: 'SEND' });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: 'SUCCESS', responseData: responseData });
      } catch (error: any) {
        dispatch({
          type: 'ERROR',
          errorMessage: error.message || 'Something went wrong!',
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
