# Outsource Dashboard

A client-side web application for managing outsource projects and employees. Allows tracking project budgets, employee assignments, capacity allocation, and estimated financial outcomes — all stored locally in the browser, organized by month.

## Features

- **Projects tab** — create and delete projects with company name, project name, budget, and employee capacity limit
- **Employees tab** — create and delete employees with name, surname, date of birth (age auto-calculated), position, and salary
- **Employee assignment** — assign employees to projects via a popup with configurable capacity allocation and project fit sliders; effective capacity is calculated in real time
- **Monthly snapshots** — data is scoped per year/month; switching the period selector loads a separate independent dataset
- **Estimated payment calculation** — unassigned employees are billed at 50% salary (bench cost); assigned employees are billed based on their effective capacity
- **Collapsible sidebar** — sidebar can be hidden to maximize the content area
- **Form validation** — all input fields are validated with inline error messages; the submit button is disabled until the form is valid

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styles | CSS3 |
| Logic | Vanilla JavaScript |
| Persistence | `localStorage` |

## How to Run

No build step or dependencies are required. Open `index.html` directly in any modern browser:

```
# Option 1 — open the file directly
Double-click index.html

# Option 2 — serve locally (recommended to avoid ES module CORS restrictions)

Then navigate to `http://localhost:<port>` in your browser.

## Implementation Notes