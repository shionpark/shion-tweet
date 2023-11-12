import { useState } from "react";
interface UseMutationState<T> {
  data?: T;
  error?: object;
  isLoading: boolean;
}
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

function useMutation<T = any>(url: string): UseMutationResult<T> {
  const [state, setState] = useState<UseMutationState<T>>({
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
}

export default useMutation;
