console.log('MarketAnalyzer: Yandex Market content script loaded');

function extractProductData() {
  const productData = {
    platform: 'yandex',
    url: window.location.href,
    timestamp: Date.now()
  };

  const priceElement = document.querySelector('[data-auto="Price"] span');
  if (priceElement) {
    productData.price = priceElement.textContent.trim();
  }

  const titleElement = document.querySelector('h1[data-auto="productCardTitle"]');
  if (titleElement) {
    productData.title = titleElement.textContent.trim();
  }

  const ratingElement = document.querySelector('[data-auto="rating-badge"]');
  if (ratingElement) {
    productData.rating = ratingElement.textContent.trim();
  }

  const reviewsElement = document.querySelector('[data-auto="reviews-count"]');
  if (reviewsElement) {
    productData.reviews = reviewsElement.textContent.trim();
  }

  const idMatch = window.location.href.match(/\/product\/(\d+)/);
  if (idMatch) {
    productData.id = idMatch[1];
  }

  return productData;
}

function observeProductChanges() {
  const observer = new MutationObserver(() => {
    if (window.location.href.includes('/product/')) {
      const data = extractProductData();
      chrome.runtime.sendMessage({
        action: 'saveProductData',
        platform: 'yandex',
        data: data
      });
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(observeProductChanges, 1000);
  });
} else {
  setTimeout(observeProductChanges, 1000);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'extractData') {
    const data = extractProductData();
    sendResponse(data);
  }
  return true;
});
