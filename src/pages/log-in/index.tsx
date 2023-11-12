import Button from "@/components/button";
import useMutation from "@/lib/client/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface LoginForm {
  email?: string;
  password: string;
}

interface MutationResult {
  isSuccess: boolean;
}

const Login = () => {
  const [login, { data: loginData, isLoading: loginLoading }] =
    useMutation<MutationResult>("/api/users/log-in");

  const { handleSubmit: loginHandleSubmit, register: loginRegister } =
    useForm<LoginForm>();

  const router = useRouter();

  const onLoginValid = (validForm: LoginForm) => {
    if (loginLoading) return;
    login(validForm);
  };

  useEffect(() => {
    if (loginData?.isSuccess) {
      router.push("/");
    }
  }, [loginData, router]);

  return (
    <div className="SCREEN flex flex-col px-4 justify-center items-center rounded-xl bg-white">
      <h3 className="E_TITLE font-extrabold text-3xl pt-16 text-center">
        Login
      </h3>
      <div className="E_CONTAINER p-2">
        <form
          className="FORM_CONTAINER flex flex-col  mt-8"
          onSubmit={loginHandleSubmit(onLoginValid)}
        >
          <div className="FORM_INPUTS space-y-3 mb-5">
            <div className="FORM_INPUT_P_DIV shadow-sm rounded-md">
              <label className="text-sm">Email</label>
              <input
                {...loginRegister("email", { required: true })}
                className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Your email"
                required
                type="email"
              />
            </div>
            <div className="FORM_INPUT_P_DIV shadow-sm rounded-md">
              <label className="text-sm">Password</label>
              <input
                {...loginRegister("password", { required: true })}
                className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                placeholder="Your password"
                required
                type="password"
              />
            </div>
          </div>
          <Button text={loginLoading ? "Loading" : "Log In"} />
        </form>
      </div>
    </div>
  );
};

export default Login;
