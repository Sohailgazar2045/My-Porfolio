// Maps each skill (by the exact label used in data.json) to a logo.
// Real brand logos come from Simple Icons (react-icons/si); a handful of
// things without an official mark fall back to a sensible generic glyph.
import {
  SiJavascript, SiTypescript, SiPython, SiReact, SiNextdotjs, SiRedux,
  SiReactquery, SiVuedotjs, SiTailwindcss, SiFramer, SiReacthookform,
  SiChartdotjs, SiNodedotjs, SiExpress, SiNestjs, SiFastapi, SiLoopback,
  SiGraphql, SiPassport, SiSocketdotio, SiPostgresql, SiMysql, SiMongodb,
  SiRedis, SiPrisma, SiTypeorm, SiSequelize, SiMongoose, SiDocker, SiNginx,
  SiPm2, SiVercel, SiRailway, SiGithubactions, SiGithub, SiStripe, SiTwilio,
  SiOpenai, SiFirebase, SiCloudinary, SiAirtable, SiGooglecloud, SiPuppeteer,
  SiJsonwebtokens,
} from 'react-icons/si';
import { FaAws, FaFilePdf } from 'react-icons/fa';
import {
  TbSql, TbDatabase, TbPlugConnected, TbApi, TbTrendingUp, TbFileText,
} from 'react-icons/tb';

const SKILL_ICONS = {
  // Languages
  'JavaScript (ES6+)': SiJavascript,
  TypeScript: SiTypescript,
  Python: SiPython,
  SQL: TbSql,
  // Frontend
  React: SiReact,
  'Next.js (14/16)': SiNextdotjs,
  'Redux Toolkit': SiRedux,
  'React Query': SiReactquery,
  'Vue.js': SiVuedotjs,
  'Tailwind CSS': SiTailwindcss,
  'Framer Motion': SiFramer,
  'React Hook Form': SiReacthookform,
  PrimeReact: SiReact,
  'Chart.js': SiChartdotjs,
  'React Flow': SiReact,
  // Backend
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  NestJS: SiNestjs,
  FastAPI: SiFastapi,
  'LoopBack 4': SiLoopback,
  GraphQL: SiGraphql,
  WebSocket: TbPlugConnected,
  'Passport.js': SiPassport,
  'Socket.io': SiSocketdotio,
  // Databases & ORMs
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  MongoDB: SiMongodb,
  'SQL Server': TbDatabase,
  Redis: SiRedis,
  Prisma: SiPrisma,
  TypeORM: SiTypeorm,
  Sequelize: SiSequelize,
  Mongoose: SiMongoose,
  // Cloud & DevOps
  'AWS (EC2, RDS, S3)': FaAws,
  Docker: SiDocker,
  Nginx: SiNginx,
  PM2: SiPm2,
  Vercel: SiVercel,
  Railway: SiRailway,
  'CI/CD': SiGithubactions,
  'Git/GitHub': SiGithub,
  // Integrations & Automation
  Stripe: SiStripe,
  Twilio: SiTwilio,
  MessageBird: TbApi,
  'Azure OpenAI': SiOpenai,
  'Microsoft Graph API': TbApi,
  'OpenAI API': SiOpenai,
  Firebase: SiFirebase,
  Cloudinary: SiCloudinary,
  'Kalshi & Polymarket APIs': TbTrendingUp,
  Airtable: SiAirtable,
  'Google Cloud Functions': SiGooglecloud,
  // Other
  'Web Scraping (Puppeteer)': SiPuppeteer,
  'OAuth2.0 / JWT': SiJsonwebtokens,
  'PDF.js': FaFilePdf,
  'Winston Logging': TbFileText,
};

export const getSkillIcon = (name) => SKILL_ICONS[name] || TbApi;
