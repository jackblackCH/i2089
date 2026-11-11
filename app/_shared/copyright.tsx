import { Text } from "./text";

// Bottom-left of the frame on md+, deliberately out of flow — no column
// reserves a row for it. On mobile the frame scrolls, so a pinned line
// would sit on top of the content; there it closes the page in flow.
// Between md and xl the left column is too narrow for it and the four
// nav links on one line, so it hides; the byline names Marc there.
export function Copyright() {
  return (
    <Text
      variant="footer"
      className="p-pad-tight md:absolute md:bottom-0 md:left-0 md:z-10 md:max-xl:hidden"
    >
      ©2026 Marc Illien, Zürich
    </Text>
  );
}
