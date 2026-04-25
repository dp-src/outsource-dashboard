export function calculateAge(birthDate) {
  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

//estimated payment

export function calculateEstimatedPayment(employee) {
  const { salary, assignments } = employee;

  if (!assignments || assignments.length === 0) {
    return salary * 0.5;
  }

  return assignments.reduce((sum, task) => {
    const effectiveRate = Math.max(0.5, task.capacity);
    return sum + salary * effectiveRate;
  }, 0);
}
