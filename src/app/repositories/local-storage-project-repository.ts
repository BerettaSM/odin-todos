import { type Project, type SubmittedProject } from '../domain';
import { type ProjectRepository } from './project';
import { findOnLocalStorage, saveOnLocalStorage } from '../../utils';
import {
  ApplicationError,
  ObjectNotFoundError,
  ValidationError,
} from '../errors';

export class LocalStorageProjectRepository implements ProjectRepository {
  private static lsKey = '@PROJECT_REPO' as const;
  private static defaultProjectKey = '@DEFAULT_PROJECT' as const;

  private static projects: Project[];
  private static defaultProject: Project;

  static {
    const defaultProject = findOnLocalStorage<Project>(this.defaultProjectKey);

    if (defaultProject) {
      this.defaultProject = defaultProject;
    } else {
      this.defaultProject = {
        id: this.defaultProjectKey,
        title: 'Default Project',
        todos: [],
      } satisfies Project;
      saveOnLocalStorage(this.defaultProjectKey, this.defaultProject);
    }

    this.projects = findOnLocalStorage<Project[]>(this.lsKey) ?? [];
  }

  findAll(): Project[] {
    const { projects, defaultProject } = LocalStorageProjectRepository;
    return [defaultProject, ...projects];
  }

  findById(id: string): Project {
    const projects = this.findAll();
    const foundProject = projects.find((p) => p.id === id);
    if (!foundProject) {
      throw new ObjectNotFoundError(`Project with id "${id}" does not exist.`);
    }
    return foundProject;
  }

  deleteById(id: string): void {
    const { projects, lsKey, defaultProjectKey } =
      LocalStorageProjectRepository;
    if (id === defaultProjectKey) {
      throw new ApplicationError('Cannot delete default project.');
    }
    const foundProjectIndex = projects.findIndex((p) => p.id === id);
    if (foundProjectIndex === -1) {
      throw new ObjectNotFoundError(`Project with id "${id}" does not exist.`);
    }
    projects.splice(foundProjectIndex, 1);
    saveOnLocalStorage(lsKey, projects);
  }

  save(project: SubmittedProject | Project): Project {
    const { projects, lsKey, defaultProject, defaultProjectKey } =
      LocalStorageProjectRepository;

    let savedProject: Project;
    let savedSubject: Project[] | Project;
    let projectKey: typeof lsKey | typeof defaultProjectKey;

    if (!('id' in project)) {
      const foundProject = projects.find((p) => p.title === project.title);
      if (foundProject) {
        throw new ValidationError(
          `A project with title "${project.title}" already exists.`,
        );
      }
      projectKey = lsKey;
      savedSubject = projects;
      savedProject = {
        id: crypto.randomUUID(),
        title: project.title,
        todos: [],
      };
      projects.push(savedProject);
    } else if (project.id === defaultProjectKey) {
      projectKey = defaultProjectKey;
      savedProject = savedSubject = defaultProject;
    } else {
      const foundProjectIndex = projects.findIndex((p) => p.id === project.id);
      if (foundProjectIndex === -1) {
        throw new ObjectNotFoundError(
          `Project with id "${project.id}" does not exist.`,
        );
      }
      projectKey = lsKey;
      savedSubject = projects;
      savedProject = project;
      projects.splice(foundProjectIndex, 1, savedProject);
    }

    saveOnLocalStorage(projectKey, savedSubject);

    return savedProject;
  }
}
