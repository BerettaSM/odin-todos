import { type SubmittedProject } from '../domain';
import { ProjectService } from '../services';
import { createProjectElement } from '../../dom';

export class ProjectController {
  constructor(
    private service: ProjectService,
    private controlledNode: HTMLElement,
  ) {}

  // Event handlers
  renderAll() {
    this.controlledNode.innerHTML = '';

    // TODO: Filter out projects that have no todo,
    //       no need to render them.

    const allProjects = this.service.findAll();

    for (const project of allProjects) {
      const ele = createProjectElement(project);
      this.controlledNode.appendChild(ele);
    }
  }

  addNewProject(project: SubmittedProject) {
    const newProject = this.service.create(project);
    const ele = createProjectElement(newProject);
    this.controlledNode.appendChild(ele);
  }
}
