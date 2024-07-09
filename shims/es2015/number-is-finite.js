if (!Number.isFinite) {
  Number.isFinite = function IsFinite(value) {
    return typeof value === "number" && isFinite(value);
  };
}
