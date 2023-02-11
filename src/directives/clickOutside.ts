/**
 * A directive for handling any click outside that of the specified element
 * Commonly used for closing the dropdowns, when the user clicks away
 */
const clickOutside = (node?: HTMLElement) => {
  const handleClick = (event: MouseEvent) => {
    if (node && !node.contains(event.target as HTMLElement) && !event.defaultPrevented) {
      node.dispatchEvent(new CustomEvent('click_outside'));
    }
  }
  document.addEventListener('click', handleClick, true);
  return {
    destroy() {
      document.removeEventListener('click', handleClick, true);
    }
  }
}

export default clickOutside;
