import useMutation from "@/lib/client/useMutation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CreateForm {
  email?: string;
  name?: string;
  password?: string;
}

const API_USER_ENTER = "/api/users/enter";

const CreateAccount = () => {
  const [enter, { data, error, isLoading }] = useMutation(API_USER_ENTER);
  const [submitting, setSubmitting] = useState(false);
  const { handleSubmit, register } = useForm<CreateForm>();

  const onValid = (validForm: CreateForm) => {
    if (isLoading) return;
    enter(validForm);
  };
  console.log(data, isLoading, error);

  return (
    <div>
      <h1>계정 만들기</h1>
      <span>{submitting ? "Loading" : "Clear!"}</span>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email")}
          placeholder="email"
          required
          type="email"
        ></input>
        <input
          {...register("name")}
          placeholder="name"
          required
          type="text"
        ></input>
        <input
          {...register("password")}
          placeholder="password"
          required
          type="password"
        ></input>
        <button type="submit">클릭!</button>
      </form>
    </div>
  );
};

export default CreateAccount;
