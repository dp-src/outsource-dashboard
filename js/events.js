import { getMonthlyData, saveMonthlyData } from "./storage.js";
import { renderProjects, renderEmployees, showAssignPopup } from "./render.js";

export function initTabs() {
  const navTabs = document.querySelector(".sidebar-nav");
  const tabs = document.querySelectorAll(".nav-item");
  const contents = document.querySelectorAll(".contents");

  if (!navTabs) return;

  navTabs.addEventListener("click", (event) => {
    const clickedTab = event.target.closest(".nav-item");
    if (!clickedTab) return;

    const targetId = clickedTab.dataset.tab;

    contents.forEach((content) => content.classList.add("hidden"));
    tabs.forEach((tab) => tab.classList.remove("active"));

    const activeContent = document.querySelector(`#${targetId}-content`);
    if (activeContent) activeContent.classList.remove("hidden");
    clickedTab.classList.add("active");
  });
}

export function initSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const sidebarCloseButton = document.querySelector(".sidebar-close-button");
  const sidebarOpenButton = document.querySelector(".sidebar-open-button");

  if (!sidebar) return;

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
}

//delete

export function deleteItems(type, id) {
  const monthlyData = getMonthlyData();
  const items = monthlyData[type];

  const itemToDelete = items.find((item) => item.id === id);
  if (!itemToDelete) return;

  const name =
    itemToDelete.projectName ||
    `${itemToDelete.employeeName} ${itemToDelete.employeeSurname}`;
  if (confirm(`Are you sure you want to delete ${name}?`)) {
    monthlyData[type] = items.filter((item) => item.id !== id);

    saveMonthlyData(monthlyData);

    if (type === "projects") renderProjects();
    if (type === "employees") renderEmployees();
  }
}

export function initTableEvents() {
  const assignPopup = document.querySelector(".assign-popup");

  document.addEventListener("click", (event) => {
    // delete
    if (event.target.classList.contains("delete-button")) {
      const id = Number(event.target.dataset.id);
      const type = event.target.dataset.type;

      deleteItems(type, id);
      return;
    }

    // assign open
    if (event.target.classList.contains("assign-button")) {
      const id = Number(event.target.dataset.id);
      const monthlyData = getMonthlyData();

      const employeeToAssign = monthlyData.employees.find(
        (employee) => employee.id === id,
      );
      if (employeeToAssign) {
        event.stopPropagation();
        assignPopup.classList.remove("hidden");
        showAssignPopup(employeeToAssign);
      }
      return;
    }
    // assign close
    const assignCancel = document.querySelector("#assign-modal-cancel");

    if (event.target === assignCancel || !assignPopup.contains(event.target)) {
      assignPopup.innerHTML = "";
      assignPopup.classList.add("hidden");
    }
  });
}
