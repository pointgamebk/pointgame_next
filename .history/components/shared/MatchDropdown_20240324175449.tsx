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
  leagueId: string;
  value?: string;
  onChangeHandler?: () => void;
};

const MatchDropdown = ({
  leagueId,
  value,
  onChangeHandler,
}: MatchDropdownProps) => {
  const [teams, setTeams] = useState<ITeam[]>([]);

  useEffect(() => {
    const getTeams = async () => {
      const teamList = await getTeamsByLeague(leagueId);

      console.log(teamList);

      teamList && setTeams(teamList as ITeam[]);
    };

    getTeams();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Team" />
      </SelectTrigger>
      <SelectContent>
        {teams.length > 0 &&
          teams.map((team) => (
            <SelectItem
              key={team._id}
              value={team._id}
              className="select-item p-regular-14"
            >
              {team.name}
            </SelectItem>
          ))}
      </SelectContent>
    </Select>
  );
};

export default MatchDropdown;
