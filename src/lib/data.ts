export const BRAND = {
  name: "Rcode11",
  shortName: "R11",
  tagline: "Не просто дизайн. Восприятие.",
  taglineAlt: "Дизайн, который выглядит дорого.",
  subTagline:
    "Премиальная визуальная идентика для стримеров, игровых брендов и креаторов, которые отказались выглядеть средне.",
  experienceYears: 2,
  reviews: 750,
  orders: 1000,
  funpay: "https://funpay.com/users/9159608/",
  telegram: "https://t.me/rcode11",
  telegramHandle: "@rcode11",
  email: "studio@rcode11.com",
  domain: "rcode11.studio",
} as const;

export const NAV_LINKS = [
  { label: "Работы", href: "#portfolio" },
  { label: "Процесс", href: "#process" },
  { label: "Отзывы", href: "#testimonials" },
  { label: "Почему R11", href: "#why" },
  { label: "Контакты", href: "#contact" },
] as const;

export type PortfolioCategory =
  | "Превью YouTube"
  | "Гейминг"
  | "Логотипы"
  | "Discord · Telegram"
  | "Баннеры"
  | "Премиум";

export type PortfolioItem = {
  id: string;
  title: string;
  client: string;
  category: PortfolioCategory;
  year: number;
  metric: string;
  accent: "gold" | "violet" | "crimson" | "ice" | "ember";
  layout: "wide" | "tall" | "square";
  kind: "thumbnail" | "logo" | "banner" | "identity" | "discord" | "telegram";
  copy: string;
  ticker: string;
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "p-01",
    title: "Operation Nightfall",
    client: "Apex Streamer Network",
    category: "Превью YouTube",
    year: 2025,
    metric: "+312% CTR",
    accent: "crimson",
    layout: "wide",
    kind: "thumbnail",
    copy: "Кинематографичная серия превью, которая вывела среднего креатора в топ-1% по кликабельности.",
    ticker: "YT · 4K · 16:9",
  },
  {
    id: "p-02",
    title: "Obsidian Esports",
    client: "Obsidian.GG",
    category: "Гейминг",
    year: 2025,
    metric: "Ребрендинг команды",
    accent: "gold",
    layout: "tall",
    kind: "identity",
    copy: "Полная визуальная система для киберспортивной организации — знак, форма, соцсети, broadcast-пакет.",
    ticker: "БРЕНД · АЙДЕНТИКА · LIVE",
  },
  {
    id: "p-03",
    title: "Monogram MK-II",
    client: "Под NDA",
    category: "Логотипы",
    year: 2024,
    metric: "Авторский знак",
    accent: "gold",
    layout: "square",
    kind: "logo",
    copy: "Монограмма, выстроенная с точностью часового механизма. Каждая линия — на сетке.",
    ticker: "ВЕКТОР · 1:1",
  },
  {
    id: "p-04",
    title: "Inner Circle",
    client: "Закрытый Telegram",
    category: "Discord · Telegram",
    year: 2025,
    metric: "Приватное комьюнити",
    accent: "ember",
    layout: "wide",
    kind: "telegram",
    copy: "Визуальная система для invite-only канала — emoji, баннеры, ролевые арты, шаблоны постов.",
    ticker: "TG · CHANNEL · SERIES",
  },
  {
    id: "p-05",
    title: "Frostline",
    client: "Frostline Studios",
    category: "Баннеры",
    year: 2024,
    metric: "Лонч-кампания",
    accent: "ice",
    layout: "tall",
    kind: "banner",
    copy: "Key visuals для запуска AA-игры — обложки, соцсети, сторы, премиум-арты.",
    ticker: "KEY ART · COVERS",
  },
  {
    id: "p-06",
    title: "Velour Discord",
    client: "Velour Club",
    category: "Discord · Telegram",
    year: 2025,
    metric: "Premium-комьюнити",
    accent: "violet",
    layout: "square",
    kind: "discord",
    copy: "Discord, который ощущается как мишленовский лаунж — иконки, баннеры, ролевые арты, welcome-стек.",
    ticker: "DISCORD · SERVER · UI",
  },
  {
    id: "p-07",
    title: "Reign Drop",
    client: "Reign Network",
    category: "Превью YouTube",
    year: 2025,
    metric: "+220% watch-time",
    accent: "gold",
    layout: "wide",
    kind: "thumbnail",
    copy: "Серия превью для флагманского шоу из 12 эпизодов. Сделана так, чтобы палец останавливался первым.",
    ticker: "СЕРИЯ · 12 EP",
  },
  {
    id: "p-08",
    title: "Aurum One",
    client: "Aurum Capital",
    category: "Премиум",
    year: 2025,
    metric: "Приватный бренд",
    accent: "gold",
    layout: "tall",
    kind: "identity",
    copy: "Закрытая визуальная система для финансового бренда, который никогда не нуждался в рекламе о себе.",
    ticker: "IDENTITY · PRIVATE",
  },
];

