/**
 * Market pages for the five countries DeosAI Labs targets. Content is deliberately limited to
 * facts that are verifiable and genuinely useful to a buyer in that country (time-zone overlap,
 * working week, data-protection frameworks to scope around). It makes NO claims of local clients,
 * local offices, local certifications, regulatory expertise or in-country delivery, because none
 * are verified. Data-protection notes are orientation only, not legal advice.
 */
export interface MarketFaq {
  question: string;
  answer: string;
}

export interface Market {
  slug: string;
  /** Name as people search for it, e.g. "the UAE". */
  nameWithArticle: string;
  /** schema.org Country name. */
  countryName: string;
  countryCode: string;
  /** Short label for nav and cards. */
  label: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  timeZone: {
    zone: string;
    utc: string;
    /** Offset relative to Pakistan Standard Time (UTC+5), where the DeosAI Labs team is based. */
    versusPakistan: string;
    workingWeek: string;
  };
  dataNote: string;
  /** Industry slugs from industries.ts that are worth pointing this market's visitors to. */
  industrySlugs: string[];
  faqs: MarketFaq[];
}

export const marketsIntro = {
  eyebrow: "Markets We Serve",
  title: "AI engineering and workflow automation for businesses in the UAE, Saudi Arabia, the UK, the USA and Pakistan.",
  description:
    "DeosAI Labs is based in Islamabad, Pakistan, and works with businesses and agencies internationally. Work is run in English, prices are shown in USD, and discovery calls are bookable in your local time zone.",
};

const commonFaq = (place: string): MarketFaq => ({
  question: `Do you work with businesses in ${place} remotely?`,
  answer: `Yes. DeosAI Labs works remotely from Islamabad, Pakistan. Discovery calls are booked in your local time zone, work is run in English, and the three packages (an AI Workflow Automation Sprint, Custom Business Applications and White-label AI Engineering) are the same for every market. We make no claim of an office or team physically located in ${place}.`,
});

