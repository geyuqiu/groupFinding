import { IGroup } from 'app/entities/group/group.model';

export interface IStudent {
  id?: number;
  name?: string | null;
  group?: IGroup | null;
}

export class Student implements IStudent {
  constructor(public id?: number, public name?: string | null, public group?: IGroup | null) {}
}

export function getStudentIdentifier(student: IStudent): number | undefined {
  return student.id;
}
