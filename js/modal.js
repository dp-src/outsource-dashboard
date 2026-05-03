export function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove("collapsed");
}

export function closeModal(modalId, formId = null) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("collapsed");

    if (formId) {
      const form = document.getElementById(formId);
      form.reset();
      const submitBtn = form.querySelector('button[type="submit]');
      if (submitBtn) submitBtn.disabled = true;
    }
  }
}

export function formValidation(formId, submitBtnId) {
  const form = document.getElementById(formId);
  const btn = document.getElementById(submitBtnId);

  form.addEventListener("input", () => {
    btn.disabled = !form.checkValidity();
  });
}
