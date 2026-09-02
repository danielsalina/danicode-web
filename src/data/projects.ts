export type ProjectStatus = 'production'

export interface Project {
  /** Identificador estable, usado como key y como ancla. */
  id: string
  name: string
  /** Categoría corta que se lee antes del nombre. */
  kind: string
  /** El problema que resuelve, en una frase. */
  problem: string
  /** Para quién está pensado. */
  audience: string
  /** Descripción de producto: qué hace, no cómo está hecho. */
  description: string
  /** Capacidades reales, verificadas contra el repositorio o el sitio en producción. */
  capabilities: readonly string[]
  /** Tecnologías principales del producto. */
  tech: readonly string[]
  status: ProjectStatus
  url: string
}

/**
 * Contenido derivado de los README de cada repositorio y de los sitios en
 * producción. Editable sin tocar componentes.
 */
export const projects: readonly Project[] = [
  {
    id: 'sgv',
    name: 'Orbith SGV',
    kind: 'SaaS de gestión comercial',
    problem:
      'Los negocios con varias sucursales terminan gestionando ventas, stock y permisos en planillas separadas que nadie concilia.',
    audience: 'Comercios y organizaciones con varias tiendas y sucursales.',
    description:
      'Sistema multi-tenant de gestión de ventas en la nube. Cada tienda opera con sus sucursales, sus roles y sus permisos: la plataforma habilita capabilities por tienda, el administrador arma roles y usuarios, y el usuario operativo vende y presupuesta dentro de su sucursal.',
    capabilities: [
      'Ventas, presupuestos y documentos en PDF',
      'Clientes, productos y proveedores',
      'Multi-tenant por tienda con sucursales',
      'Permisos jerárquicos y auditoría',
    ],
    tech: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'React'],
    status: 'production',
    url: 'https://sgv.orbith.dev/',
  },
  {
    id: 'menuqr',
    name: 'MenuQR',
    kind: 'SaaS para gastronomía',
    problem:
      'Actualizar una carta impresa cuesta tiempo y dinero, y tomar pedidos por WhatsApp a mano se rompe apenas hay volumen.',
    audience: 'Restaurantes, bares y locales gastronómicos.',
    description:
      'Menú digital por QR con carta pública por restaurante, carrito y derivación del pedido a WhatsApp. Detrás hay un panel para el dueño del local y una consola de plataforma separada para operar todos los tenants.',
    capabilities: [
      'Menú público por slug, carrito y handoff a WhatsApp',
      'Panel del local: platos, categorías, QR, pedidos y cocina',
      'Reseñas con respuesta pública del local',
      'Cola de pedidos priorizada por SLA operativo',
      'Consola de plataforma multi-tenant con auditoría',
      'Tiempo real con Socket.IO y soporte PWA/offline',
    ],
    tech: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'Socket.IO', 'React'],
    status: 'production',
    url: 'https://menuqr.orbith.dev/',
  },
  {
    id: 'beautyops',
    name: 'Beauty Ops',
    kind: 'SaaS de gestión para salones',
    problem:
      'La agenda de una barbería o un salón vive entre el cuaderno, el celular del dueño y los mensajes sin responder.',
    audience: 'Barberías, peluquerías y salones de belleza.',
    description:
      'Plataforma multi-tenant para la operación de salones, con aplicación web y aplicación móvil sobre la misma API. Construida como monorepo con Clean Architecture y reglas de dependencia explícitas entre capas.',
    capabilities: [
      'Multi-tenant con gestión de identidad y permisos',
      'Aplicación web y aplicación móvil sobre la misma API',
      'Monorepo con dominio y contratos compartidos',
      'Clean Architecture con reglas de dependencia verificadas',
    ],
    tech: ['Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'Drizzle ORM', 'React', 'React Native'],
    status: 'production',
    url: 'https://beautyops.orbith.dev/',
  },
]
