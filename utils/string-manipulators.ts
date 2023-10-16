export function addSpacesToPascalCase(input: string): string {
  // Use a regular expression to match uppercase letters and add a space before them
  const spacedString = input.replace(/([A-Z])/g, " $1");

  // Remove leading space, if any
  return spacedString.trim();
}

export function addHyphensToPascalCase(input: string): string {
  // Use a regular expression to match uppercase letters and insert a hyphen before them
  const hyphenatedString = input.replace(/([A-Z])/g, "-$1").toLowerCase();

  // Remove leading hyphen, if any
  return hyphenatedString.replace(/^-/, "");
}
