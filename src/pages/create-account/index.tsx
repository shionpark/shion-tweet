import Button from "@/components/button";
import Input from "@/components/input";
import useMutation from "@/lib/client/useMutation";
import { cls } from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface CreateForm {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface LoginForm {
  email?: string;
  password: string;
}

interface MutationResult {
  isSuccess: boolean;
  message: string;
}

const CreateAccount = () => {
  const [enter, { data, error, isLoading }] = useMutation<MutationResult>(
    "/api/users/create-account"
  );
  const [login, { data: loginData, isLoading: loginLoading }] =
    useMutation<MutationResult>("/api/users/log-in");

  const { handleSubmit, register } = useForm<CreateForm>();
  const { handleSubmit: loginHandleSubmit, register: loginRegister } =
    useForm<LoginForm>();

  const onValid = (validForm: CreateForm) => {
    if (isLoading) return;
    enter(validForm);
    console.log(data);
  };

  const onLoginValid = (validForm: LoginForm) => {
    if (loginLoading) return;
    login(validForm);
    console.log(loginData);
  };

  return (
    <div className="SCREEN flex flex-col px-4 justify-center items-center rounded-xl bg-white">
      {data?.isSuccess ? (
        <h3 className="E_TITLE font-extrabold text-3xl pt-16 text-center">
          Login
        </h3>
      ) : (
        <h3 className="E_TITLE font-extrabold text-3xl pt-16 text-center">
          Enter to Tweet
        </h3>
      )}
      <div className="E_CONTAINER p-2">
        {data?.isSuccess ? (
          <form
            className="FORM_CONTAINER flex flex-col mt-8"
            onSubmit={loginHandleSubmit(onLoginValid)}
          >
            <div className="FORM_INPUT_P_DIV fle shadow-sm rounded-md space-y-3 mb-5">
              <Input
                label="Email"
                name="email"
                placeholder="Your email"
                register={register("email", { required: true })}
                required
                type="email"
              />
              <Input
                label="Password"
                name="password"
                placeholder="Your password"
                register={register("password", { required: true })}
                required
                type="password"
              />
            </div>
            <Button text={loginLoading ? "Loading" : "Log In"} />
          </form>
        ) : (
          <form
            className="FORM_CONTAINER flex flex-col  mt-8"
            onSubmit={handleSubmit(onValid)}
          >
            <div className="FORM_INPUTS space-y-3 mb-5">
              <Input
                label="Email"
                name="email"
                placeholder="Your email"
                register={register("email", { required: true })}
                required
                type="email"
              />
              <Input
                label="Name"
                name="name"
                placeholder="Your name"
                register={register("name", { required: true })}
                required
                type="name"
              />
              <Input
                label="Password"
                name="password"
                placeholder="Your password"
                register={register("password", { required: true })}
                required
                type="password"
              />
              <Input
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Confirm password"
                register={register("confirmPassword", { required: true })}
                required
                type="confirmPassword"
              />
            </div>
            <Button text={isLoading ? "Loading" : "Join"} />
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateAccount;
