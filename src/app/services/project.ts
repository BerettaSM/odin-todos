import { type Project, type SubmittedProject } from '../domain';
import { type ProjectRepository } from '../repositories';
import { validateProject } from '../validation';

export class ProjectService {
  constructor(private repo: ProjectRepository) {}

  save(project: SubmittedProject | Project) {
    validateProject(project);
    return this.repo.save(project);
  }

  findAll() {
    return this.repo.findAll();
  }

  findById(id: string) {
    return this.repo.findById(id);
  }

  deleteById(id: string) {
    return this.repo.deleteById(id);
  }
}
