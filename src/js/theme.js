export const root = document.querySelector(":root");
export const themeToggle = document.querySelector(".toggle-input");

// export function modeToggle(root, themeToggle) {
//   themeToggle.addEventListener("click", (_) => {
//     root.toggleAttribute("dark");
//   });
// }

export function modeToggle(root, themeToggle) {
  themeToggle.addEventListener("click", (_) => {
    root.toggleAttribute("dark");
  });
}

export function getMode(root) {
  return root.hasAttribute("dark") ? "dark" : "lite";
}
