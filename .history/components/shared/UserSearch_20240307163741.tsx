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

import { playerDefaultValues } from "@/constants";

const UserSearchBox = () => {
  return (
    <section className=" bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
      <h3 className="wrapper h3-bold text-center sm:text-left text-white">
        Add Player
      </h3>

      <div className="wrapper my-8">
        <Form>
          <form className="flex flex-col gap-5 md:flex-row">
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Search for a user"
                  type="text"
                  name="search"
                  id="search"
                />
              </FormControl>
            </FormItem>
            <Button type="submit" className="w-full md:w-1/4">
              Search
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default UserSearchBox;
