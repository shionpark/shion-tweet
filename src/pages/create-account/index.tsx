import { useForm } from "react-hook-form";

interface CreateForm {
  email?: string;
  name?: string;
  password?: string;
}

const CreateAccount = () => {
  const { handleSubmit, register } = useForm();

  const onValid = (data: CreateForm) => {};

  return (
    <div>
      <h1>계정 만들기</h1>
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
