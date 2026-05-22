export const BRAND = {
  name: "Rcode11",
  shortName: "R11",
  tagline: "Не просто дизайн. Восприятие.",
  taglineAlt: "Визуальные системы, которые продают за вас.",
  subTagline:
    "Премиальные аватарки, баннеры, логотипы, превью и карточки товаров для тех, кто отказался выглядеть средне.",
  experienceYears: 2,
  reviews: 750,
  orders: 1000,
  rating: 4.97,
  repeatRate: 62,
  funpay: "https://funpay.com/users/9159608/",
  telegram: "https://t.me/rcode11",
  telegramHandle: "@rcode11",
  email: "studio@rcode11.com",
  domain: "rcode11.studio",
} as const;

export const NAV_LINKS = [
  { label: "Работы", href: "#portfolio" },
  { label: "Услуги", href: "#services" },
  { label: "Процесс", href: "#process" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "Контакты", href: "#contact" },
] as const;

export type PortfolioCategory =
  | "Аватарки"
  | "Баннеры"
  | "Логотипы"
  | "Превью"
  | "Карточки товаров";

export type PortfolioKind =
  | "avatar"
  | "banner"
  | "logo"
  | "thumbnail"
  | "product-card";

export type PortfolioItem = {
  id: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  year: number;
  metric: string;
  accent: "gold" | "violet" | "crimson" | "ice" | "ember";
  layout: "wide" | "tall" | "square";
  kind: PortfolioKind;
  copy: string;
  ticker: string;
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "p-01",
    title: "STORM // Avatar",
    client: "Storm · Twitch",
    category: "Аватарки",
    year: 2025,
    metric: "+38% к подпискам",
    accent: "ember",
    layout: "square",
    kind: "avatar",
    copy: "Аватарка для топ-стримера. Лицо канала за 0.3 секунды — узнаётся в любой ленте.",
    ticker: "AVATAR · 1:1 · 1024px",
  },
  {
    id: "p-02",
    title: "Monogram Mk-II",
    client: "Под NDA",
    category: "Аватарки",
    year: 2025,
    metric: "Авторский знак",
    accent: "gold",
    layout: "square",
    kind: "avatar",
    copy: "Минимальная аватарка-монограмма для приватного бренда. Без лица — только характер.",
    ticker: "MONO · 1:1 · VECTOR",
  },
  {
    id: "p-03",
    title: "Apex Channel Banner",
    client: "Apex Streamer Network",
    category: "Баннеры",
    year: 2025,
    metric: "Brand-pack",
    accent: "crimson",
    layout: "wide",
    kind: "banner",
    copy: "Шапка YouTube-канала + Twitch-баннер + watermark. Единая система для всех платформ.",
    ticker: "YT · TW · 2560×1440",
  },
  {
    id: "p-04",
    title: "Frostline Launch",
    client: "Frostline Studios",
    category: "Баннеры",
    year: 2024,
    metric: "Лонч-кампания",
    accent: "ice",
    layout: "wide",
    kind: "banner",
    copy: "Key-visuals для запуска AA-игры — обложки, соцсети, сторы, ad-сеты.",
    ticker: "KEY ART · 16 ФОРМАТОВ",
  },
  {
    id: "p-05",
    title: "Obsidian Esports",
    client: "Obsidian.GG",
    category: "Логотипы",
    year: 2025,
    metric: "Полный логопак",
    accent: "gold",
    layout: "tall",
    kind: "logo",
    copy: "Логотип киберспортивной команды. Основной знак, монограмма, broadcast-вариант, цветовая система.",
    ticker: "LOGO PACK · SVG · 6 ФАЙЛОВ",
  },
  {
    id: "p-06",
    title: "Reign Mark",
    client: "Reign Network",
    category: "Логотипы",
    year: 2025,
    metric: "Личный знак",
    accent: "gold",
    layout: "tall",
    kind: "logo",
    copy: "Личный логотип-знак для шоураннера. Геометрия с характером, читается с 16 пикселей.",
    ticker: "MARK · VECTOR · 1:1",
  },
  {
    id: "p-07",
    title: "Operation Nightfall",
    client: "Apex Streamer Network",
    category: "Превью",
    year: 2025,
    metric: "+312% CTR",
    accent: "crimson",
    layout: "wide",
    kind: "thumbnail",
    copy: "Кинематографичная серия превью. Конверсия в клик удвоилась за две недели.",
    ticker: "YT · 1280×720 · СЕРИЯ",
  },
  {
    id: "p-08",
    title: "Reign Drop",
    client: "Reign Network",
    category: "Превью",
    year: 2025,
    metric: "+220% watch-time",
    accent: "gold",
    layout: "wide",
    kind: "thumbnail",
    copy: "Превью-стек для еженедельного шоу из 12 эпизодов. Сделано так, чтобы палец остановился первым.",
    ticker: "СЕРИЯ · 12 EP · YT",
  },
  {
    id: "p-09",
    title: "Aurum Card",
    client: "Aurum Capital",
    category: "Карточки товаров",
    year: 2025,
    metric: "Premium-листинг",
    accent: "gold",
    layout: "tall",
    kind: "product-card",
    copy: "Карточка товара для премиум-категории маркетплейса. CTR +47% против стокового шаблона.",
    ticker: "WB · 900×1200 · 6 ФОТО",
  },
  {
    id: "p-10",
    title: "Velour Drop",
    client: "Velour Club",
    category: "Карточки товаров",
    year: 2025,
    metric: "Limited collection",
    accent: "violet",
    layout: "tall",
    kind: "product-card",
    copy: "Карточки лимитированной коллекции. Системная упаковка под Ozon, Wildberries и собственный лендинг.",
    ticker: "OZON · WB · LANDING",
  },
];

