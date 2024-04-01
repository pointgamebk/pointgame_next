"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createComment } from "@/lib/actions/comment.actions";
import { commentDefaultValues } from "@/constants";
import { commentFormSchema } from "@/lib/validator";

type CommentFormProps = {
  userId: string;
  gameId: string;
};

const CommentForm = ({ userId, gameId }: CommentFormProps) => {
  const initialValues = commentDefaultValues;

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof commentFormSchema>) {
    const commentData = values;
    console.log(gameId);

    try {
      const newComment = await createComment({
        body: commentData.body,
        userId: userId,
        gameId: gameId,
        path: `/game/${gameId}`,
      });

      if (newComment) {
        form.reset();
        console.log(newComment);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 bg-blue"
      >
        <div className="flex flex-col gap-5 md:flex-row px-8">
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Enter a comment..."
                    {...field}
                    className="input-field max-w-[600px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="px-20">
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full max-w-[400px]"
          >
            {form.formState.isSubmitting ? "Submitting..." : `Submit Comment `}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CommentForm;
