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

const UserSearchBox = () => {
  return (
    <section className=" bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
      <div>
        <h1 className="text-white">Add Player</h1>
      </div>
    </section>
  );
};

export default UserSearchBox;
