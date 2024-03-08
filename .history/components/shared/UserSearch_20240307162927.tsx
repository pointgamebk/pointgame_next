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

const UserSearchBox = () => {
  return;
};

export default UserSearchBox;
