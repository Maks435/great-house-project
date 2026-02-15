// Infinite carousel functionality for latest projects section
function initLatestProjectsCarousel() {
  const container = document.querySelector('.sectors__container');
  if (!container) return;

  const track = document.querySelector('.sectors__track');
  let items = document.querySelectorAll('.sectors__item');
  const prevBtn = document.querySelector('.sectors__btn--prev');
  const nextBtn = document.querySelector('.sectors__btn--next');

  if (!track || !items.length || !prevBtn || !nextBtn) return;

  // Clone items for infinite loop
  const originalItems = Array.from(items);
  const itemCount = originalItems.length;

  // Add clones at the end
  originalItems.forEach((item) => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  // Add clones at the beginning
  originalItems.reverse().forEach((item) => {
    const clone = item.cloneNode(true);
    track.insertBefore(clone, track.firstChild);
  });

  // Update items list
  items = track.querySelectorAll('.sectors__item');

  let currentIndex = itemCount; // Start at the first real item (after clones)
  let itemWidth = items[0].offsetWidth;
  let gap = parseFloat(window.getComputedStyle(track).gap) || 28;
  let isTransitioning = false;

  // Function to calculate offset
  function calculateOffset() {
    return -(currentIndex * (itemWidth + gap));
  }

  // Function to update carousel position
  function updateCarouselPosition(skipTransition = false) {
    if (skipTransition) {
      track.style.transition = 'none';
    } else {
      track.style.transition = 'transform 0.6s cubic-bezier(0.35, 0, 0.25, 1)';
    }
    track.style.transform = `translateX(${calculateOffset()}px)`;
  }

  // Function to handle carousel scroll
  function moveCarousel(direction) {
    if (isTransitioning) return;

    isTransitioning = true;
    currentIndex += direction;

    updateCarouselPosition();

    // Wait for transition to complete
    setTimeout(() => {
      // Check if we need to jump to the real items
      if (currentIndex >= itemCount + itemCount) {
        // We've scrolled past the cloned items on the right
        currentIndex = itemCount;
        updateCarouselPosition(true);
      } else if (currentIndex < itemCount) {
        // We've scrolled past the cloned items on the left
        currentIndex = itemCount + itemCount - 1;
        updateCarouselPosition(true);
      }
      isTransitioning = false;
    }, 600);
  }

  // Button handlers
  prevBtn.addEventListener('click', () => {
    moveCarousel(-1);
  });

  nextBtn.addEventListener('click', () => {
    moveCarousel(1);
  });

  // Handle window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      itemWidth = items[0].offsetWidth;
      gap = parseFloat(window.getComputedStyle(track).gap) || 28;
      updateCarouselPosition(true);
    }, 250);
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevBtn.click();
    if (e.key === 'ArrowRight') nextBtn.click();
  });

  // Initialize position
  updateCarouselPosition(true);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLatestProjectsCarousel);
} else {
  initLatestProjectsCarousel();
}

// Also init if loaded via HTMX
document.addEventListener('htmx:afterOnLoad', initLatestProjectsCarousel);