export const PORTFOLIO_CATEGORIES: ("Все" | PortfolioCategory)[] = [
  "Все",
  "Превью YouTube",
  "Гейминг",
  "Логотипы",
  "Discord · Telegram",
  "Баннеры",
  "Премиум",
];

export const PROCESS_STEPS = [
  {
    n: "00",
    label: "AI-брифинг 24/7",
    title: "Бриф принимается за 60 секунд. В любой день, в любой час.",
    body: "Вам не нужно ждать, пока дизайнер «увидит сообщение». AI-ассистент Rcode11 принимает бриф 24/7, уточняет вводные и моментально передаёт задачу в работу. Вы выходите из переписки уже с понятным следующим шагом.",
    deliverables: ["Ответ за 60 сек", "Сбор вводных", "Маршрут задачи"],
    highlight: true,
  },
  {
    n: "01",
    label: "Стратегия",
    title: "Сначала восприятие. Пиксели — потом.",
    body: "До первой линии формы мы фиксируем аудиторию, конкурентов и эмоцию, которую бренд обязан вызвать в первые 0.4 секунды.",
    deliverables: ["Карта аудитории", "Мудборд", "Позиционирование"],
    highlight: false,
  },
  {
    n: "02",
    label: "Концепт",
    title: "Три направления. Ноль воды.",
    body: "Три проработанные визуальные концепции — каждая обоснована, каждая сделана так, чтобы выглядеть дороже своей цены.",
    deliverables: ["3 направления", "Референсы", "Tone of voice"],
    highlight: false,
  },
  {
    n: "03",
    label: "Дизайн",
    title: "Ручная сборка. Пиксельная точность. Кинематограф.",
    body: "Выбранное направление превращается в полную систему — типографика, сетка, фото, motion-ready ассеты, все состояния отрисованы.",
    deliverables: ["Визуальная система", "Компоненты", "Live-превью"],
    highlight: false,
  },
  {
    n: "04",
    label: "Полировка",
    title: "Мы обсессивно зумируем до 600%.",
    body: "Цветокоррекция, микро-типографика, оптические правки, дисциплина экспортов. Те самые 10%, которых клиент не должен замечать — и именно поэтому он возвращается.",
    deliverables: ["QA-прогон", "Экспорты", "Production-ready"],
    highlight: false,
  },
  {
    n: "05",
    label: "Сдача",
    title: "Бренд-кит, который хочется открыть.",
    body: "Финальная упаковка — исходники, экспорты, гайдлайн, мастеры под каждую платформу. Включён онбординг команды.",
    deliverables: ["Исходники", "Brand-kit", "Гайдлайн"],
    highlight: false,
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Rcode11 не сдал дизайн — он сдал сдвиг восприятия. Через месяц после ребрендинга CTR удвоился, а клиенты перестали обсуждать цену.",
    name: "Даниил Верро",
    role: "Основатель, Obsidian.GG",
    rating: 5,
  },
  {
    quote:
      "Я работала с тремя премиум-студиями в Лондоне. Ни одна не подошла к этому уровню вкуса, полировки и доведения до конца. Он мыслит как бренд-директор, а не как фрилансер.",
    name: "Мира Сольберг",
    role: "Creative Lead, Frostline Studios",
    rating: 5,
  },
  {
    quote:
      "Заказывали обновить одну серию превью. Вернулся с системой, которая тихо подняла весь канал. Watch-time +71% за четыре недели.",
    name: "Кенджи Араи",
    role: "Шоураннер, Reign Network",
    rating: 5,
  },
  {
    quote:
      "Один бренд-кит окупает счёт. Всё подписано, послойно, готово под каждую поверхность. Впервые внешний дизайнер сделал внутреннюю команду лучше.",
    name: "Лаура Павезе",
    role: "Brand Manager, Velour Club",
    rating: 5,
  },
  {
    quote:
      "Он понял аудиторию раньше, чем я закончил бриф. Первый круг — и попадание. За пять лет в агентствах такого со мной не случалось.",
    name: "Томаш Хладик",
    role: "CMO, Apex Streamer Network",
    rating: 5,
  },
  {
    quote:
      "Если вы сомневаетесь из-за цены — вы и есть та аудитория, для которой этот дизайнер. Работа оправдывает счёт через десять минут после сдачи.",
    name: "Приватный клиент",
    role: "Aurum Capital",
    rating: 5,
  },
];

