console.log('MarketAnalyzer: Wildberries content script loaded');

function extractProductData() {
  const productData = {
    platform: 'wildberries',
    url: window.location.href,
    timestamp: Date.now()
  };

  const priceElement = document.querySelector('.product-page__price-block .price-block__final-price');
  if (priceElement) {
    productData.price = priceElement.textContent.trim();
  }

  const titleElement = document.querySelector('.product-page__title');
  if (titleElement) {
    productData.title = titleElement.textContent.trim();
  }

  const ratingElement = document.querySelector('.product-review__rating');
  if (ratingElement) {
    productData.rating = ratingElement.textContent.trim();
  }

  const reviewsElement = document.querySelector('.product-review__count-review');
  if (reviewsElement) {
    productData.reviews = reviewsElement.textContent.trim();
  }

  const idMatch = window.location.href.match(/\/(\d+)\/detail/);
  if (idMatch) {
    productData.id = idMatch[1];
  }

  return productData;
}

function observeProductChanges() {
  const observer = new MutationObserver(() => {
    if (window.location.href.includes('/detail')) {
      const data = extractProductData();
      chrome.runtime.sendMessage({
        action: 'saveProductData',
        platform: 'wildberries',
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
