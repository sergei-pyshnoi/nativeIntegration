const testProperties = (id, disableAccessible = false) => ({
  accessible: !disableAccessible,
  accessibilityLabel: id,
  testID: id,
});

export default testProperties;
