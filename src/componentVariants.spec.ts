import { componentVariants } from "./componentVariants";

const variants = componentVariants({
  size: { small: "test_small", medium: "test_medium", large: "test_large" },
});

test("Mixin should be of type function", () => {
  expect(typeof variants).toBe("function");
});

test("Selecting variants should return its content", () => {
  const smallVariant = variants({ size: "small", theme: {} });
  const mediumVariant = variants({ size: "medium", theme: {} });
  const largeVariant = variants({ size: "large", theme: {} });

  expect(smallVariant[0]).toBe("test_small");
  expect(mediumVariant[0]).toBe("test_medium");
  expect(largeVariant[0]).toBe("test_large");
});
