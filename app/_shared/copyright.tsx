import { Text } from "./text";

// Single bottom row shared by every page — right-aligned, slim padding,
// hairline top border. One source of truth for the copyright line.
export function Copyright() {
  return (
    <Text
      variant="footer"
      className="border-t border-(--np-rule) px-pad py-pad-tight text-right"
    >
      ©2026 Marc Illien :: i2089 :: Zürich
    </Text>
  );
}
