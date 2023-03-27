import { MemberForm } from "./member.form";

export class Team {
  members!: MemberForm[];
  constructor(
    public name: string
  ) { }
}
