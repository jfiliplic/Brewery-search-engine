import { setPreferredMode, modeToggle, getMode } from "./handlers.mjs";

import { root, themeToggle } from "./elements.mjs";

import { displaySingleBreweryInfo } from "./lib.mjs";

setPreferredMode(root, themeToggle);

modeToggle(root, themeToggle);

getMode(root);

displaySingleBreweryInfo();
