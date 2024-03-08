"use client";

import React, { ChangeEvent, useState, useEffect } from "react";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getUserByUserName } from "@/lib/actions/user.actions";

interface User {
  _id: string;
  username: string;
}

type UserSearchBoxProps = {
  onSelectUser: (user: User | null) => void;
};

const UserSearchBox = ({ onSelectUser }: UserSearchBoxProps) => {
  const [open, setOpen] = useState(false);
  //const [value, setValue] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      return;
    }

    // Fetch user data based on the search term
    const users = async () => {
      try {
        const data = await getUserByUserName(searchTerm);
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    users();
    // getUserByUserName(searchTerm)
    //   .then((data) => {
    //     setSearchResults(data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching users:", error);
    //   });
  }, [searchTerm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full p-2 ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {searchTerm === "" ? "Search username..." : searchTerm}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" onChange={handleChange}>
          <Command>
            <CommandInput placeholder="Search username..." className="h-9 " />
            <CommandEmpty>No user found.</CommandEmpty>
            <CommandGroup>
              {searchResults.map((user) => (
                <CommandItem
                  key={user._id}
                  value={user._id}
                  onSelect={() => onSelectUser(user)}
                >
                  {user.username}
                  <CheckIcon
                    className={cn(
                      "ml-auto h-4 w-4",
                      searchTerm === user.username ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default UserSearchBox;
