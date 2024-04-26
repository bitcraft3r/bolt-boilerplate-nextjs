import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "convex/react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "../../../../convex/_generated/api";

const formSchema = z.object({
    text: z.string()
        .min(1, {
            message: "Message must be at least 1 character.",
        })
        .max(64, {
            message: "Message must be at most 64 characters.",
        }),
});

const CreatePost = () => {
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
                    <Button className="ml-2 bg-emerald-500" type="submit">
                        Submit
                    </Button>

                </form>
            </Form>
        </div>
    );
}

export default CreatePost;