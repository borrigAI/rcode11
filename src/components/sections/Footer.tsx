import { Logo } from "@/components/ui/Logo";
import { BRAND, NAV_LINKS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-obsidian py-14 md:py-16">
      <div className="container-x flex flex-col gap-10">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo withWordmark />
            <p className="max-w-xs text-sm text-mist">
              {BRAND.name} — авторская студия визуальных систем, которые намеренно выглядят дорого.
            </p>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              © {new Date().getFullYear()} Rcode11. Все права защищены.
            </span>
          </div>

          <FooterCol
            title="Студия"
            items={NAV_LINKS.map((l) => ({ label: l.label, href: l.href }))}
          />

          <FooterCol
            title="Практика"
            items={[
              { label: "Аватарки", href: "#portfolio" },
              { label: "Баннеры", href: "#portfolio" },
              { label: "Логотипы", href: "#portfolio" },
              { label: "Превью YouTube", href: "#portfolio" },
              { label: "Карточки товаров", href: "#portfolio" },
              { label: "Лендинги", href: "#services" },
            ]}
          />

          <FooterCol
            title="Контакты"
            items={[
              { label: "FunPay · заказ", href: BRAND.funpay },
              { label: "Рабочее время · 05:00–17:00 МСК", href: BRAND.funpay },
              { label: BRAND.email, href: `mailto:${BRAND.email}` },
            ]}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-px divider-line" />
          <p className="pt-10 font-display text-[clamp(2.6rem,11vw,9rem)] font-light leading-none tracking-[-0.05em] text-bone/95 text-balance">
            <span className="text-gradient-gold">Rcode11</span>
            <span className="text-bone/60">.</span>
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              {BRAND.domain} · с 2024
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              Спроектировано и собрано вручную.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-gold">
        {title}
      </span>
      <ul className="flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={`${title}-${item.label}`}>
            <a
              href={item.href}
              className="group inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-bone"
            >
              <span className="h-px w-3 bg-line transition-all duration-300 group-hover:w-6 group-hover:bg-gold/70" />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