export const PORTFOLIO_CATEGORIES: ("Все" | PortfolioCategory)[] = [
  "Все",
  "Аватарки",
  "Баннеры",
  "Логотипы",
  "Превью",
  "Карточки товаров",
];

export const SERVICES = [
  {
    n: "01",
    category: "Аватарки",
    title: "Аватарки, которые узнаются в ленте",
    body: "Лицо канала. Знак бренда. Образ, который читается с превью миниатюры в Twitch и с PFP в Discord одинаково.",
    formats: ["PFP 1:1", "Стикер", "Анимация .webm"],
  },
  {
    n: "02",
    category: "Баннеры",
    title: "Баннеры под все платформы",
    body: "YouTube, Twitch, ВКонтакте, Telegram, Discord — единый визуальный язык, разнесённый по формату каждой площадки.",
    formats: ["2560×1440", "1920×1080", "Sticky pack"],
  },
  {
    n: "03",
    category: "Логотипы",
    title: "Логотипы и логопаки",
    body: "Знак, монограмма, broadcast-вариант, тёмный/светлый, ч/б. Логотип, который не разваливается на 16 пикселях.",
    formats: ["SVG", "PNG", "Brand-kit"],
  },
  {
    n: "04",
    category: "Превью",
    title: "Превью с конверсией в клик",
    body: "Превью YouTube и Twitch, которые делают так, чтобы палец остановился именно на вашем ролике, а не на следующем.",
    formats: ["1280×720", "Серия", "A/B-варианты"],
  },
  {
    n: "05",
    category: "Карточки товаров",
    title: "Карточки товаров под маркетплейсы",
    body: "Wildberries, Ozon, Яндекс Маркет, FunPay — карточки, которые поднимают CTR и сокращают возвраты.",
    formats: ["900×1200", "Инфо-графика", "6 слайдов"],
  },
] as const;

export const PROCESS_STEPS = [
  {
    n: "00",
    label: "AI-брифинг 24/7",
    title: "Бриф принимается за 60 секунд. В любой день, в любой час.",
    body: "AI-ассистент уточняет вводные, фиксирует задачу и сразу маршрутизирует её в работу. Без ожидания, без потерянных переписок, без «увижу — отвечу».",
    deliverables: ["Ответ за 60 сек", "Сбор вводных", "Маршрут задачи"],
    highlight: true,
  },
  {
    n: "01",
    label: "Бриф",
    title: "Слушаю задачу, а не только хотелку.",
    body: "Фиксирую аудиторию, площадку, эмоцию и метрику, по которой работа считается успешной. Без этого дизайн становится украшением.",
    deliverables: ["Аудитория", "Площадка", "Метрика"],
    highlight: false,
  },
  {
    n: "02",
    label: "Концепт",
    title: "Один концепт. Внятный. Без воды.",
    body: "Не «3 варианта на выбор», а одно решение с обоснованием. Если оно не попало — правки именно там, где нужно, а не пересборка с нуля.",
    deliverables: ["Концепт", "Референсы", "Обоснование"],
    highlight: false,
  },
  {
    n: "03",
    label: "Сборка",
    title: "Ручная сборка. Пиксельная точность.",
    body: "Типографика, сетка, свет, цвет, экспорты. Та самая разница между «средним» и «дорогим», которую не объяснить словами, но заметно с первого взгляда.",
    deliverables: ["Все форматы", "Исходники", "Production-ready"],
    highlight: false,
  },
  {
    n: "04",
    label: "Правки",
    title: "Правки без споров и без обид.",
    body: "Один круг правок включён. Я не торгуюсь за каждый сдвиг — задача в том, чтобы клиент остался с работой, которую не стыдно показать.",
    deliverables: ["1 круг правок", "Версионирование", "Финальная сборка"],
    highlight: false,
  },
  {
    n: "05",
    label: "Сдача",
    title: "Сдача через FunPay. Гарантия площадки.",
    body: "Сделка проходит через FunPay — деньги списываются только после того, как вы подтвердили работу. Это не я обещаю — это правила площадки.",
    deliverables: ["FunPay sделка", "Все исходники", "Гайдлайн"],
    highlight: false,
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Заказывал аватарку и баннер. Прислал по 1 концепту, оба сразу в точку. Канал стал выглядеть «дорого» без преувеличения.",
    name: "Storm",
    role: "Twitch · ~120k followers",
    rating: 5,
  },
  {
    quote:
      "Логотип для команды собирали через троих дизайнеров, и только Rcode11 понял, что нам нужно. Сдал быстрее срока.",
    name: "Даниил В.",
    role: "Капитан, киберспорт-команда",
    rating: 5,
  },
  {
    quote:
      "Перевели карточки на Wildberries по его шаблону — CTR в категории вырос почти в 2 раза за две недели. Платить за дизайн перестало быть «расходом».",
    name: "Лаура П.",
    role: "Бренд-менеджер, маркетплейс-селлер",
    rating: 5,
  },
  {
    quote:
      "Серия превью для канала. Через 30 дней средний CTR удвоился, watch-time +71%. Окупилось с первого ролика.",
    name: "Кенджи А.",
    role: "Шоураннер, YouTube",
    rating: 5,
  },
  {
    quote:
      "Был один сложный заказ с возвратом — клиент менял ТЗ трижды. Rcode11 не стал спорить, доделал бесплатно. Это редкость.",
    name: "Михаил К.",
    role: "Постоянный клиент FunPay",
    rating: 5,
  },
  {
    quote:
      "Сдача через FunPay — это и было решающим. Деньги вернутся, если что-то не так, и при этом дизайнер не халтурит. Идеальная связка.",
    name: "Приватный клиент",
    role: "FunPay · Aurum",
    rating: 5,
  },
];

