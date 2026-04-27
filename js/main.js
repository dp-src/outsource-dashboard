import { renderProjects, renderEmployees, showAssignPopup } from "./render.js";
import { getMonthlyData, saveMonthlyData, setDate } from "./storage.js";
import { openModal, closeModal, formValidation } from "./modal.js";
import { initTabs, initSidebar, initTableEvents } from "./events.js";

function refreshUI() {
  renderEmployees();
  renderProjects();
}

initTabs();
initSidebar();
initTableEvents();
refreshUI();

// select month

const monthSelect = document.querySelector(".month-select");
const yearSelect = document.querySelector(".year-select");

monthSelect.addEventListener("change", () => {
  const year = Number(yearSelect.value);
  const month = Number(monthSelect.value);

  setDate(year, month);
  refreshUI();
});

yearSelect.addEventListener("change", () => {
  const year = Number(yearSelect.value);
  const month = Number(monthSelect.value);

  setDate(year, month);
  refreshUI();
});

// birthdate

const dateInput = document.getElementById("birth-date");
const today = new Date();
const maxYear = today.getFullYear() - 18;
const maxDate = new Date(maxYear, today.getMonth(), today.getDate())
  .toISOString()
  .split("T")[0];
dateInput.setAttribute("max", maxDate);

// add project

const addProjectBtn = document.getElementById("add-project");
const projectCancelBtn = document.querySelector("#project-modal-cancel");
const projectForm = document.querySelector("#project-add-form");

addProjectBtn.addEventListener("click", () => openModal("add-new-project"));

projectCancelBtn.addEventListener("click", () =>
  closeModal("add-new-project", "project-add-form"),
);

formValidation("project-add-form", "project-modal-add");

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //collect data
  const formData = new FormData(projectForm);
  const projectData = Object.fromEntries(formData.entries());
  projectData.id = Date.now();
  projectData.capacity = 0;

  // recieve saved data or empty array
  const monthlyData = getMonthlyData();
  monthlyData.projects.push(projectData);
  saveMonthlyData(monthlyData);

  closeModal("add-new-project", "project-add-form");
  renderProjects();
});

// add employee

const addEmployeeBtn = document.getElementById("add-employee");
const employeeCancelBtn = document.querySelector("#employee-modal-cancel");
const employeeForm = document.querySelector("#employee-add-form");

addEmployeeBtn.addEventListener("click", () => openModal("add-new-employee"));

employeeCancelBtn.addEventListener("click", () =>
  closeModal("add-new-employee", "employee-add-form"),
);

formValidation("employee-add-form", "employee-modal-add");

employeeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //collect data
  const formData = new FormData(employeeForm);
  const employeeData = Object.fromEntries(formData.entries());
  employeeData.id = Date.now();
  employeeData.capacity = 0;

  // recieve saved data or empty array
  const monthlyData = getMonthlyData();
  monthlyData.employees.push(employeeData);
  saveMonthlyData(monthlyData);

  closeModal("add-new-employee", "employee-add-form");
  renderEmployees();
});