export const WHY_POINTS = [
  {
    title: "AI-брифинг без ожидания",
    body:
      "Бриф принимается 24/7 умным ассистентом. Вам не нужно ловить дизайнера в онлайне — задача стартует в момент, когда у вас появилась идея.",
  },
  {
    title: "Маркетинг — на первом месте",
    body:
      "Каждое решение принимается через один вопрос: что зритель почувствует в первую секунду? Дизайн — это носитель, продукт — восприятие.",
  },
  {
    title: "Визуальная психология",
    body:
      "Контраст, вес, сдержанность, золото — как пунктуация. Работа читается как авторитет ещё до того, как кто-то прочитал слово.",
  },
  {
    title: "Доверие через ремесло",
    body:
      "Премиальная типографика, выверенные интервалы и обсессивная полировка — самый дешёвый способ выглядеть в 10× дороже, чем вы стоите.",
  },
  {
    title: "Быстрое и решительное исполнение",
    body:
      "Два года, 1000+ сданных задач. Скоуп фиксируется в первый день, первый концепт обычно попадает с первого круга.",
  },
  {
    title: "Система, а не папка JPG",
    body:
      "На выходе — система, с которой бренд растёт: компоненты, правила, экспорты. Никакой россыпи разрозненных файлов.",
  },
];

export const COMPARISON = {
  cheap: {
    label: "Дешёвый фрилансер",
    points: [
      "Случайный стиль из Pinterest",
      "Дженерик-градиенты и стоковые эффекты",
      "Выглядит как ещё одна тысяча каналов",
      "Нет системы, нет правил, нет роста",
      "Берёт почасово, сдаёт когда настроение",
      "Забывается за 2 секунды",
    ],
  },
  premium: {
    label: "Rcode11",
    points: [
      "Визуальная стратегия под задачу",
      "Авторская типографика и cinematic-грейд",
      "Выглядит как бренд, на который подписываются",
      "Полная система, компоненты, гайдлайн",
      "Фикс-скоуп, фикс-сроки, ответственность за результат",
      "Запоминается и оправдывает цену",
    ],
  },
} as const;

export const STATS = [
  { value: 1000, suffix: "+", label: "Выполненных заказов", caption: "по всему миру" },
  { value: 750, suffix: "+", label: "Пятизвёздочных отзывов", caption: "верифицированные клиенты" },
  { value: 2, suffix: " года", label: "На рынке", caption: "ноль возвратов" },
  { value: 98, suffix: "%", label: "Повторные и рефералы", caption: "от общей выручки" },
];

export const AI_BRIEF = {
  badge: "AI-брифинг · 24/7",
  title: "Бриф принимается за 60 секунд. В любое время.",
  body: "AI-ассистент Rcode11 уточняет вводные, фиксирует задачу и моментально маршрутизирует её. Без ожидания и без потерянных переписок.",
  cta: "Открыть бриф",
} as const;
