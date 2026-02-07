import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

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

  const platformStats = [
    { platform: 'Wildberries', sales: '1,245', revenue: '₽2,450,000', growth: '+15%', color: 'bg-purple-500' },
    { platform: 'Ozon', sales: '856', revenue: '₽1,680,000', growth: '+8%', color: 'bg-blue-500' },
    { platform: 'Яндекс', sales: '432', revenue: '₽890,000', growth: '+22%', color: 'bg-yellow-500' },
  ];

  const topProducts = [
    { name: 'Смартфон XYZ Pro', position: 3, sales: 342, ctr: '4.2%', status: 'up' },
    { name: 'Наушники Wireless', position: 7, sales: 289, ctr: '3.8%', status: 'up' },
    { name: 'Чехол Premium', position: 12, sales: 234, ctr: '3.1%', status: 'down' },
    { name: 'Зарядка Fast Charge', position: 5, sales: 198, ctr: '4.5%', status: 'up' },
  ];

  const competitors = [
    { name: 'Конкурент А', price: '₽12,990', position: 2, rating: 4.8 },
    { name: 'Конкурент Б', price: '₽11,490', position: 4, rating: 4.6 },
    { name: 'Конкурент В', price: '₽13,990', position: 6, rating: 4.7 },
  ];

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
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon name="User" size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-sidebar-foreground">Пользователь</p>
              <p className="text-xs text-muted-foreground">seller@example.com</p>
            </div>
          </div>
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

              <Card>
                <CardHeader>
                  <CardTitle>Топ товаров</CardTitle>
                  <CardDescription>Самые продаваемые позиции за последнюю неделю</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon name="Package" size={20} className="text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">Позиция #{product.position}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="font-semibold">{product.sales}</p>
                            <p className="text-xs text-muted-foreground">продаж</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-primary">{product.ctr}</p>
                            <p className="text-xs text-muted-foreground">CTR</p>
                          </div>
                          <Icon 
                            name={product.status === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                            size={20} 
                            className={product.status === 'up' ? 'text-green-500' : 'text-red-500'}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Динамика продаж</CardTitle>
                    <CardDescription>График за последние 30 дней</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-end justify-between gap-2">
                      {[65, 59, 80, 81, 56, 72, 69, 85, 92, 78, 88, 95, 89, 76, 82].map((height, idx) => (
                        <div key={idx} className="flex-1 bg-primary/20 rounded-t hover:bg-primary transition-colors" style={{ height: `${height}%` }}></div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Мониторинг конкурентов</CardTitle>
                    <CardDescription>Топ конкуренты по вашей категории</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {competitors.map((competitor, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                          <div>
                            <p className="font-medium">{competitor.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">Поз. {competitor.position}</Badge>
                              <div className="flex items-center gap-1">
                                <Icon name="Star" size={14} className="text-yellow-500 fill-yellow-500" />
                                <span className="text-xs text-muted-foreground">{competitor.rating}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-lg font-bold text-primary">{competitor.price}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
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
                  <Tabs defaultValue="day" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 max-w-md">
                      <TabsTrigger value="day">День</TabsTrigger>
                      <TabsTrigger value="week">Неделя</TabsTrigger>
                      <TabsTrigger value="month">Месяц</TabsTrigger>
                    </TabsList>
                    <TabsContent value="day" className="mt-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-3xl font-bold text-primary">342</div>
                            <p className="text-sm text-muted-foreground mt-1">Продаж сегодня</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-3xl font-bold text-primary">₽684,000</div>
                            <p className="text-sm text-muted-foreground mt-1">Выручка за день</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-3xl font-bold text-green-500">+12%</div>
                            <p className="text-sm text-muted-foreground mt-1">Рост к вчера</p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'positions' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Мониторинг позиций карточек</CardTitle>
                  <CardDescription>Отслеживание позиций товаров в поиске</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, idx) => (
                      <div key={idx} className="p-4 border border-border rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">Текущая позиция: #{product.position}</p>
                          </div>
                          <Badge variant={product.status === 'up' ? 'default' : 'destructive'}>
                            {product.status === 'up' ? '↑ Растет' : '↓ Падает'}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'competitors' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Мониторинг конкурентов</CardTitle>
                  <CardDescription>Сравнение цен и предложений конкурентов</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {competitors.map((competitor, idx) => (
                      <Card key={idx}>
                        <CardContent className="pt-6">
                          <h3 className="font-semibold text-lg mb-2">{competitor.name}</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Цена:</span>
                              <span className="font-bold text-primary">{competitor.price}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Позиция:</span>
                              <span className="font-medium">#{competitor.position}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Рейтинг:</span>
                              <span className="font-medium">{competitor.rating}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'ctr' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Анализ кликабельности (CTR)</CardTitle>
                  <CardDescription>Статистика кликов по карточкам товаров</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, idx) => (
                      <div key={idx} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <p className="font-medium">{product.name}</p>
                          <Badge variant="outline">{product.ctr}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Показы</p>
                            <p className="font-semibold text-lg">{Math.floor(Math.random() * 10000)}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Клики</p>
                            <p className="font-semibold text-lg">{Math.floor(Math.random() * 500)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'keywords' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Анализ ключевых слов</CardTitle>
                  <CardDescription>Исследование запросов и рекомендации по оптимизации</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['смартфон недорого', 'телефон купить', 'телефон с доставкой', 'смартфон акция'].map((keyword, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center gap-3">
                          <Icon name="Search" size={18} className="text-muted-foreground" />
                          <span className="font-medium">{keyword}</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">{Math.floor(Math.random() * 5000)} запросов</span>
                          <Badge variant="secondary">Высокий</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'reports' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Отчеты и графики</CardTitle>
                  <CardDescription>Детальные отчеты о продажах и эффективности</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="h-48 flex items-end justify-between gap-2">
                          {[45, 52, 48, 65, 59, 72, 68, 75].map((height, idx) => (
                            <div key={idx} className="flex-1 bg-primary/30 rounded-t" style={{ height: `${height}%` }}></div>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground text-center mt-4">Продажи по дням недели</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Wildberries</span>
                            <span className="font-semibold">48%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '48%' }}></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Ozon</span>
                            <span className="font-semibold">32%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Яндекс</span>
                            <span className="font-semibold">20%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground text-center mt-4">Распределение по площадкам</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'notifications' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Уведомления о изменениях</CardTitle>
                  <CardDescription>Настройте уведомления о важных событиях</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { text: 'Изменение цены у конкурента', time: '2 часа назад', type: 'warning' },
                      { text: 'Падение позиции товара', time: '5 часов назад', type: 'alert' },
                      { text: 'Необходимо пополнить запасы', time: '1 день назад', type: 'info' },
                      { text: 'Рост CTR на 15%', time: '2 дня назад', type: 'success' },
                    ].map((notif, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 border border-border rounded-lg">
                        <Icon name="Bell" size={18} className="text-primary" />
                        <div className="flex-1">
                          <p className="font-medium">{notif.text}</p>
                          <p className="text-xs text-muted-foreground">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'reviews' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Анализ отзывов</CardTitle>
                  <CardDescription>Сбор и анализ отзывов о ваших товарах</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { rating: 5, text: 'Отличный товар, быстрая доставка!', author: 'Иван И.', date: '2 дня назад' },
                      { rating: 4, text: 'Хорошее качество, рекомендую', author: 'Мария С.', date: '3 дня назад' },
                      { rating: 3, text: 'Нормально, но цена завышена', author: 'Петр К.', date: '5 дней назад' },
                    ].map((review, idx) => (
                      <div key={idx} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Icon 
                                key={i} 
                                name="Star" 
                                size={14} 
                                className={i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-sm mb-2">{review.text}</p>
                        <p className="text-xs text-muted-foreground">{review.author}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeSection === 'settings' && (
            <div className="space-y-6 animate-fade-in">
              <Card>
                <CardHeader>
                  <CardTitle>Настройки и профиль</CardTitle>
                  <CardDescription>Управление аккаунтом и настройками плагина</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Подключенные площадки</h3>
                      <div className="space-y-2">
                        {['Wildberries', 'Ozon', 'Яндекс.Маркет'].map((platform) => (
                          <div key={platform} className="flex items-center justify-between p-3 border border-border rounded-lg">
                            <span className="font-medium">{platform}</span>
                            <Badge variant="default">Подключено</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Язык интерфейса</h3>
                      <div className="flex gap-2">
                        <Badge variant="default">Русский</Badge>
                        <Badge variant="outline">English</Badge>
                      </div>
                    </div>
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
