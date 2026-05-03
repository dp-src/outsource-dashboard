let currentYear = 2026;
let currentMonth = 4;

const getSnapshotKey = () => `${currentYear}-${currentMonth}`;

export function getMonthlyData() {
  const allData = JSON.parse(localStorage.getItem("monthlyData")) || {};
  const key = getSnapshotKey();
  return allData[key] || { projects: [], employees: [] };
}

export function saveMonthlyData(data) {
  const allData = JSON.parse(localStorage.getItem("monthlyData")) || {};
  const key = getSnapshotKey();
  allData[key] = data;
  localStorage.setItem("monthlyData", JSON.stringify(allData));
}

export function setDate(year, month) {
  currentYear = year;
  currentMonth = month;
}

export function getDate() {
  return { currentYear, currentMonth };
}
