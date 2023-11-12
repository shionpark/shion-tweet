import Button from "@/components/button";
import useMutation from "@/lib/client/useMutation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface CreateForm {
  email?: string;
  name?: string;
  password: string;
}
interface MutationResult {
  isSuccess: boolean;
}

const CreateAccount = () => {
  const [enter, { data, error, isLoading }] = useMutation<MutationResult>(
    "/api/users/create-account"
  );
  const { handleSubmit, register } = useForm<CreateForm>();

  const onValid = (validForm: CreateForm) => {
    if (isLoading) return;
    enter(validForm);
  };

  const router = useRouter();

  useEffect(() => {
    if (data?.isSuccess) {
      router.push("/log-in");
    }
  }, [data, router]);

  return (
    <div className="SCREEN flex flex-col px-4 justify-center items-center bg-white h-screen">
      <div className="rounded-xl bg-slate-200 py-12 px-12">
        <h3 className="E_TITLE font-extrabold text-3xl pt-12 text-center text-gray-800">
          Enter to Tweet
        </h3>

        <div className="E_CONTAINER">
          <form
            className="FORM_CONTAINER flex flex-col mt-10"
            onSubmit={handleSubmit(onValid)}
          >
            <div className="FORM_INPUTS space-y-3 mb-5">
              <div className="FORM_INPUT_P_DIV shadow-sm rounded-md">
                <label className="text-sm">Email</label>
                <input
                  {...register("email", { required: true })}
                  className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your email"
                  required
                  type="email"
                />
              </div>
              <div className="FORM_INPUT_P_DIV shadow-sm rounded-md">
                <label className="text-sm">Name</label>
                <input
                  {...register("name", { required: true })}
                  className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                  required
                  type="text"
                />
              </div>
              <div className="FORM_INPUT_P_DIV shadow-sm rounded-md">
                <label className="text-sm">Password</label>
                <input
                  {...register("password", { required: true })}
                  className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your password"
                  required
                  type="password"
                />
              </div>
            </div>
            <Button text={isLoading ? "Loading" : "Join"} />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
