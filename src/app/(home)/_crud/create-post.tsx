import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "convex/react";

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
        .max(64, {
            message: "Message must be at most 64 characters.", // TODO: Increase max character limit?
        }),
});

// TODO: If user not authenticated (e.g. when this component used in landing page <Hero />), change Button behavior e.g. Toast with "Log in to continue" , or directly open Login modal.
// Alternatively, change button color or altogether ; as it may be quite distracting from the main CTA ? E.g. disable form and submit buttons ; grey them out ; add a Hover with instructions.
// either way -> definitly should not allow Calling the db mutation if on landing page (and landing page only viewable when user not logged in)

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
                    <Button className="ml-2 bg-emerald-500 hover:bg-emerald-400" type="submit">
                        Submit
                    </Button>

                </form>
            </Form>
        </div>
    );
}

export default CreatePost;