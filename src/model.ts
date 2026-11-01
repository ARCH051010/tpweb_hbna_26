export type Role = "usuario" | "gestor";
export type Coords = [number, number];
export type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
};
export type Place = {
  id: string;
  name: string;
  description: string;
  category: string;
  coords: Coords;
  official: boolean;
  address: string;
  hours: string;
  visits: number;
  art: string;
};
export type Event = {
  id: string;
  name: string;
  description: string;
  category: string;
  coords: Coords;
  organizer: string;
  author: string;
  start: string;
  end: string;
  faculty: string;
  career: string;
  featured: boolean;
  positive: number;
  negative: number;
  visits: number;
  place: string;
  art: string;
  votes: Record<string, "positive" | "negative">;
};
export type User = {
  id: string;
  name: string;
  email: string;
  badge: string;
  role: Role;
  blocked: boolean;
  faculty: string;
  suspensionReason?: string;
};
export type Comment = {
  id: string;
  event: string;
  author: string;
  text: string;
  date: string;
};
export type Report = {
  id: string;
  event: string;
  author: string;
  reason: string;
  ignored: boolean;
};
export type Request = {
  id: string;
  name: string;
  category: string;
  description: string;
  coords: Coords;
  reason: string;
  author: string;
  status: "pending" | "approved" | "rejected";
  response: string;
  date: string;
};
export type Data = {
  categories: Category[];
  places: Place[];
  events: Event[];
  users: User[];
  comments: Comment[];
  reports: Report[];
  requests: Request[];
};
export const CAMPUS: Coords = [22.988, -82.4655];
export const MY_POSITION: Coords = [22.9858, -82.4668];
export const CAMPUS_BOUNDS: [Coords, Coords] = [
  [22.977, -82.478],
  [22.998, -82.454],
];
export const faculties = [
  "Tecnologías Interactivas",
  "Tecnologías Educativas",
  "Tecnologías Libres",
  "Inteligencia Organizacional",
  "CITEC",
  "Ciberseguridad",
];
export const careers = [
  "Ingeniería en Ciencias Informáticas",
  "Ingeniería en Ciberseguridad",
  "Ingeniería en Bioinformática",
  "Administración de Redes y Seguridad Informática",
];
export const uid = () => crypto.randomUUID();
export const inCampus = ([lat, lng]: Coords) =>
  Number.isFinite(lat) &&
  Number.isFinite(lng) &&
  lat >= CAMPUS_BOUNDS[0][0] &&
  lat <= CAMPUS_BOUNDS[1][0] &&
  lng >= CAMPUS_BOUNDS[0][1] &&
  lng <= CAMPUS_BOUNDS[1][1];
export const normalize = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export const dateLabel = (s: string) =>
  new Intl.DateTimeFormat("es", { day: "numeric", month: "short" }).format(
    new Date(/^\d{4}-\d{2}-\d{2}$/.test(s) ? `${s}T12:00:00` : s),
  );
export const timeLabel = (s: string) =>
  new Intl.DateTimeFormat("es", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(s));
