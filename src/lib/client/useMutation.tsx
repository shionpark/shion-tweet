import { useState } from "react";
interface UseMutationState {
  data?: object;
  error?: object;
  isLoading: boolean;
}
type UseMutationResult = [(data: any) => void, UseMutationState];

function useMutation(url: string): UseMutationResult {
  const [state, setState] = useState<UseMutationState>({
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
