import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ITeam } from "@/lib/database/models/team.model";
import { useEffect, useState } from "react";

import { getTeamsByLeague } from "@/lib/actions/team.actions";

type MatchDropdownProps = {
  value?: string;
  onChangeHandler?: () => void;
};

const MatchDropdown = ({ value, onChangeHandler }: MatchDropdownProps) => {
  const [teams, setTeams] = useState<ITeam[]>([]);
};
