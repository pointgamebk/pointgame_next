import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { IMatch } from "@/lib/database/models/match.model.";

type WinnerDropdownProps = {
  match: IMatch;
  value?: string;
  onChangeHandler?: () => void;
};

const WinnerDropdown = ({
  match,
  value,
  onChangeHandler,
}: WinnerDropdownProps) => {
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Team List" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          key={match.teamOne._id}
          value={match.teamOne._id}
          className="select-item p-regular-14"
        >
          {match.teamOne.name}
        </SelectItem>
        <SelectItem
          key={match.teamTwo._id}
          value={match.teamTwo._id}
          className="select-item p-regular-14"
        >
          {match.teamTwo.name}
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default WinnerDropdown;
