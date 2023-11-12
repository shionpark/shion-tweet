import useMutation from "@/lib/client/useMutation";
import { cls } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CreateForm {
  email?: string;
  name?: string;
  password: string;
}

interface MutationResult {}

const CreateAccount = () => {
  const [enter, { data, error, isLoading }] = useMutation(
    "/api/users/create-account"
  );
  const { handleSubmit, register } = useForm<CreateForm>();

  const onValid = (validForm: CreateForm) => {
    if (isLoading) return;
    console.log(validForm);
    enter(validForm);
  };
  console.log(data, error, isLoading);

  return (
    <div className="SCREEN flex flex-col px-4 justify-center items-center rounded-xl bg-white">
      <h3 className="E_TITLE font-extrabold text-3xl pt-16 text-center">
        Enter to Tweet
      </h3>
      <div className="E_CONTAINER p-2">
        <form
          className="FORM_CONTAINER flex flex-col  mt-8"
          onSubmit={handleSubmit(onValid)}
        >
          <div className="FORM_INPUTS space-y-3 ">
            <input
              {...register("email", { required: true })}
              className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
              placeholder="Your email"
              required
              type="email"
            />
            <div className="FORM_INPUT_P_DIV flex bg-black shadow-sm rounded-md">
              <input
                {...register("name", { required: true })}
                className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Your name"
                required
                type="text"
              />
            </div>
            <div className="FORM_INPUT_P_DIV flex bg-black shadow-sm rounded-md">
              <input
                {...register("password", { required: true })}
                className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Your password"
                required
                type="string"
              />
            </div>
          </div>
          <button className="FORM_ENTER_BTN bg-orange-500 hover:bg-orange-600 mt-5 py-2 px-4 border border-transparent rounded-md text-white focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:outline-none">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
