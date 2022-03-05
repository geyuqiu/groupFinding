import { IStudent } from 'app/entities/student/student.model';

export interface IGroup {
  id?: number;
  description?: string | null;
  topic?: string | null;
  grade?: number | null;
  students?: IStudent[] | null;
}

export class Group implements IGroup {
  constructor(
    public id?: number,
    public description?: string | null,
    public topic?: string | null,
    public grade?: number | null,
    public students?: IStudent[] | null
  ) {}
}

export function getGroupIdentifier(group: IGroup): number | undefined {
  return group.id;
}
