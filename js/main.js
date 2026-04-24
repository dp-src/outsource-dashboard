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
