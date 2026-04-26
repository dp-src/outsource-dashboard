import { renderProjects, renderEmployees, showAssignPopup } from "./render.js";

let currentYear = 2026;
let currentMonth = 4;
const getSnapshotKey = () => `${currentYear}-${currentMonth}`;

//load monthlyData

export function getMonthlyData() {
  const allData = JSON.parse(localStorage.getItem("monthlyData")) || {};
  const key = getSnapshotKey();

  return allData[key] || { projects: [], employees: [] };
}

//save monthlyData

export function saveMonthlyData(data) {
  const allData = JSON.parse(localStorage.getItem("monthlyData")) || {};
  const key = getSnapshotKey();

  allData[key] = data;
  localStorage.setItem("monthlyData", JSON.stringify(allData));
}

// select month

const monthSelect = document.querySelector(".month-select");
const yearSelect = document.querySelector(".year-select");

monthSelect.addEventListener("change", (event) => {
  currentMonth = Number(event.target.value);
  refreshUI();
});

yearSelect.addEventListener("change", (event) => {
  currentYear = Number(event.target.value);
  refreshUI();
});

function refreshUI() {
  renderEmployees();
  renderProjects();
}

// switch tabs

const navTabs = document.querySelector(".sidebar-nav");
const tabs = document.querySelectorAll(".nav-item");
const contents = document.querySelectorAll(".contents");

function switchTab(targetId) {
  contents.forEach((content) => {
    content.classList.add("hidden");
  });

  tabs.forEach((tab) => {
    tab.classList.remove("active");
  });

  const activeTab = document.querySelector(`[data-tab="${targetId}"]`);
  const activeContent = document.querySelector(`#${targetId}-content`);

  if (activeContent) {
    activeContent.classList.remove("hidden");
  }

  if (activeTab) {
    activeTab.classList.add("active");
  }
}

navTabs.addEventListener("click", (event) => {
  const clickedTab = event.target.closest(".nav-item");

  if (clickedTab) {
    const tabId = clickedTab.dataset.tab; // Берем id из data-attribute
    switchTab(tabId);
  }
});

// sidebar

const sidebar = document.querySelector(".sidebar");
const sidebarCloseButton = document.querySelector(".sidebar-close-button");
const sidebarOpenButton = document.querySelector(".sidebar-open-button");

document.addEventListener("click", (event) => {
  const closeTarget = event.target.closest(".sidebar-close-button");
  const openTarget = event.target.closest(".sidebar-open-button");

  if (closeTarget) {
    sidebar.classList.add("collapsed");
    sidebarOpenButton.classList.remove("hidden");
  }

  if (openTarget) {
    sidebar.classList.remove("collapsed");
    sidebarOpenButton.classList.add("hidden");
  }
});

// add project

//open modal

const form = document.querySelector("#project-add-form");
const contentHeader = document.querySelector(".header");
const addProjectBtn = document.getElementById("add-project");
const addProjectModal = document.getElementById("add-new-project");

addProjectBtn.addEventListener("click", (event) => {
  addProjectModal.classList.remove("collapsed");
});

// cancel

const projectAddBtn = document.querySelector("#project-modal-add");
const projectCancelBtn = document.querySelector("#project-modal-cancel");

projectCancelBtn.addEventListener("click", (event) => {
  addProjectModal.classList.add("collapsed");
  form.reset();
});

// add button activation

form.addEventListener("input", (event) => {
  if (form.checkValidity()) {
    projectAddBtn.disabled = false;
  } else {
    projectAddBtn.disabled = true;
  }
});

// add project data

form.addEventListener("submit", (event) => {
  event.preventDefault();

  //collect data
  const formData = new FormData(form);
  const projectData = Object.fromEntries(formData.entries());

  projectData.id = Date.now();

  // recieve saved data or empty array
  const monthlyData = getMonthlyData();
  monthlyData.projects.push(projectData);
  saveMonthlyData(monthlyData);

  addProjectModal.classList.add("collapsed");
  form.reset();
  projectAddBtn.disabled = true;

  renderProjects();
});

// add employee

//open modal
const addEmployeeBtn = document.getElementById("add-employee");
const addEmployeeModal = document.getElementById("add-new-employee");

addEmployeeBtn.addEventListener("click", (event) => {
  addEmployeeModal.classList.remove("collapsed");
});

// cancel

const employeeAddBtn = document.querySelector("#employee-modal-add");
const employeeCancelBtn = document.querySelector("#employee-modal-cancel");

employeeCancelBtn.addEventListener("click", (event) => {
  addEmployeeModal.classList.add("collapsed");
  employeeForm.reset();
});

// add button activation

const employeeForm = document.querySelector("#employee-add-form");

employeeForm.addEventListener("input", (event) => {
  if (employeeForm.checkValidity()) {
    employeeAddBtn.disabled = false;
  } else {
    employeeAddBtn.disabled = true;
  }
});

// add employee data

employeeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  //collect data
  const formData = new FormData(employeeForm);
  const employeeData = Object.fromEntries(formData.entries());

  employeeData.id = Date.now();

  // recieve saved data or empty array
  const monthlyData = getMonthlyData();
  monthlyData.employees.push(employeeData);
  saveMonthlyData(monthlyData);

  addEmployeeModal.classList.add("collapsed");
  employeeForm.reset();
  employeeAddBtn.disabled = true;

  renderEmployees();
});

renderProjects();
renderEmployees();

// birthdate

const dateInput = document.getElementById("birth-date");
const today = new Date();
const maxYear = today.getFullYear() - 18;
const maxDate = new Date(maxYear, today.getMonth(), today.getDate())
  .toISOString()
  .split("T")[0];
dateInput.setAttribute("max", maxDate);

// delete project

function deleteProject(id) {
  let monthlyData = getMonthlyData();

  const projectToDelete = monthlyData.projects.find(
    (project) => project.id === id,
  );
  if (!projectToDelete) return;

  const isConfirmed = confirm(
    `Are you sure you want to delete ${projectToDelete.projectName} project?`,
  );

  if (isConfirmed) {
    monthlyData.projects = monthlyData.projects.filter(
      (project) => project.id !== id,
    );
    saveMonthlyData(monthlyData);
    renderProjects();
  }
}

document
  .querySelector("#projects-table-body")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
      const id = Number(event.target.dataset.id);
      deleteProject(id);
    }
  });

// delete employee

function deleteEmployee(id) {
  let monthlyData = getMonthlyData();

  const employeeToDelete = monthlyData.employees.find(
    (employee) => employee.id === id,
  );
  if (!employeeToDelete) return;

  const isConfirmed = confirm(
    `Are you sure you want to delete ${employeeToDelete.employeeName} ${employeeToDelete.employeeSurname}?`,
  );

  if (isConfirmed) {
    monthlyData.employees = monthlyData.employees.filter(
      (employee) => employee.id !== id,
    );

    saveMonthlyData(monthlyData);
    renderEmployees();
  }
}

document
  .querySelector("#employees-table-body")
  .addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-button")) {
      const id = Number(event.target.dataset.id);
      deleteEmployee(id);
    }
  });

// assign

const assignBtn = document.querySelector(".assign-button");
const assignPopup = document.querySelector(".assign-popup");

assignBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  assignPopup.classList.remove("hidden");
  showAssignPopup();
});

document.addEventListener("click", (event) => {
  const assignCancel = document.querySelector("#assign-modal-cancel");

  if (event.target === assignCancel || !assignPopup.contains(event.target)) {
    assignPopup.innerHTML = "";
    assignPopup.classList.add("hidden");
  }
});
