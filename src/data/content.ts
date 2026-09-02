export const hero = {
  eyebrow: 'Dani Code',
  /** Una línea por frase: el ritmo del titular es intencional. */
  headlineLines: ['Construyo software.', 'Lanzo productos.', 'Documento el proceso.'],
  lead: 'Trabajo principalmente en backend: modelo el dominio, diseño las APIs y mantengo los sistemas operativos en producción.',
  detail:
    'Construyo productos SaaS multi-tenant con Node.js y PostgreSQL, permisos, integraciones y despliegue en la nube.',
  photoAlt: 'Retrato de Daniel Salinas',
} as const

export const about = {
  paragraphs: [
    'Soy Daniel Salinas. Escribo software con foco en backend y arquitectura, y construyo productos SaaS completos: desde cómo se modela el negocio hasta cómo se despliega y se opera.',
    'Me interesa menos acumular tecnologías que entender el problema, definir el comportamiento del sistema y anticipar qué ocurre con tráfico real. Aprendo en cada despliegue fallido, consulta lenta o permiso más complejo de lo esperado.',
    'Lo que voy construyendo lo comparto en YouTube. No para explicar teoría, sino para mostrar el proceso tal como es.',
  ],
} as const

export type ServiceIcon = 'server' | 'blocks' | 'package' | 'cloud'

export interface Service {
  icon: ServiceIcon
  title: string
  description: string
}

export const services: readonly Service[] = [
  {
    icon: 'server',
    title: 'Backend & APIs',
    description:
      'Diseño e implementación de APIs, servicios y lógica de negocio: modelo de datos, validación, autenticación y control de acceso.',
  },
  {
    icon: 'blocks',
    title: 'Arquitectura',
    description:
      'Sistemas mantenibles con límites claros entre capas y contextos, integraciones con servicios externos y comunicación entre partes.',
  },
  {
    icon: 'package',
    title: 'Productos SaaS',
    description:
      'Producto completo, de la idea a producción: multi-tenancy, roles y permisos, panel de operación y las decisiones de negocio que hay detrás.',
  },
  {
    icon: 'cloud',
    title: 'Cloud & Producción',
    description:
      'Deploy, migraciones, logs, health checks y debugging de aplicaciones que ya están corriendo y que alguien está usando.',
  },
]

export interface StackGroup {
  title: string
  items: readonly string[]
}

/** Derivado de las dependencias reales de los proyectos en producción. */
export const stackGroups: readonly StackGroup[] = [
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'TypeScript', 'Zod', 'Socket.IO', 'Pino'],
  },
  {
    title: 'Datos',
    items: ['PostgreSQL', 'Drizzle ORM', 'node-postgres', 'Migraciones versionadas'],
  },
  {
    title: 'Frontend',
    items: ['React', 'Vite', 'TypeScript', 'TanStack Query', 'Tailwind CSS'],
  },
  {
    title: 'Mobile',
    items: ['React Native', 'Expo'],
  },
  {
    title: 'Cloud & Infra',
    items: ['AWS', 'Render', 'Docker', 'Docker Compose', 'Cloudinary', 'Resend'],
  },
  {
    title: 'Arquitectura & Prácticas',
    items: [
      'APIs REST',
      'Multi-tenancy',
      'Clean Architecture',
      'Autenticación JWT y sesiones',
      'Permisos jerárquicos',
      'Monorepos (pnpm, Turborepo)',
    ],
  },
]

export const content = {
  title: 'Contenido',
  headline: 'También documento lo que pasa mientras construyo',
  paragraphs: [
    'En mi canal muestro cómo construyo estos productos: decisiones de arquitectura, backend, errores en producción y lo que suele quedar fuera de un tutorial.',
    'Sin recetas rápidas: el proceso tal como ocurre.',
  ],
  topics: [
    'Backend y APIs',
    'Arquitectura de productos',
    'Bases de datos',
    'Deploy y producción',
    'Debugging real',
    'Build in public',
  ],
} as const

export const contact = {
  headline: '¿Estás construyendo algo?',
  lead: 'Si necesitas ayuda con un backend, la arquitectura de un producto o un sistema en producción, escríbeme. LinkedIn es la vía más directa.',
} as const
