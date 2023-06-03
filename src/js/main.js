import {
  getMode,
  modeToggle,
  setPreferredMode,
  searchWithEnter,
} from "./handlers.mjs";

import { root, themeToggle, searchInput } from "./elements.mjs";

setPreferredMode(root, themeToggle);

modeToggle(root, themeToggle);

getMode(root);

searchWithEnter(searchInput);
