import { findOnLocalStorage, saveOnLocalStorage } from '../../utils';
import { Project, SubmittedProject } from '../domain';
import { ObjectNotFoundError, ValidationError } from '../errors';
import { ProjectRepository } from './project';

export class LocalStorageProjectRepository implements ProjectRepository {
  private static lsKey = '@PROJECT_REPO' as const;
  private static defaultProjectKey = '@DEFAULT_PROJECT' as const;

  private static projects: Project[] = [];

  static {
    const projects = findOnLocalStorage<Project[]>(this.lsKey);
    if (projects !== null) {
      this.projects.push(...projects);
    }
  }

  findAll(): Project[] {
    return LocalStorageProjectRepository.projects;
  }

  findById(id: string): Project {
    const { projects } = LocalStorageProjectRepository;
    const foundProject = projects.find((p) => p.id === id);
    if (!foundProject) {
      throw new ObjectNotFoundError(`Project with id "${id}" does not exist.`);
    }
    return foundProject;
  }

  deleteById(id: string): void {
    const { projects, lsKey } = LocalStorageProjectRepository;
    const foundProjectIndex = projects.findIndex((p) => p.id === id);
    if (foundProjectIndex === -1) {
      throw new ObjectNotFoundError(`Project with id "${id}" does not exist.`);
    }
    projects.splice(foundProjectIndex, 1);
    saveOnLocalStorage(lsKey, projects);
  }

  save(project: SubmittedProject | Project): Project {
    const { projects, lsKey } = LocalStorageProjectRepository;

    let savedProject: Project;

    if (!('id' in project)) {
      const foundProject = projects.find((p) => p.title === project.title);
      if (foundProject) {
        throw new ValidationError(
          `A project with title "${project.title}" already exists.`,
        );
      }
      savedProject = {
        id: crypto.randomUUID(),
        title: project.title,
        todos: [],
      };
      projects.push(savedProject);
    } else {
      const foundProjectIndex = projects.findIndex((p) => p.id === project.id);
      if (foundProjectIndex === -1) {
        throw new ObjectNotFoundError(
          `Project with id "${project.id}" does not exist.`,
        );
      }
      savedProject = project;
      projects.splice(foundProjectIndex, 1, savedProject);
    }

    saveOnLocalStorage(lsKey, projects);

    return savedProject;
  }
}
