import { Text } from "./text";

// Bottom-left of the frame on md+, deliberately out of flow — no column
// reserves a row for it. On mobile the frame scrolls, so a pinned line
// would sit on top of the content; there it closes the page in flow.
export function Copyright() {
  return (
    <Text
      variant="footer"
      className="p-pad-tight md:absolute md:bottom-0 md:left-0 md:z-10"
    >
      ©2026 Marc Illien :: i2089 :: Zürich
    </Text>
  );
}
