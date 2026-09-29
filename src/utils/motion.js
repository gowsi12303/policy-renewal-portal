// Scroll behaviour for scrollIntoView(): smooth normally, instant when the
// user has "Reduce motion" turned on. (CSS can't override an explicit
// behavior: 'smooth' passed from JavaScript.)
export function preferredScrollBehavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
}
