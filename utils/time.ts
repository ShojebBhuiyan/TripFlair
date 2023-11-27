export function formatTimeString(input: string): string {
  const inputDate = new Date(input);

  // Ensure the input string is a valid date
  if (isNaN(inputDate.getTime())) {
    return "Invalid date";
  }

  // Format the date components
  const day = inputDate.getDate();
  const month = inputDate.toLocaleString("default", { month: "long" });
  const year = inputDate.getFullYear();
  const time = inputDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Construct the formatted string
  const formattedString = `${day} ${month} ${year}, ${time}`;

  return formattedString;
}
