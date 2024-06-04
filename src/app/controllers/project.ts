import { Project, SubmittedProject, Todo } from '../domain';
import { ProjectService } from '../services';

export class ProjectController {
  constructor(
    private service: ProjectService,
    private controlledNode: HTMLElement,
  ) {}

  // Event handlers
  renderAll() {
    this.controlledNode.innerHTML = '';

    const allProjects = this.service.findAll();

    for (const project of allProjects) {
      const ele = this.createProjectElement(project);
      this.controlledNode.appendChild(ele);
    }
  }

  addNewProject(project: SubmittedProject) {
    const newProject = this.service.create(project);
    const ele = this.createProjectElement(newProject);
    this.controlledNode.appendChild(ele);
  }

  // DOM Nodes
  private createProjectElement(project: Project) {
    const ele = document.createElement('article');
    ele.classList.add('project');
    ele.dataset.projectId = project.id;

    // TODO: Create a classify todo function to separate all todos
    //       in a project according to its due date.

    ele.innerHTML = `
        <header class="project-header">
            <h2>${project.title}</h2>

            <div class="project-actions">
                <button class="action-button" aria-label="Delete project">
                    <i class="fa-solid fa-trash fa-lg close-icon"></i>
                </button>
            </div>
        </header>

        <div class="todo-sections">
            <section class="expired-todos">
                <h3>Placeholder Section</h3>
                <div class="todos">
                    <article class="todo">
                        <input type="checkbox" name="#" id="#">
                        <i class="check-icon fa-regular fa-lg fa-circle"></i>
                        <i class="check-icon fa-regular fa-lg fa-circle-check"></i>
                        <h4 class="text-overflow-ellipsis">Todo title</h4>
                        <div class="todo-actions">
                            <button class="action-button" aria-label="See todo info">
                                <i class="fa-solid fa-eye fa-lg"></i>
                            </button>
                            <button class="action-button" aria-label="Edit todo">
                                <i class="fa-solid fa-pen-to-square fa-lg edit-icon"></i>
                            </button>
                            <button class="action-button" aria-label="Delete todo">
                                <i class="fa-solid fa-trash fa-lg close-icon"></i>
                            </button>
                        </div>
                    </article>
                </div>
            </section>
        </div>
    `;
    return ele;
  }

  private createTodoElement(todo: Todo) {
    const ele = document.createElement('article');
    ele.dataset.todoId = todo.id;
    ele.innerHTML = `
        <input type="checkbox" name="checkbox-${todo.id}" id="checkbox-${todo.id}" ${todo.done ? 'checked' : ''}>
        <i class="check-icon fa-regular fa-lg fa-circle"></i>
        <i class="check-icon fa-regular fa-lg fa-circle-check"></i>
        <h4 class="text-overflow-ellipsis">${todo.title}</h4>
        <div class="todo-actions">
            <button class="action-button" aria-label="See todo info">
                <i class="fa-solid fa-eye fa-lg"></i>
            </button>
            <button class="action-button" aria-label="Edit todo">
                <i class="fa-solid fa-pen-to-square fa-lg edit-icon"></i>
            </button>
            <button class="action-button" aria-label="Delete todo">
                <i class="fa-solid fa-trash fa-lg close-icon"></i>
            </button>
        </div>
    `;
    return ele;
  }

  private createTodoSectionElement(title: string, todos?: Todo[]) {
    const ele = document.createElement('article');
    ele.classList.add('todo-section');
    const titleEle = document.createElement('h3');
    titleEle.textContent = title;
    const todosEle = document.createElement('div');
    todosEle.classList.add('todos');
    if (todos) {
      for (const todo of todos) {
        todosEle.appendChild(this.createTodoElement(todo));
      }
    }
    ele.append(title, todosEle);
    return ele;
  }
}
