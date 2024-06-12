import {
  type SubmittedTodo,
  type SubmittedProject,
  type Project,
} from '../domain';
import { ProjectService, TodoService } from '../services';
import { createProjectElement } from '../../dom';

export class ProjectController {
  constructor(
    private projectService: ProjectService,
    private todoService: TodoService,
    private controlledNode: HTMLElement,
  ) {}

  // Event handlers
  renderAll() {
    this.controlledNode.innerHTML = '';

    const allProjects = this.projectService.findAll();

    for (const project of allProjects) {
      this.renderProject(project);
    }
  }

  addNewProject(project: SubmittedProject) {
    const newProject = this.projectService.save(project);
    this.renderProject(newProject);
    return newProject;
  }

  addNewTodo(todo: SubmittedTodo) {
    const newTodo = this.todoService.save(todo);
    const project = this.projectService.findById(newTodo.projectId);
    this.renderProject(project);
    return newTodo;
  }

  deleteProject(projectId: string) {
    this.projectService.deleteById(projectId);
    const ele = this.controlledNode.querySelector(
      `[data-project-id="${projectId}"]`,
    );
    ele?.remove();
  }

  renderProject(project: Project) {
    const ele = createProjectElement(project);
    const existingProject = this.controlledNode.querySelector(
      `[data-project-id="${project.id}"]`,
    );

    if (existingProject) {
      this.controlledNode.replaceChild(ele, existingProject);
    } else {
      this.controlledNode.appendChild(ele);
    }
  }
}
