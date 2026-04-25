import { calculateAge } from "./calculations.js";

export function renderProjects() {
  const tableBody = document.querySelector("table tbody");
  const projects = JSON.parse(localStorage.getItem("projects")) || [];

  tableBody.innerHTML = "";

  projects.forEach((project, index) => {
    const row = `<tr>
                            <td>${project.companyName}</td>
                            <td>${project.projectName}</td>
                            <td>$${project.projectBudget}</td>
                            <td>X/${project.employeeCapacity}</td>
                            <td><button class="show-button">Show employees</button></td>
                            <td>$X</td>
                            <td><button class="delete-button" data-index="${index}">Delete</button></td>
                        </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}

export function renderEmployees() {
  const tableBody = document.querySelector("#employees-table-body");
  const employees = JSON.parse(localStorage.getItem("employees")) || [];

  tableBody.innerHTML = "";

  employees.forEach((employee, index) => {
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
                            <button class="assign-button">Assign</button>
                        <button class="delete-button" data-index="${index}">Delete</button></td>
    </tr>`;
    tableBody.insertAdjacentHTML("beforeend", row);
  });
}
