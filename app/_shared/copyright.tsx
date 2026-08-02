import { Text } from "./text";

// Pinned to the bottom-left of the frame on every page. Deliberately out of
// flow — no column reserves a row for it, so it costs the layout nothing.
export function Copyright() {
  return (
    <Text
      variant="footer"
      className="fixed bottom-0 left-0 z-50 p-pad-tight"
    >
      ©2026 Marc Illien :: i2089 :: Zürich
    </Text>
  );
}
