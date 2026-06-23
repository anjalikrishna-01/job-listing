// ---------------------------------------------------------------------------
// Mock data layer.
// Every page imports jobs from here. When your Express + MongoDB API is
// ready, replace these functions' bodies with axios calls (e.g.
// `axios.get('/api/jobs')`) and the rest of the app needs no other changes —
// every page already treats this as an async-ish data source.
// ---------------------------------------------------------------------------

const categories = [
  'Engineering',
  'Product',
  'Design',
  'Data',
  'Marketing',
  'Sales',
  'Finance',
  'Operations',
]

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Remote']
const levels = ['Junior', 'Mid', 'Senior', 'Lead']

const palette = ['#0b1220', '#b68d40', '#1f7a5c', '#5b6472', '#93702f', '#233049']

const jobs = [
  {
    id: 'vtg-014',
    title: 'Senior Backend Engineer',
    company: 'Northwind Analytics',
    category: 'Engineering',
    level: 'Senior',
    type: 'Full-time',
    location: 'Bengaluru, IN',
    remote: true,
    salaryMin: 28,
    salaryMax: 38,
    currency: 'LPA',
    posted: '2026-06-16',
    featured: true,
    status: 'open',
    tags: ['Node.js', 'MongoDB', 'System Design'],
    logo: palette[0],
    description:
      'Northwind Analytics is building the data backbone for mid-market logistics firms. We are hiring a senior backend engineer to own our services layer end to end — from schema design to on-call.',
    responsibilities: [
      'Design and maintain REST and event-driven services in Node.js',
      'Own MongoDB schema design and query performance across core services',
      'Partner with product to scope and ship features in two-week cycles',
      'Mentor two mid-level engineers on the team',
    ],
    requirements: [
      '5+ years building production backend systems',
      'Deep experience with Node.js and MongoDB or a similar document store',
      'Comfort owning services from design through on-call',
      'Clear written communication for a distributed team',
    ],
  },
  {
    id: 'vtg-021',
    title: 'Product Designer',
    company: 'Lumen Studio',
    category: 'Design',
    level: 'Mid',
    type: 'Full-time',
    location: 'Remote',
    remote: true,
    salaryMin: 18,
    salaryMax: 26,
    currency: 'LPA',
    posted: '2026-06-14',
    featured: true,
    status: 'open',
    tags: ['Figma', 'Design Systems', 'B2B'],
    logo: palette[1],
    description:
      'Lumen Studio designs internal tools for finance teams. We are looking for a product designer who is equally comfortable in dense data tables and high-level flow diagrams.',
    responsibilities: [
      'Own end-to-end design for two product surfaces',
      'Maintain and extend our shared design system',
      'Run lightweight user research with finance-team customers',
      'Pair closely with engineering during implementation',
    ],
    requirements: [
      '3+ years of product design experience, ideally B2B',
      'Strong portfolio of shipped, complex workflows',
      'Working fluency in Figma component architecture',
      'Bonus: experience designing for data-dense interfaces',
    ],
  },
  {
    id: 'vtg-009',
    title: 'Data Analyst, Marketplace',
    company: 'Hearth & Co',
    category: 'Data',
    level: 'Mid',
    type: 'Full-time',
    location: 'Mumbai, IN',
    remote: false,
    salaryMin: 14,
    salaryMax: 20,
    currency: 'LPA',
    posted: '2026-06-10',
    featured: false,
    status: 'open',
    tags: ['SQL', 'Python', 'Marketplace'],
    logo: palette[2],
    description:
      'Hearth & Co runs a two-sided marketplace for home services. We need a data analyst to help the marketplace team understand supply, demand, and pricing dynamics.',
    responsibilities: [
      'Build and maintain dashboards tracking marketplace health',
      'Run ad-hoc analyses to support pricing decisions',
      'Partner with engineering on event-tracking design',
      'Present findings to leadership monthly',
    ],
    requirements: [
      '2+ years in an analytics or data science role',
      'Strong SQL and basic Python for analysis',
      'Experience with a BI tool (Looker, Metabase, or similar)',
      'Comfortable presenting to non-technical stakeholders',
    ],
  },
  {
    id: 'vtg-033',
    title: 'Frontend Engineer (React)',
    company: 'Northwind Analytics',
    category: 'Engineering',
    level: 'Mid',
    type: 'Full-time',
    location: 'Bengaluru, IN',
    remote: true,
    salaryMin: 16,
    salaryMax: 24,
    currency: 'LPA',
    posted: '2026-06-18',
    featured: true,
    status: 'open',
    tags: ['React', 'TypeScript', 'Performance'],
    logo: palette[0],
    description:
      'Join the platform team building the customer-facing analytics dashboard used by thousands of logistics operators daily.',
    responsibilities: [
      'Build accessible, performant React interfaces',
      'Collaborate with design on our component library',
      'Improve dashboard load performance for large datasets',
      'Write tests that the rest of the team trusts',
    ],
    requirements: [
      '3+ years of production React experience',
      'Comfortable with TypeScript in a large codebase',
      'An eye for detail in UI polish and accessibility',
      'Experience with data-heavy interfaces is a plus',
    ],
  },
  {
    id: 'vtg-041',
    title: 'Growth Marketing Manager',
    company: 'Forge Capital',
    category: 'Marketing',
    level: 'Senior',
    type: 'Full-time',
    location: 'Remote',
    remote: true,
    salaryMin: 20,
    salaryMax: 30,
    currency: 'LPA',
    posted: '2026-06-08',
    featured: false,
    status: 'open',
    tags: ['Lifecycle', 'Paid Acquisition', 'B2B SaaS'],
    logo: palette[3],
    description:
      'Forge Capital backs early-stage fintech founders and runs an in-house growth team that supports portfolio companies. We are hiring a growth lead to run acquisition and lifecycle programs.',
    responsibilities: [
      'Own paid acquisition strategy across channels',
      'Build and test lifecycle email and in-product messaging',
      'Report on CAC, LTV, and channel performance monthly',
      'Advise portfolio company marketing teams quarterly',
    ],
    requirements: [
      '5+ years in growth or performance marketing',
      'Track record owning a budget and a number',
      'Comfortable with SQL for self-serve reporting',
      'B2B SaaS or fintech experience preferred',
    ],
  },
  {
    id: 'vtg-018',
    title: 'Account Executive',
    company: 'Hearth & Co',
    category: 'Sales',
    level: 'Mid',
    type: 'Full-time',
    location: 'Pune, IN',
    remote: false,
    salaryMin: 12,
    salaryMax: 22,
    currency: 'LPA + commission',
    posted: '2026-06-05',
    featured: false,
    status: 'closed',
    tags: ['Outbound', 'SMB', 'Full Cycle'],
    logo: palette[2],
    description:
      'We are looking for a full-cycle account executive to own outbound prospecting through close for our SMB segment.',
    responsibilities: [
      'Run full-cycle sales from prospecting to close',
      'Maintain accurate pipeline hygiene in the CRM',
      'Partner with marketing on outbound campaigns',
      'Hit monthly and quarterly quota',
    ],
    requirements: [
      '2+ years of closing experience, SMB or mid-market',
      'Comfortable with high-volume outbound',
      'Strong written and verbal communication',
      'Coachable and metrics-driven',
    ],
  },
  {
    id: 'vtg-027',
    title: 'Finance Associate',
    company: 'Forge Capital',
    category: 'Finance',
    level: 'Junior',
    type: 'Full-time',
    location: 'Mumbai, IN',
    remote: false,
    salaryMin: 9,
    salaryMax: 14,
    currency: 'LPA',
    posted: '2026-06-02',
    featured: false,
    status: 'open',
    tags: ['FP&A', 'Excel', 'Fund Ops'],
    logo: palette[3],
    description:
      'Support fund operations and portfolio reporting for a fast-growing early-stage fund.',
    responsibilities: [
      'Prepare monthly fund and portfolio reporting',
      'Support budgeting and forecasting cycles',
      'Maintain cap table and fund administration records',
      'Assist with LP reporting requests',
    ],
    requirements: [
      '0–2 years in finance, accounting, or related field',
      'Advanced Excel skills',
      'High attention to detail',
      'Comfortable with ambiguity in a small team',
    ],
  },
  {
    id: 'vtg-052',
    title: 'Operations Lead',
    company: 'Lumen Studio',
    category: 'Operations',
    level: 'Lead',
    type: 'Full-time',
    location: 'Remote',
    remote: true,
    salaryMin: 22,
    salaryMax: 32,
    currency: 'LPA',
    posted: '2026-05-28',
    featured: false,
    status: 'open',
    tags: ['Process', 'Vendor Mgmt', 'Studio Ops'],
    logo: palette[1],
    description:
      'Run the operational backbone of a 40-person design studio — from client onboarding workflows to vendor relationships.',
    responsibilities: [
      'Own studio-wide operating rhythms and reporting',
      'Manage vendor and tooling relationships',
      'Streamline client onboarding and offboarding',
      'Partner with leadership on headcount planning',
    ],
    requirements: [
      '5+ years in an operations or chief-of-staff role',
      'Comfortable building process from scratch',
      'Excellent cross-functional communication',
      'Experience in an agency or studio setting is a plus',
    ],
  },
  {
    id: 'vtg-061',
    title: 'Product Manager, Platform',
    company: 'Northwind Analytics',
    category: 'Product',
    level: 'Senior',
    type: 'Full-time',
    location: 'Bengaluru, IN',
    remote: true,
    salaryMin: 26,
    salaryMax: 36,
    currency: 'LPA',
    posted: '2026-06-12',
    featured: true,
    status: 'open',
    tags: ['Platform', 'B2B', 'APIs'],
    logo: palette[0],
    description:
      'Own the roadmap for our developer platform and public API, used by integration partners across the logistics ecosystem.',
    responsibilities: [
      'Define and prioritize the platform roadmap',
      'Work directly with integration partners on API needs',
      'Partner with engineering on technical design reviews',
      'Track adoption metrics and report to leadership',
    ],
    requirements: [
      '4+ years of B2B product management experience',
      'Experience owning a platform or API product',
      'Comfortable in technical design conversations',
      'Strong prioritization and stakeholder management',
    ],
  },
  {
    id: 'vtg-073',
    title: 'UX Researcher (Contract)',
    company: 'Lumen Studio',
    category: 'Design',
    level: 'Mid',
    type: 'Contract',
    location: 'Remote',
    remote: true,
    salaryMin: 8,
    salaryMax: 12,
    currency: 'LPA equiv.',
    posted: '2026-05-22',
    featured: false,
    status: 'open',
    tags: ['Research', '3-month contract', 'B2B'],
    logo: palette[1],
    description:
      'A focused three-month research engagement to inform the redesign of our core reporting workflow.',
    responsibilities: [
      'Plan and conduct moderated user interviews',
      'Synthesize findings into actionable design recommendations',
      'Present research readouts to design and product leadership',
    ],
    requirements: [
      '3+ years of UX research experience',
      'Comfortable working independently on a fixed-scope engagement',
      'Strong synthesis and presentation skills',
    ],
  },
  {
    id: 'vtg-088',
    title: 'Junior Software Engineer',
    company: 'Hearth & Co',
    category: 'Engineering',
    level: 'Junior',
    type: 'Full-time',
    location: 'Pune, IN',
    remote: false,
    salaryMin: 8,
    salaryMax: 12,
    currency: 'LPA',
    posted: '2026-06-01',
    featured: false,
    status: 'open',
    tags: ['JavaScript', 'Mentorship Track', 'Marketplace'],
    logo: palette[2],
    description:
      'A structured first or second engineering role with a dedicated mentor and a clear growth path into mid-level work.',
    responsibilities: [
      'Ship features under guidance from a senior mentor',
      'Write tests and documentation for your own work',
      'Participate in code review for the whole team',
      'Join an on-call rotation after your first quarter',
    ],
    requirements: [
      '0–2 years of professional or internship experience',
      'Solid JavaScript fundamentals',
      'Eagerness to learn and take feedback well',
    ],
  },
  {
    id: 'vtg-095',
    title: 'Marketing Designer',
    company: 'Forge Capital',
    category: 'Design',
    level: 'Junior',
    type: 'Part-time',
    location: 'Remote',
    remote: true,
    salaryMin: 6,
    salaryMax: 9,
    currency: 'LPA equiv.',
    posted: '2026-05-30',
    featured: false,
    status: 'open',
    tags: ['Brand', 'Social', 'Part-time'],
    logo: palette[3],
    description:
      'Support the marketing team with brand and social design, roughly 20 hours a week.',
    responsibilities: [
      'Design social and newsletter assets weekly',
      'Maintain consistency with brand guidelines',
      'Turn around quick-deadline requests from the team',
    ],
    requirements: [
      '1+ years of design experience, agency or in-house',
      'A portfolio showing brand and social work',
      'Comfortable with quick turnarounds',
    ],
  },
]

function getJobById(id) {
  return jobs.find((job) => job.id === id) || null
}

function getSimilarJobs(job, limit = 3) {
  if (!job) return []
  return jobs
    .filter((j) => j.id !== job.id && j.category === job.category)
    .slice(0, limit)
}

function relativePosted(dateStr) {
  const posted = new Date(dateStr)
  const now = new Date('2026-06-20')
  const days = Math.max(0, Math.round((now - posted) / (1000 * 60 * 60 * 24)))
  if (days === 0) return 'Today'
  if (days === 1) return '1 day ago'
  if (days < 14) return `${days} days ago`
  const weeks = Math.round(days / 7)
  return `${weeks} week${weeks > 1 ? 's' : ''} ago`
}

function formatSalary(job) {
  return `₹${job.salaryMin}–${job.salaryMax} ${job.currency}`
}

module.exports = { categories, jobTypes, levels, jobs, getJobById, getSimilarJobs, relativePosted, formatSalary }
