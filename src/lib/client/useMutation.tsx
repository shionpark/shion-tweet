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
  //   const [data, setData] = useState<undefined | any>(undefined);
  //   const [error, setError] = useState<undefined | any>(undefined);
  //   const [isLoading, setIsLoading] = useState(false);
  const mutation = (data: any) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    // setIsLoading(true);
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
  //   return [mutation, { data, error, isLoading }];
};

export default useMutation;

// setSubmitting(true);
// fetch("/api/users/enter", {
//   body: JSON.stringify(data),
//   headers: {
//     "Content-Type": "application/json",
//   },
//   method: "POST",
// }).then(() => {
//   setSubmitting(false);
// });
