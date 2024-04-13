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

import { Textarea } from "@/components/ui/textarea";

import { useRouter } from "next/navigation";
import { updateLeagueDescription } from "@/lib/actions/league.action";

import { updateLeagueDescriptionFormSchema } from "@/lib/validator";
import Image from "next/image";
import PlacesSearchBox from "./PlacesSearchBox";

type LeagueUpdateFormProps = {
  leagueId: string;
  description: string;
  locale: string;
  path: string;
};

const LeagueUpdateForm = ({
  leagueId,
  description,
  locale,
  path,
}: LeagueUpdateFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof updateLeagueDescriptionFormSchema>>({
    resolver: zodResolver(updateLeagueDescriptionFormSchema),
    defaultValues: { description, locale },
  });

  async function onSubmit(
    values: z.infer<typeof updateLeagueDescriptionFormSchema>
  ) {
    try {
      await updateLeagueDescription(
        leagueId,
        values.description,
        values.locale,
        path
      );
      router.push(`/leagues/${leagueId}`);
    } catch (error) {
      console.error(error);
    }
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
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-72">
                  <Textarea
                    placeholder="Description..."
                    {...field}
                    className="textarea rounded-2xl"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="locale"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
                    <Image
                      src="/assets/icons/location-grey.svg"
                      width={24}
                      height={24}
                      alt="location"
                    />
                    <PlacesSearchBox
                      defaultValue={locale}
                      onSelectAddress={(address) => {
                        form.setValue("locale", address);
                      }}
                    />
                  </div>
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
          {form.formState.isSubmitting ? "Submitting..." : "Submit Update"}
        </Button>
      </form>
    </Form>
  );
};

export default LeagueUpdateForm;
