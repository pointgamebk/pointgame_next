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
    <section>
      <div>
        <h1 className="text-white">Add Player</h1>
      </div>
    </section>
  );
};

export default UserSearchBox;
