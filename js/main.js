import { renderProjects, renderEmployees } from "./render.js";

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

const form = document.querySelector("#project-add-form");

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

  // recieve saved data or empty array
  const savedProjects = JSON.parse(localStorage.getItem("projects")) || [];

  savedProjects.push(projectData);

  localStorage.setItem("projects", JSON.stringify(savedProjects));

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

  // recieve saved data or empty array
  const savedEmployees = JSON.parse(localStorage.getItem("employee")) || [];

  savedEmployees.push(employeeData);

  localStorage.setItem("employees", JSON.stringify(savedEmployees));

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
