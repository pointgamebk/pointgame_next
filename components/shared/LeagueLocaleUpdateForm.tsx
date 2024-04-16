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

import { leagueDefaultValues } from "@/constants";

import { useRouter } from "next/navigation";

import { updateLeagueLocale } from "@/lib/actions/league.action";
import { updateLeagueLocaleFormSchema } from "@/lib/validator";

import CitySearchBox from "./CitySearchBox";
import Image from "next/image";

type LeagueLocaleUpdateFormProps = {
  leagueId: string;
  locale: string;
  path: string;
};
const LeagueLocaleUpdateForm = ({
  leagueId,
  locale,
  path,
}: LeagueLocaleUpdateFormProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof updateLeagueLocaleFormSchema>>({
    resolver: zodResolver(updateLeagueLocaleFormSchema),
    defaultValues: { locale },
  });

  async function onSubmit(
    values: z.infer<typeof updateLeagueLocaleFormSchema>
  ) {
    try {
      await updateLeagueLocale(leagueId, values.locale, path);
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
                    <CitySearchBox
                      defaultValue=""
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
          {form.formState.isSubmitting ? "Submitting..." : "Update Locale"}
        </Button>
      </form>
    </Form>
  );
};

export default LeagueLocaleUpdateForm;
