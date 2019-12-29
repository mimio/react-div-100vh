export function use100vh() {
  // if (!document) throw new Error("use100vh hook can't be used outside of browser")
  return document.documentElement.clientHeight || window.innerHeight || 0
}