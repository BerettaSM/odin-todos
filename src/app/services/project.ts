import { SubmittedProject } from '../domain';
import { type ProjectRepository } from '../repositories';

export class ProjectService {
  constructor(private repo: ProjectRepository) {}

  create(project: SubmittedProject) {
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
