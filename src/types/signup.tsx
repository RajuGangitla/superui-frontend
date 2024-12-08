import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { UseFormReset } from "react-hook-form";
import { z } from "zod"


export const signupSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
})

export type TSignUp = z.infer<typeof signupSchema>


export interface ISignUpUserApiProps {
    reset: UseFormReset<TSignUp>,
    router: AppRouterInstance,
    signIn: (user: User) => void;
}


export type User = {
    _id: string;
    email: string;
};
