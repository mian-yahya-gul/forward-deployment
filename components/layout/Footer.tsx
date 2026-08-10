import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/shared/Logo";
import {
  footerCompany,
  footerCompanyColumn,
  footerContact,
  footerIndustriesColumn,
  footerKnowledgeColumn,
  footerLegalColumn,
  footerServicesColumn,
  footerSocial,
  type FooterLink,
} from "@/lib/data/footer";
import { cn } from "@/lib/utils";

function FooterColumn({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1280px] px-6 py-16 sm:py-20">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {footerCompany.description}
            </p>
            <Link
              href={footerCompany.contactCta.href}
              className={cn(buttonVariants({ size: "sm" }), "mt-6")}
            >
              {footerCompany.contactCta.label}
            </Link>
            <ul className="mt-8 flex flex-wrap items-center gap-2">
              {footerSocial.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors duration-[var(--duration-fast)] hover:border-primary/40 hover:text-primary"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <FooterColumn title="Services" links={footerServicesColumn} />
          <FooterColumn title="Industries" links={footerIndustriesColumn} />
          <FooterColumn title="Knowledge Center" links={footerKnowledgeColumn} />
          <FooterColumn title="Company" links={footerCompanyColumn} />
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            © {year} DeosAI Labs. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLegalColumn.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={`mailto:${footerContact.email}`}
              className="text-sm text-muted transition-colors duration-[var(--duration-fast)] hover:text-foreground"
            >
              {footerContact.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
