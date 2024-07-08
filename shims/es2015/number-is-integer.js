if (!Number.isInteger) {
  Number.isInteger = function isInteger(value) {
    return (
      typeof value === "number" &&
      isFinite(value) &&
      Math.floor(value) === value
    );
  };
}
