import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useConvexAuth, useMutation } from "convex/react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "../../../../convex/_generated/api";
import { SquarePen } from "lucide-react";

const formSchema = z.object({
    text: z.string()
        .min(1, {
            message: "Message must be at least 1 character.",
        })
        .max(99, {
            message: "Message must be at most 99 characters.",
        }),
});

const CreatePost = () => {
    const { isAuthenticated, isLoading } = useConvexAuth();

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
        console.log(values);
        createPost({ text: values.text });
        form.reset();
    }

    return (
        <div className="border p-2">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex">
                    <div className="flex items-center">
                        <SquarePen className="text-muted-foreground mr-2 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
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
                        <Button className="ml-2 bg-emerald-500 hover:bg-emerald-400" type="submit">
                            Submit
                        </Button>
                        :
                        <Button className="ml-2 bg-emerald-500 hover:bg-emerald-400" type="submit" disabled>
                            Submit
                        </Button>
                    }

                </form>
            </Form>
        </div>
    );
}

export default CreatePost;