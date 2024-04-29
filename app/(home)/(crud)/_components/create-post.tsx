import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useConvexAuth, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import AvatarFallbackLogo from "../../_components/avatar-fallback-logo";

const formSchema = z.object({
    text: z.string()
        .min(1, {
            message: "Message must be at least 1 character.",
        })
        .max(100, {
            message: "Message must be at most 100 characters.",
        }),
});

const CreatePost = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();
    const { user } = useUser();

    const createPost = useMutation(api.posts.create);

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            text: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        createPost({ text: values.text });
        form.reset();
    }

    return (
        <div className="border p-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
                    <div className="flex items-center">
                        {
                            isAuthenticated
                                ?
                                <Link href={`/${user?.username}`}>
                                    <Avatar className="mr-2 h-8 w-8">
                                        <AvatarImage src={user?.imageUrl} alt="avatar" />
                                        <AvatarFallbackLogo />
                                    </Avatar>
                                </Link>
                                :
                                <Avatar className="mr-2 h-8 w-8">
                                    <AvatarFallbackLogo />
                                </Avatar>
                        }
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="text"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input placeholder="What is happening?!" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {isAuthenticated
                        ?
                        // displayed on app after user is logged in
                        <Button className="ml-2 bg-emerald-500 hover:bg-emerald-400" type="submit">
                            Send
                        </Button>
                        :
                        // displayed on landing page when user is not logged in
                        <Button className="ml-2 bg-emerald-500 hover:bg-emerald-400" disabled>
                            Send
                        </Button>
                    }

                </form>
            </Form>
        </div>
    );
}

export default CreatePost;