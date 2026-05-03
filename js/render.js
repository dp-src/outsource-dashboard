import { calculateAge } from "./calculations.js";
import { getMonthlyData, saveMonthlyData, getDate } from "./storage.js";
import { popupListeners } from "./events.js";

export function renderProjects() {
  const tableBody = document.querySelector("#projects-table-body");
  const { projects } = getMonthlyData();

  tableBody.innerHTML = "";

  projects.forEach((project, id) => {
    const row = `<tr>
                            <td>${project.companyName}</td>
                            <td>${project.projectName}</td>
                            <td>$${project.projectBudget}</td>
                            <td>${project.currentCapacity}/${project.employeeCapacity}</td>
                            <td><button class="show-button">Show employees</button></td>
                            <td>$X</td>
                            <td><button class="delete-button" data-id="${project.id}" data-type="projects">Delete</button></td>
                        </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

export function renderEmployees() {
  const tableBody = document.querySelector("#employees-table-body");
  const { employees } = getMonthlyData();

  tableBody.innerHTML = "";

  employees.forEach((employee, id) => {
    const age = calculateAge(employee.birthDate);
    const row = `<tr>
                            <td>${employee.employeeName}</td>
                            <td>${employee.employeeSurname}</td>
                            <td>${age}</td>
                            <td>${employee.employeePosition}</td>
                            <td>$${employee.employeeSalary}</td>
                            <td>$X</td>
                            <td><button class="show-button">Show assignments (<span id='assignment-count'>1</span>) <span></span></button></td>
                            <td class="negative-income">$X</td>
                            <td><button class="availability-button">Availability</button>
                            <button class="assign-button" data-id="${employee.id}">Assign</button>
                        <button class="delete-button" data-id="${employee.id}" data-type="employees">Delete</button></td>
    </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

//assign

export function showAssignPopup(employee) {
  const assignPopup = document.querySelector(".assign-popup");
  const { projects } = getMonthlyData();

  const projectOptions = projects.map(
    (p) => `<option value ="${p.id}">${p.projectName}</option>`,
  );

  assignPopup.innerHTML = "";

  const popupContent = `<h2>Assign ${employee.employeeName} ${employee.employeeSurname}</h2>
        <div class="assignment-employee-info">
            Current capacity: ${employee.capacity}/1.5
            <br>
            Available: ${1.5 - employee.capacity}
        </div>
        <select name="selectProject" id="select-project" class="select-project">
            <option value="" disabled selected>Select a project</option>
            ${projectOptions}
        </select>
        <div class="assignment-settings hidden">
            <label for="capacity-allocation">Capacity Allocation: <span id="capacity-allocation">1</span></label>
            <input type="range" id="capacity-allocation-value" min="0" max="1.5" step="0.1" value="1.0">

            <label for="project-fit">Project Fit: <span id="project-fit">1</span></label>
            <input type="range" id="project-fit-value" min="0" max="1" step="0.1" value="1.0">

            <div class="assignment-project-info">
                Project Capacity: <span id="current-project-capacity">0</span>/<span id="max-project-capacity">0</span>
                <br>Effective Capacity: <span id="effective-capacity"></span>
                <br>After Assignment: <span id="capacity-after-assignment"></span> / <span id="total-project-capacity">max project capacity (Employee Capacity) </span>
            </div>
        </div>
        <div class="buttons-section">
            <button type="submit" id="assign-modal-add" class="add-button" disabled>Assign</button>
            <button type="button" id="assign-modal-cancel" class='cancel-button'>Cancel</button>
        </div>`;

  assignPopup.insertAdjacentHTML("beforeend", popupContent);

  const selectElement = document.querySelector("#select-project");

  selectElement.addEventListener("change", () => {
    const assignBtn = document.getElementById("assign-modal-add");
    assignBtn.dataset.projectId = selectElement.value;

    if (selectElement.value !== "") {
      const projectId = Number(selectElement.value);

      if (projectId) {
        const selectedProject = projects.find((p) => p.id === projectId);
        if (selectedProject) {
          document.getElementById("max-project-capacity").textContent =
            selectedProject.employeeCapacity;
          document.getElementById("current-project-capacity").textContent =
            selectedProject.currentCapacity || 0;
          document.getElementById("total-project-capacity").textContent =
            selectedProject.employeeCapacity;

          document
            .querySelector(".assignment-settings")
            .classList.remove("hidden");
          document.getElementById("assign-modal-add").disabled = false;
        }
      }
    }
  });
  popupListeners();
}
