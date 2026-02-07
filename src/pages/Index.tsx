import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

declare const chrome: any;

interface PlatformStat {
  platform: string;
  sales: string;
  revenue: string;
  growth: string;
  color: string;
}

interface Product {
  name: string;
  position: number;
  sales: number;
  ctr: string;
  status: string;
}

interface Competitor {
  name: string;
  price: string;
  position: number;
  rating: number;
}

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [platformStats, setPlatformStats] = useState<PlatformStat[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [competitors, setCompetitors] = useState<Competitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const menuItems = [
    { id: 'dashboard', label: 'Дашборд', icon: 'LayoutDashboard' },
    { id: 'sales', label: 'Анализ продаж', icon: 'TrendingUp' },
    { id: 'positions', label: 'Позиции карточек', icon: 'Target' },
    { id: 'competitors', label: 'Конкуренты', icon: 'Users' },
    { id: 'ctr', label: 'Кликабельность', icon: 'MousePointer' },
    { id: 'keywords', label: 'Ключевые слова', icon: 'Search' },
    { id: 'reports', label: 'Отчеты', icon: 'BarChart3' },
    { id: 'notifications', label: 'Уведомления', icon: 'Bell' },
    { id: 'reviews', label: 'Отзывы', icon: 'MessageSquare' },
    { id: 'settings', label: 'Настройки', icon: 'Settings' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
        chrome.runtime.sendMessage({ action: 'getData' }, (response: any) => {
          if (response) {
            processStoredData(response);
          } else {
            loadDefaultData();
          }
          setIsLoading(false);
        });
      } else {
        loadDefaultData();
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
      loadDefaultData();
      setIsLoading(false);
    }
  };

  const loadDefaultData = () => {
    setPlatformStats([
      { platform: 'Wildberries', sales: '0', revenue: '₽0', growth: '0%', color: 'bg-purple-500' },
      { platform: 'Ozon', sales: '0', revenue: '₽0', growth: '0%', color: 'bg-blue-500' },
      { platform: 'Яндекс', sales: '0', revenue: '₽0', growth: '0%', color: 'bg-yellow-500' },
    ]);
    setTopProducts([]);
    setCompetitors([]);
  };

  const processStoredData = (data: any) => {
    if (data.analytics && data.analytics.sales) {
      const stats: PlatformStat[] = [
        { platform: 'Wildberries', sales: '0', revenue: '₽0', growth: '0%', color: 'bg-purple-500' },
        { platform: 'Ozon', sales: '0', revenue: '₽0', growth: '0%', color: 'bg-blue-500' },
        { platform: 'Яндекс', sales: '0', revenue: '₽0', growth: '0%', color: 'bg-yellow-500' },
      ];
      setPlatformStats(stats);
    } else {
      loadDefaultData();
    }
  };

  const handleUpdateData = async () => {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      toast({
        title: 'Обновление данных',
        description: 'Запрос на обновление отправлен',
      });
      
      chrome.runtime.sendMessage({ action: 'updateNow' }, (response: any) => {
        if (response && response.success) {
          toast({
            title: 'Успешно',
            description: 'Данные обновлены',
          });
          loadData();
        }
      });
    } else {
      toast({
        title: 'Ошибка',
        description: 'Плагин работает только в браузере Chrome/Edge',
        variant: 'destructive',
      });
    }
  };

  const handleConnectPlatform = async (platform: string, apiKey: string) => {
    if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.sendMessage) {
      const data = {
        platforms: {
          [platform]: { connected: true, apiKey }
        }
      };
      
      chrome.runtime.sendMessage({ action: 'saveData', data }, (response: any) => {
        if (response && response.success) {
          toast({
            title: 'Успешно',
            description: `${platform} подключен`,
          });
        }
      });
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="BarChart3" size={24} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">MarketAnalyzer</h1>
              <p className="text-xs text-muted-foreground">Аналитика маркетплейсов</p>
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'default' : 'ghost'}
                className="w-full justify-start gap-3 hover-scale"
                onClick={() => setActiveSection(item.id)}
              >
                <Icon name={item.icon} size={20} />
                <span>{item.label}</span>
              </Button>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 border-t border-sidebar-border">
          <Button 
            onClick={handleUpdateData}
            className="w-full gap-2"
            variant="outline"
          >
            <Icon name="RefreshCw" size={16} />
            Обновить данные
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              {menuItems.find(item => item.id === activeSection)?.label}
            </h2>
            <p className="text-muted-foreground">
              Мониторинг и анализ продаж на маркетплейсах в реальном времени
            </p>
          </div>

          {activeSection === 'dashboard' && (
            <div className="space-y-6 animate-fade-in">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <Icon name="Loader2" size={32} className="animate-spin text-primary" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {platformStats.map((stat) => (
                      <Card key={stat.platform} className="hover-scale">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium flex items-center justify-between">
                            {stat.platform}
                            <Badge variant="outline" className="ml-2">{stat.growth}</Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div>
                              <p className="text-2xl font-bold">{stat.sales}</p>
                              <p className="text-xs text-muted-foreground">Продаж за 30 дней</p>
                            </div>
                            <div>
                              <p className="text-xl font-semibold text-primary">{stat.revenue}</p>
                              <p className="text-xs text-muted-foreground">Выручка</p>
                            </div>
                            <div className={`h-2 ${stat.color} rounded-full mt-3`}></div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {topProducts.length === 0 && (
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center py-12">
                          <Icon name="Package" size={48} className="mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Нет данных</h3>
                          <p className="text-muted-foreground mb-4">
                            Подключите платформы в настройках для начала анализа
                          </p>
                          <Button onClick={() => setActiveSection('settings')}>
                            Перейти к настройкам
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Подключение платформ</CardTitle>
                  <CardDescription>Введите API ключи для интеграции с маркетплейсами</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {['wildberries', 'ozon', 'yandex'].map((platform) => (
                      <div key={platform} className="space-y-3 p-4 border border-border rounded-lg">
                        <Label className="text-base font-semibold capitalize">{platform}</Label>
                        <div className="flex gap-2">
                          <Input 
                            placeholder={`API ключ ${platform}`}
                            type="password"
                            id={`api-${platform}`}
                          />
                          <Button 
                            onClick={() => {
                              const input = document.getElementById(`api-${platform}`) as HTMLInputElement;
                              if (input && input.value) {
                                handleConnectPlatform(platform, input.value);
                              }
                            }}
                          >
                            Подключить
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Получите API ключ в личном кабинете продавца на {platform}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Настройки уведомлений</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Включить уведомления</Label>
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Автообновление данных</Label>
                      <input type="checkbox" defaultChecked className="w-4 h-4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'sales' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Анализ продаж</CardTitle>
                  <CardDescription>Детальная статистика по продажам товаров</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Icon name="TrendingUp" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      Данные появятся после подключения платформ
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