export const seed: Data = {
  categories: [
    {
      id: "docencia",
      name: "Docencia",
      description: "Facultades, aulas y espacios de aprendizaje.",
      icon: "graduation",
      color: "#4d74c9",
    },
    {
      id: "gastronomia",
      name: "Gastronomía",
      description: "Cafeterías, comedores y puntos de encuentro.",
      icon: "coffee",
      color: "#cc864c",
    },
    {
      id: "cultura",
      name: "Cultura",
      description: "Música, arte y vida cultural en el campus.",
      icon: "music",
      color: "#9c6bc0",
    },
    {
      id: "deporte",
      name: "Deporte",
      description: "Instalaciones y actividades deportivas.",
      icon: "ball",
      color: "#38876c",
    },
    {
      id: "servicios",
      name: "Servicios",
      description: "Biblioteca, salud y servicios universitarios.",
      icon: "library",
      color: "#c06571",
    },
    {
      id: "residencia",
      name: "Residencias",
      description: "Un lugar para vivir la universidad.",
      icon: "home",
      color: "#71839a",
    },
    {
      id: "comunidad",
      name: "Comunidad",
      description: "Encuentros e iniciativas de estudiantes.",
      icon: "users",
      color: "#b59444",
    },
  ],
  places: [
    {
      id: "biblioteca",
      name: "Biblioteca Central",
      description:
        "Tu espacio para investigar, estudiar y compartir ideas. Consulta la colección de libros, encuentra una sala de lectura o prepara tu próximo proyecto con tu equipo.",
      category: "servicios",
      coords: [22.9818, -82.4644],
      official: true,
      address: "Zona central · junto al paseo universitario",
      hours: "Lunes a viernes · 8:00–20:00",
      visits: 320,
      art: "library",
    },
    {
      id: "fti",
      name: "Facultad de Tecnologías Interactivas",
      description:
        "La casa de las ideas que se convierten en experiencias. Aulas, laboratorios y proyectos de desarrollo de tecnologías interactivas.",
      category: "docencia",
      coords: [22.9895, -82.4662],
      official: true,
      address: "Edificio docente 4 · zona académica",
      hours: "Lunes a viernes · 8:00–18:00",
      visits: 410,
      art: "faculty",
    },
    {
      id: "plaza",
      name: "Plaza Mella",
      description:
        "Un punto de encuentro para toda la comunidad. Un espacio abierto que conecta la vida académica con los grandes momentos del campus.",
      category: "cultura",
      coords: [22.9903, -82.4653],
      official: true,
      address: "Al norte del complejo docente",
      hours: "Espacio abierto",
      visits: 284,
      art: "plaza",
    },
    {
      id: "cafeteria",
      name: "Cafetería del campus",
      description:
        "Una pausa entre clases, un café con amigos y algo para recargar energías. Encuéntranos junto al complejo de comedores.",
      category: "gastronomia",
      coords: [22.9869, -82.465],
      official: false,
      address: "Complejo de comedores · zona central",
      hours: "Lunes a sábado · 7:30–19:00",
      visits: 265,
      art: "cafe",
    },
    {
      id: "deportivo",
      name: "Complejo deportivo",
      description:
        "Canchas, entrenamiento y buenos encuentros. Espacios para practicar baloncesto, voleibol y mantenerte en movimiento.",
      category: "deporte",
      coords: [22.9854, -82.4695],
      official: true,
      address: "Zona deportiva · al oeste del campus",
      hours: "Todos los días · 7:00–21:00",
      visits: 198,
      art: "sport",
    },
    {
      id: "residencia-76",
      name: "Residencia 76",
      description:
        "Edificio residencial de la comunidad universitaria, próximo a las áreas de recreación y servicios.",
      category: "residencia",
      coords: [22.9809, -82.468],
      official: true,
      address: "Zona residencial · edificio 76",
      hours: "Acceso para residentes",
      visits: 142,
      art: "residence",
    },
    {
      id: "nodo",
      name: "Nodo Central",
      description:
        "Infraestructura tecnológica y conectividad para la comunidad universitaria.",
      category: "servicios",
      coords: [22.9905, -82.4625],
      official: true,
      address: "Zona norte · junto a Plaza Niemeyer",
      hours: "Lunes a viernes · 8:00–17:00",
      visits: 168,
      art: "faculty",
    },
    {
      id: "niemeyer",
      name: "Plaza Niemeyer",
      description:
        "Arquitectura, espacio abierto y encuentros que hacen campus. Un lugar para pasar la tarde y participar en actividades culturales.",
      category: "cultura",
      coords: [22.9923, -82.4648],
      official: true,
      address: "Acceso norte del campus",
      hours: "Espacio abierto",
      visits: 237,
      art: "plaza",
    },
  ],
  events: [
    {
      id: "festival",
      name: "El campus suena",
      description:
        "Una tarde para encontrarnos alrededor de la música. Bandas universitarias, nuevos talentos y un escenario abierto para compartir lo que nos mueve. Ven con tus amigos y disfruta de la vida del campus.",
      category: "cultura",
      coords: [22.9923, -82.4648],
      organizer: "FEU · Movimiento de Artistas Aficionados",
      author: "lucia",
      start: "2026-10-30T17:00",
      end: "2026-10-30T21:00",
      faculty: "Todas las facultades",
      career: "Todas las carreras",
      featured: true,
      positive: 86,
      negative: 2,
      visits: 301,
      place: "Plaza Niemeyer",
      art: "festival",
      votes: {},
    },
    {
      id: "innovacion",
      name: "Ideas que conectan",
      description:
        "Un encuentro para mostrar lo que estamos construyendo. Comparte tu proyecto, conoce a otros equipos y descubre nuevas formas de crear tecnología juntos.",
      category: "docencia",
      coords: [22.9895, -82.4662],
      organizer: "Facultad de Tecnologías Interactivas",
      author: "alain",
      start: "2026-10-28T14:00",
      end: "2026-10-28T17:00",
      faculty: "Tecnologías Interactivas",
      career: "Ingeniería en Ciencias Informáticas",
      featured: false,
      positive: 42,
      negative: 0,
      visits: 160,
      place: "Facultad de Tecnologías Interactivas",
      art: "innovation",
      votes: {},
    },
    {
      id: "basket",
      name: "Nos vemos en la cancha",
      description:
        "Torneo amistoso de baloncesto entre facultades. Forma tu equipo, trae ganas de jugar y comparte una mañana de deporte con la comunidad.",
      category: "deporte",
      coords: [22.9854, -82.4695],
      organizer: "Departamento de Deportes",
      author: "raul",
      start: "2026-10-31T09:00",
      end: "2026-10-31T13:00",
      faculty: "Todas las facultades",
      career: "Todas las carreras",
      featured: false,
      positive: 57,
      negative: 1,
      visits: 203,
      place: "Complejo deportivo",
      art: "basket",
      votes: {},
    },
    {
      id: "libros",
      name: "Historias entre páginas",
      description:
        "Trae un libro, descubre una historia y llévate una conversación. Intercambio de libros y lectura compartida en la biblioteca.",
      category: "comunidad",
      coords: [22.9818, -82.4644],
      organizer: "Club de lectura UCI",
      author: "lucia",
      start: "2026-10-29T16:00",
      end: "2026-10-29T18:00",
      faculty: "Todas las facultades",
      career: "Todas las carreras",
      featured: true,
      positive: 31,
      negative: 0,
      visits: 98,
      place: "Biblioteca Central",
      art: "books",
      votes: {},
    },
    {
      id: "empleo",
      name: "Conecta con tu futuro",
      description:
        "Conversaciones sobre prácticas, proyectos y oportunidades profesionales para estudiantes de la universidad.",
      category: "docencia",
      coords: [22.9895, -82.4662],
      organizer: "Comunidad de desarrollo",
      author: "raul",
      start: "2026-11-03T10:00",
      end: "2026-11-03T13:00",
      faculty: "Todas las facultades",
      career: "Todas las carreras",
      featured: false,
      positive: 23,
      negative: 3,
      visits: 114,
      place: "Facultad de Tecnologías Interactivas",
      art: "innovation",
      votes: {},
    },
  ],
  users: [
    {
      id: "alain",
      name: "Alain Torres",
      email: "alain.demo@uci.cu",
      badge: "UCI-24001",
      role: "usuario",
      blocked: false,
      faculty: "Tecnologías Interactivas",
    },
    {
      id: "gestor",
      name: "Elena Rodríguez",
      email: "gestor.demo@uci.cu",
      badge: "UCI-10002",
      role: "gestor",
      blocked: false,
      faculty: "Tecnologías Interactivas",
    },
    {
      id: "lucia",
      name: "Lucía Pérez",
      email: "lucia.demo@uci.cu",
      badge: "UCI-24003",
      role: "usuario",
      blocked: false,
      faculty: "Tecnologías Educativas",
    },
    {
      id: "raul",
      name: "Raúl Acosta",
      email: "raul.demo@uci.cu",
      badge: "UCI-24004",
      role: "usuario",
      blocked: false,
      faculty: "Tecnologías Libres",
    },
    {
      id: "mario",
      name: "Mario García",
      email: "mario.demo@uci.cu",
      badge: "UCI-24005",
      role: "usuario",
      blocked: true,
      faculty: "Ciberseguridad",
    },
  ],
  comments: [
    {
      id: "c1",
      event: "festival",
      author: "raul",
      text: "¡Qué buena iniciativa! Nos vemos allí con el grupo de la facultad.",
      date: "2026-10-24T14:20",
    },
    {
      id: "c2",
      event: "festival",
      author: "lucia",
      text: "El acceso es libre para toda la comunidad. ¡Los esperamos!",
      date: "2026-10-24T15:30",
    },
    {
      id: "c3",
      event: "innovacion",
      author: "alain",
      text: "Pueden traer sus prototipos en el portátil para compartirlos con los demás.",
      date: "2026-10-23T12:00",
    },
  ],
  reports: [
    {
      id: "d1",
      event: "empleo",
      author: "lucia",
      reason:
        "El organizador no ha confirmado las oportunidades anunciadas. Solicito revisar la información.",
      ignored: false,
    },
  ],
  requests: [
    {
      id: "s1",
      name: "Cafetería Los Pastelitos",
      category: "gastronomia",
      description:
        "Pequeña cafetería cerca de las residencias, con opciones para desayunar.",
      coords: [22.9826, -82.4671],
      reason: "Es un punto de encuentro que aún no aparece en el mapa.",
      author: "alain",
      status: "pending",
      response: "",
      date: "2026-10-24",
    },
    {
      id: "s2",
      name: "Sala de estudio colaborativo",
      category: "docencia",
      description: "Una sala para trabajar en equipo y preparar proyectos.",
      coords: [22.9888, -82.4672],
      reason: "Los estudiantes necesitan encontrar este espacio con facilidad.",
      author: "lucia",
      status: "pending",
      response: "",
      date: "2026-10-23",
    },
    {
      id: "s3",
      name: "Banco de intercambio de libros",
      category: "comunidad",
      description: "Un espacio comunitario para compartir libros.",
      coords: [22.9819, -82.4642],
      reason: "Promover la lectura en el campus.",
      author: "alain",
      status: "rejected",
      response:
        "El punto forma parte de la Biblioteca Central. Lo añadiremos a su descripción para evitar duplicados.",
      date: "2026-10-20",
    },
  ],
};