export const WHY_POINTS = [
  {
    title: "AI-брифинг без ожидания",
    body:
      "Бриф принимается 24/7 умным ассистентом. Не нужно ловить дизайнера в онлайне — задача стартует в момент, когда у вас появилась идея.",
  },
  {
    title: "Сделка через FunPay",
    body:
      "Все заказы — через FunPay. Гарантия площадки, верифицированный аккаунт, 750+ отзывов, рейтинг 4.97. Деньги уходят только после того, как работа вас устроила.",
  },
  {
    title: "Один концепт, не три",
    body:
      "Не сваливаю на клиента «выберите из трёх». Один проработанный концепт с обоснованием. Если не попал — правлю там, где нужно, а не начинаю заново.",
  },
  {
    title: "Возвраты — не катастрофа",
    body:
      "Если клиент остался недоволен — это рабочая ситуация, не повод спорить. Доделываю или возвращаю. Поэтому повторных клиентов больше, чем разовых.",
  },
  {
    title: "Маркетинг, а не украшение",
    body:
      "Каждое решение — через метрику: CTR превью, конверсия карточки, узнаваемость аватарки. Дизайн без метрики — это арт, а не работа.",
  },
  {
    title: "Без потерянных переписок",
    body:
      "Бриф → план → правки → сдача — всё фиксируется. Никаких «давайте перенесём на завтра, я завтра вспомню». Сроки — это часть продукта.",
  },
];

export const COMPARISON = {
  cheap: {
    label: "Биржа за 500₽",
    points: [
      "Стиль из Pinterest, без понимания задачи",
      "Один баннер — три недели правок",
      "Перерисовка с нуля на каждый ваш «не нравится»",
      "Никаких исходников, никакой системы",
      "Молчит сутками — пишет, когда «настроение»",
      "После сдачи дизайнер исчезает",
    ],
  },
  premium: {
    label: "Rcode11",
    points: [
      "Сначала задача и метрика — потом пиксели",
      "Один концепт, обоснованный, под вашу площадку",
      "Точечные правки вместо пересборки",
      "Все исходники, форматы, гайдлайн — в комплекте",
      "AI-брифинг 24/7, ответ за 60 секунд",
      "FunPay-гарантия, постоянная связь, понятные сроки",
    ],
  },
} as const;

export const STATS = [
  { value: 1000, suffix: "+", label: "Выполненных заказов", caption: "за 2 года практики" },
  { value: 750, suffix: "+", label: "Отзывов на FunPay", caption: "верифицированные клиенты" },
  { value: 4.97, suffix: "", label: "Средний рейтинг", caption: "из 5.00 на FunPay" },
  { value: 62, suffix: "%", label: "Повторные клиенты", caption: "возвращаются за следующим заказом" },
];

export const AI_BRIEF = {
  badge: "AI-брифинг · 24/7",
  title: "Бриф принимается за 60 секунд. В любое время.",
  body: "AI-ассистент Rcode11 уточняет вводные, фиксирует задачу и моментально маршрутизирует её. Без ожидания и без потерянных переписок.",
  cta: "Открыть бриф",
} as const;
