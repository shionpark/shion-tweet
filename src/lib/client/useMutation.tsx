import { useState } from "react";

interface UseMutationState {
  data?: object;
  error?: object;
  isLoading: boolean;
}
type useMutationResult = [(data: any) => void, UseMutationState];

const useMutation = (url: string): useMutationResult => {
  const [state, setState] = useState({
    data: undefined,
    error: undefined,
    isLoading: false,
  });
  const mutation = (data: any) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    fetch(url, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    })
      .then((response) => response.json().catch(() => {}))
      .then((data) => setState((prev) => ({ ...prev, data })))
      .catch((error) => setState((prev) => ({ ...prev, error })))
      .finally(() => setState((prev) => ({ ...prev, isLoading: false })));
  };
  return [mutation, { ...state }];
};

export default useMutation;
