export const root = document.querySelector(":root");
export const themeToggle = document.querySelector(".toggle-input");

// export function themeToggle(root, themeToggle) {
//   themeToggle.addEventListener("click", (_) => {
//     root.toggleAttribute("dark");
//   });
// }

export function modeToggle(root, themeToggle) {
  themeToggle.addEventListener("click", (_) => {
    root.toggleAttribute("dark");
    getMode();
  });
}

export function getMode(root) {
  if (root.hasAttribute("dark")) {
    const mode = "dark";
    console.log(mode);
    return mode;
  }
}
