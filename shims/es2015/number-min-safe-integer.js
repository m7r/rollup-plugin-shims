// import { MAX_SAFE_INTEGER } from "../common.js";

if (!Number.MIN_SAFE_INTEGER) {
  Number.MIN_SAFE_INTEGER = MAX_SAFE_INTEGER * -1;
}
