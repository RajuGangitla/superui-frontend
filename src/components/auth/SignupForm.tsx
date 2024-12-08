'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { signupSchema, TSignUp } from '@/types/signup'
import { signUpUserApi } from '@/services/auth'
import userStore from '@/store/users'



export function SignupForm() {
    const router = useRouter()
    const { signIn } = userStore()
    const form = useForm<TSignUp>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            email: "",
        },
    })

    const { mutate: signUpUser, isPending: isLoadingMail } =
        signUpUserApi({ reset: form.reset, router, signIn });

    async function onSubmit(values: TSignUp) {
        signUpUser(values)
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoadingMail}>
                            {isLoadingMail ? "Signing up..." : "Sign Up"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}

