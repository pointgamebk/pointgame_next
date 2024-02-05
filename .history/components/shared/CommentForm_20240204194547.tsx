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
import { IComment } from "@/lib/database/models/comment.model";

import { commentDefaultValues } from "@/constants";
import { commentFormSchema } from "@/lib/validator";
import { comment } from "postcss";

type CommentFormProps = {
  userId: string;
  gameId?: string;
};

const CommentForm = ({ userId, gameId }: CommentFormProps) => {
  const initialValues = commentDefaultValues;

  const form = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof commentFormSchema>) {
    const commentData = values;

    try {
      const newComment = await createComment({
        body: commentData.body,
        game: gameId,
        userId: userId,
      });
      })
    } catch (error) {
      console.log(error);
    }

    console.log(commentData);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="Enter a comment..."
                    {...field}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : `Submit Comment `}
        </Button>
      </form>
    </Form>
  );
};

export default CommentForm;
