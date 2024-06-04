import { Project, SubmittedProject } from '../domain';

export interface ProjectRepository {
  findAll(): Project[];
  findById(id: string): Project;
  deleteById(id: string): void;
  save(project: SubmittedProject | Project): Project;
}
