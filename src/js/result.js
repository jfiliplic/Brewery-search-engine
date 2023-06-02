import { setPreferredMode, modeToggle, getMode } from "./handlers.js";

import { root, themeToggle } from "./elements.js";

import { displaySingleBreweryInfo } from "./lib.js";

setPreferredMode(root);

modeToggle(root, themeToggle);

getMode(root);

displaySingleBreweryInfo();
