console.log('MarketAnalyzer: Ozon content script loaded');

function extractProductData() {
  const productData = {
    platform: 'ozon',
    url: window.location.href,
    timestamp: Date.now()
  };

  const priceElement = document.querySelector('[data-widget="webPrice"] .c3017-a1');
  if (priceElement) {
    productData.price = priceElement.textContent.trim();
  }

  const titleElement = document.querySelector('[data-widget="webProductHeading"] h1');
  if (titleElement) {
    productData.title = titleElement.textContent.trim();
  }

  const ratingElement = document.querySelector('[data-widget="webReviewProductScore"] .tsBodyControl400Small');
  if (ratingElement) {
    productData.rating = ratingElement.textContent.trim();
  }

  const reviewsElement = document.querySelector('[data-widget="webReviewProductScore"] .tsBodyControl400Small:nth-child(2)');
  if (reviewsElement) {
    productData.reviews = reviewsElement.textContent.trim();
  }

  const idMatch = window.location.href.match(/\/product\/[^-]+-(\d+)/);
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
        platform: 'ozon',
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
