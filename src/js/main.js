import {
  getMode,
  modeToggle,
  setPreferredMode,
  searchWithEnter,
} from "./handlers.js";

import { root, themeToggle, searchInput } from "./elements.js";

setPreferredMode(root);

modeToggle(root, themeToggle);

getMode(root);

searchWithEnter(searchInput);
