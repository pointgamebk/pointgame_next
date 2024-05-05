"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const NameSearch = ({
  placeholder = "Search title...",
}: {
  placeholder?: string;
}) => {
  const [nameQuery, setNameQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (nameQuery) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "nameQuery",
          value: nameQuery,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["nameQuery"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [nameQuery, searchParams, router]);

  return (
    <div className="flex-center min-h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
      />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setNameQuery(e.target.value)}
        className="p-regular-16 border-0 bg-grey-50 outline-offset-0 placeholder:text-grey-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default NameSearch;
