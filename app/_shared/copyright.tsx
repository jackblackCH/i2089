import { Text } from "./text";

// Closes the page on mobile, in flow. On md+ the foot row of the
// wordmark column belongs to the nav (four equal columns, full width),
// so the copyright does not show there; the name is in the logo.
export function Copyright() {
  return (
    <Text
      variant="footer"
      className="px-pad py-[calc(var(--spacing-pad)/2)] md:hidden"
    >
      ©2026 Marc Illien, Zürich
    </Text>
  );
}
