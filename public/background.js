chrome.runtime.onInstalled.addListener(() => {
  console.log('MarketAnalyzer установлен');
  
  chrome.storage.local.set({
    settings: {
      notifications: true,
      autoUpdate: true,
      updateInterval: 3600000
    },
    platforms: {
      wildberries: { connected: false, apiKey: '' },
      ozon: { connected: false, apiKey: '' },
      yandex: { connected: false, apiKey: '' }
    },
    products: [],
    competitors: [],
    analytics: {
      sales: [],
      positions: [],
      ctr: []
    }
  });
});

chrome.alarms.create('updateAnalytics', { periodInMinutes: 60 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'updateAnalytics') {
    updateAllAnalytics();
  }
});

async function updateAllAnalytics() {
  const data = await chrome.storage.local.get(['platforms', 'products']);
  
  if (!data.platforms) return;
  
  const updates = [];
  
  if (data.platforms.wildberries.connected) {
    updates.push(fetchWildberriesData(data.platforms.wildberries.apiKey));
  }
  
  if (data.platforms.ozon.connected) {
    updates.push(fetchOzonData(data.platforms.ozon.apiKey));
  }
  
  if (data.platforms.yandex.connected) {
    updates.push(fetchYandexData(data.platforms.yandex.apiKey));
  }
  
  try {
    const results = await Promise.all(updates);
    await saveAnalyticsData(results);
    
    chrome.notifications.create({
      type: 'basic',
      iconUrl: 'favicon.svg',
      title: 'MarketAnalyzer',
      message: 'Данные обновлены'
    });
  } catch (error) {
    console.error('Ошибка обновления:', error);
  }
}

async function fetchWildberriesData(apiKey) {
  return { platform: 'wildberries', sales: [], positions: [] };
}

async function fetchOzonData(apiKey) {
  return { platform: 'ozon', sales: [], positions: [] };
}

async function fetchYandexData(apiKey) {
  return { platform: 'yandex', sales: [], positions: [] };
}

async function saveAnalyticsData(results) {
  const data = await chrome.storage.local.get(['analytics']);
  const analytics = data.analytics || { sales: [], positions: [], ctr: [] };
  
  results.forEach(result => {
    analytics.sales.push({
      platform: result.platform,
      data: result.sales,
      timestamp: Date.now()
    });
    
    analytics.positions.push({
      platform: result.platform,
      data: result.positions,
      timestamp: Date.now()
    });
  });
  
  await chrome.storage.local.set({ analytics });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getData') {
    chrome.storage.local.get(null, (data) => {
      sendResponse(data);
    });
    return true;
  }
  
  if (request.action === 'saveData') {
    chrome.storage.local.set(request.data, () => {
      sendResponse({ success: true });
    });
    return true;
  }
  
  if (request.action === 'updateNow') {
    updateAllAnalytics().then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
});