export const markets: Market[] = [
  {
    slug: "uae",
    nameWithArticle: "the UAE",
    countryName: "United Arab Emirates",
    countryCode: "AE",
    label: "UAE",
    title: "AI Automation & Custom Software for UAE Businesses — DeosAI Labs",
    description:
      "AI workflow automation, custom business applications and white-label engineering for businesses and agencies in the UAE. Remote delivery, calls in Gulf time, USD pricing.",
    h1: "AI Workflow Automation & Custom Software for Businesses in the UAE",
    intro:
      "If your team in Dubai, Abu Dhabi or elsewhere in the UAE still runs operations on spreadsheets, messaging threads and manual paperwork, DeosAI Labs can map the workflow, then build the automation, internal tool or AI integration that replaces it. Agencies and IT service providers in the UAE can also use us as a white-label engineering partner.",
    timeZone: {
      zone: "Gulf Standard Time",
      utc: "UTC+4, no daylight saving",
      versusPakistan: "1 hour behind Pakistan, so working hours overlap almost fully.",
      workingWeek: "Working weeks vary between UAE businesses, so we agree availability up front.",
    },
    dataNote:
      "The UAE has its own federal personal data protection law, and some sectors and free zones add their own rules. We scope how data is handled during discovery, and your own counsel confirms compliance. This is not legal advice.",
    industrySlugs: ["retail-ecommerce", "hospitality-travel", "logistics-supply-chain", "real-estate"],
    faqs: [
      commonFaq("the UAE"),
      {
        question: "Can we meet during UAE business hours?",
        answer:
          "Yes. Gulf Standard Time is one hour behind Pakistan, so calls fit comfortably inside the UAE working day. The booking calendar shows available slots in your own time zone.",
      },
      {
        question: "Can you build for an agency or IT service provider in the UAE?",
        answer:
          "Yes. Our White-label AI Engineering package starts from $600 (indicative, scoped per project) and is designed for agencies, ERP implementers and consultancies that deliver AI and software work to their own clients.",
      },
    ],
  },
  {
    slug: "saudi-arabia",
    nameWithArticle: "Saudi Arabia",
    countryName: "Saudi Arabia",
    countryCode: "SA",
    label: "Saudi Arabia",
    title: "AI Automation & Custom Software in Saudi Arabia — DeosAI Labs",
    description:
      "AI workflow automation, custom business applications and white-label engineering for Saudi businesses and agencies. Remote delivery, calls in Saudi time, USD pricing.",
    h1: "AI Workflow Automation & Custom Software for Businesses in Saudi Arabia",
    intro:
      "Businesses in Riyadh, Jeddah and across Saudi Arabia are investing in digital operations. DeosAI Labs helps by discovering the workflows that slow a team down, then building the automation, custom application or AI integration that fits the systems already in use. Saudi agencies and technology providers can also work with us on a white-label basis.",
    timeZone: {
      zone: "Arabia Standard Time",
      utc: "UTC+3, no daylight saving",
      versusPakistan: "2 hours behind Pakistan, so working hours overlap well.",
      workingWeek: "Many Saudi businesses work Sunday to Thursday, and we schedule around your week.",
    },
    dataNote:
      "Saudi Arabia has its own Personal Data Protection Law, and some sectors carry additional requirements. We scope how data is handled during discovery, and your own counsel confirms compliance. This is not legal advice.",
    industrySlugs: ["retail-ecommerce", "logistics-supply-chain", "construction-engineering", "government"],
    faqs: [
      commonFaq("Saudi Arabia"),
      {
        question: "Does the Sunday to Thursday working week affect scheduling?",
        answer:
          "No. We agree meeting days with you at the start. The booking calendar lets you choose any available slot in your own time zone, and Arabia Standard Time is two hours behind Pakistan.",
      },
      {
        question: "Do you provide Arabic-language systems?",
        answer:
          "Our own work is run in English. Whether a particular system needs Arabic content or a right-to-left interface is something we scope during discovery rather than promise in advance.",
      },
    ],
  },
  {
    slug: "uk",
    nameWithArticle: "the UK",
    countryName: "United Kingdom",
    countryCode: "GB",
    label: "UK",
    title: "AI Automation & Custom Software for UK Businesses — DeosAI Labs",
    description:
      "AI workflow automation, custom business applications and white-label engineering for UK businesses and agencies. Remote delivery, calls in UK time, USD pricing.",
    h1: "AI Workflow Automation & Custom Software for UK Businesses",
    intro:
      "UK businesses of every size lose time to manual reporting, document preparation and disconnected tools. DeosAI Labs maps the workflow with you, then builds a focused automation, internal application or AI integration, and hands it over with documentation. UK software agencies and consultancies can also use us for white-label AI and software engineering.",
    timeZone: {
      zone: "Greenwich Mean Time / British Summer Time",
      utc: "UTC+0 in winter, UTC+1 in summer",
      versusPakistan: "4 to 5 hours behind Pakistan, so UK mornings and early afternoons overlap with our working day.",
      workingWeek: "Standard Monday to Friday working week.",
    },
    dataNote:
      "UK personal data is governed by UK GDPR and the Data Protection Act 2018. We scope how data is handled, including where it is stored and which third-party services are used, during discovery, and your own counsel confirms compliance. This is not legal advice.",
    industrySlugs: ["professional-services", "financial-services", "retail-ecommerce", "legal-services"],
    faqs: [
      commonFaq("the UK"),
      {
        question: "How do calls work with the time difference?",
        answer:
          "Pakistan is 4 to 5 hours ahead of the UK depending on daylight saving. UK morning and early-afternoon slots overlap with our working day, and the booking calendar shows times in your own time zone.",
      },
      {
        question: "Are prices shown in pounds?",
        answer:
          "No. All prices on this site are indicative starting ranges in US dollars. We confirm scope and price in writing after a discovery call, and hosting, third-party API usage and ongoing maintenance are scoped separately.",
      },
    ],
  },
  {
    slug: "usa",
    nameWithArticle: "the USA",
    countryName: "United States",
    countryCode: "US",
    label: "USA",
    title: "AI Automation & Custom Software for US Businesses — DeosAI Labs",
    description:
      "AI workflow automation, custom business applications and white-label engineering for US businesses and agencies. Remote delivery, calls in your time zone, USD pricing.",
    h1: "AI Workflow Automation & Custom Software for US Businesses",
    intro:
      "US small and mid-sized businesses, and the agencies that serve them, often need a specific workflow automated or a specific internal tool built without a long enterprise engagement. DeosAI Labs scopes a defined piece of work, builds it, tests it with your real examples and hands it over. US agencies and consultancies can also use us as a white-label engineering partner.",
    timeZone: {
      zone: "Eastern, Central, Mountain and Pacific time",
      utc: "UTC-5 to UTC-8 in winter, UTC-4 to UTC-7 in summer",
      versusPakistan: "Roughly 9 to 13 hours behind Pakistan depending on region and daylight saving, so US mornings are the best overlap.",
      workingWeek: "Standard Monday to Friday working week.",
    },
    dataNote:
      "US privacy requirements depend on your state and sector (for example California's privacy laws, or HIPAA for health data). We scope how data is handled during discovery, and your own counsel confirms compliance. This is not legal advice.",
    industrySlugs: ["professional-services", "retail-ecommerce", "logistics-supply-chain", "healthcare"],
    faqs: [
      commonFaq("the USA"),
      {
        question: "How do calls work across such a large time difference?",
        answer:
          "US mornings overlap with our evening in Pakistan, so discovery calls and review sessions are normally held then. Between sessions, work and updates are asynchronous. The booking calendar shows slots in your own time zone.",
      },
      {
        question: "Are the prices in US dollars?",
        answer:
          "Yes. The AI Workflow Automation Sprint is indicatively $450 to $650, Custom Business Applications $750 to $1,200, and White-label AI Engineering starts from $600. These are indicative starting ranges, not quotations, and exclude hosting, third-party API usage and ongoing maintenance.",
      },
    ],
  },
  {
    slug: "pakistan",
    nameWithArticle: "Pakistan",
    countryName: "Pakistan",
    countryCode: "PK",
    label: "Pakistan",
    title: "AI Automation & Custom Software in Pakistan — DeosAI Labs",
    description:
      "Islamabad-based AI engineering for Pakistani businesses and agencies: workflow automation, custom business applications and white-label development. Calls in Pakistan time.",
    h1: "AI Workflow Automation & Custom Software for Businesses in Pakistan",
    intro:
      "DeosAI Labs is based in Islamabad. For businesses in Islamabad, Lahore, Karachi and across Pakistan that run operations on spreadsheets, WhatsApp threads and manual paperwork, we map the workflow and then build the automation, internal application or AI integration that replaces it. Pakistani software houses and agencies can also use us for white-label engineering.",
    timeZone: {
      zone: "Pakistan Standard Time",
      utc: "UTC+5, no daylight saving",
      versusPakistan: "Same time zone as our team, so scheduling is straightforward.",
      workingWeek: "We agree meeting days with you at the start.",
    },
    dataNote:
      "Data-handling requirements depend on your sector and customers. We scope how data is handled during discovery, and your own counsel confirms compliance. This is not legal advice.",
    industrySlugs: ["retail-ecommerce", "manufacturing", "logistics-supply-chain", "education"],
    faqs: [
      {
        question: "Where is DeosAI Labs based?",
        answer:
          "DeosAI Labs is based in Islamabad, Pakistan, and works with businesses and agencies in Pakistan and internationally. Work is run in English.",
      },
      {
        question: "Are prices shown in rupees?",
        answer:
          "No. All prices on this site are indicative starting ranges in US dollars. We confirm scope and price in writing after a discovery call, and hosting, third-party API usage and ongoing maintenance are scoped separately.",
      },
      {
        question: "Can a Pakistani software house or agency use you as a white-label partner?",
        answer:
          "Yes. Our White-label AI Engineering package starts from $600 (indicative, scoped per project) and covers AI agents, RAG systems, MCP and API integrations, custom software, testing and deployment under your brand.",
      },
    ],
  },
];

export function getMarketBySlug(slug: string) {
  return markets.find((market) => market.slug === slug);
}
