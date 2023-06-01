export const root = document.querySelector(":root");
export const themeToggle = document.querySelector(".toggle-input");

export function modeToggle(root, themeToggle) {
  themeToggle.addEventListener("click", (_) => {
    root.toggleAttribute("dark");
    root.dispatchEvent(new CustomEvent(`modeToggled`));
  });
}

export function getMode(root) {
  root.addEventListener("modeToggled", (_) => {
    const mode = root.hasAttribute("dark") ? "dark" : null;
    if (mode) {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.removeItem("mode");
    }
  });
}

