import { toast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import api from "@/lib/api"
import { ISignUpUserApiProps, TSignUp } from "@/types/signup"


export const signUpUserApi = ({ reset, router, signIn }: ISignUpUserApiProps) => {
    return useMutation({
        mutationFn: (data: TSignUp) => api.post("/signup", data),
        onSuccess: (res: AxiosResponse) => {
            console.log(res?.data, "local storage")
            signIn(res?.data?.user)
            localStorage.setItem("superui-token", res?.data?.token)
            router.push('/')
            reset()
            toast({
                title: "SignUp Successful",
                description: "Welcome back!",
            })
        },
        onError: ({ response }: any) => {
            toast({
                title: "SignUp Failed",
                description: response?.data?.message || "An unexpected error occurred. Please try again.",
            });
        },
    })
}