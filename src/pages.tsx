import { tw } from "./styles";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  commentSchema,
  reportSchema,
  loginSchema,
  routeSchema,
} from "./validation";
import { FieldError } from "./forms";
import {
  Link,
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarDays,
  Check,
  ChevronLeft,
  Clock3,
  Flag,
  LocateFixed,
  MapPin,
  MessageCircle,
  Navigation,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  ThumbsDown,
  ThumbsUp,
  Trash2,
  UserRound,
  X,
} from "lucide-react";
import {
  CAMPUS,
  MY_POSITION,
  careers,
  dateLabel,
  faculties,
  normalize,
  uid,
} from "./model";
import type { Coords, Event, Place } from "./model";
import type { MapItem } from "./Map";
import { useStore } from "./store";
import {
  Back,
  Badge,
  Brand,
  CategoryIcon,
  Confirm,
  Empty,
  EventCard,
  Metadata,
  Modal,
  PageHead,
  PlaceCard,
  SearchBox,
} from "./ui";
import { CategoryFilters } from "./App";
const CampusMap = lazy(() => import("./Map"));
export const MapLoading = () => (
  <div className={tw("map-loading")}>
    <MapPin size={30} />
    <span>Cargando mapa del campus…</span>
  </div>
);
export function MapView(props: React.ComponentProps<typeof CampusMap>) {
  return (
    <Suspense fallback={<MapLoading />}>
      <CampusMap {...props} />
    </Suspense>
  );
}
export function useMapItems() {
  const { data } = useStore();
  return useMemo(
    () => [
      ...data.places.map((p) => ({
        id: p.id,
        kind: "lugares" as const,
        name: p.name,
        coords: p.coords,
        color: "#238dcb",
        symbol: "●",
      })),
      ...data.events.map((e) => ({
        id: e.id,
        kind: "eventos" as const,
        name: e.name,
        coords: e.coords,
        color: "#e74b50",
        symbol: "★",
      })),
    ],
    [data.places, data.events],
  );
}
export function RequireUser({
  children,
  admin = false,
}: {
  children: ReactNode;
  admin?: boolean;
}) {
  const { user } = useStore();
  if (!user) return <Navigate to="/acceso" replace />;
  if (admin && user.role !== "gestor")
    return (
      <div className={tw("page narrow")}>
        <Empty
          title="Espacio para gestores"
          text="Accede con el perfil de gestor para revisar estas pantallas."
          action={
            <Link className={tw("button")} to="/acceso">
              Cambiar perfil demo
            </Link>
          }
        />
      </div>
    );
  return <>{children}</>;
}

export function Explore({ openMenu }: { openMenu: () => void }) {
  const { data } = useStore();
  const all = useMapItems();
  const [selected, setSelected] = useState<MapItem | undefined>();
  const [kind, setKind] = useState("");
  const navigate = useNavigate();
  const items = useMemo(
    () => all.filter((i) => !kind || i.kind === kind),
    [all, kind],
  );
  const object = selected
    ? (selected.kind === "lugares" ? data.places : data.events).find(
        (i) => i.id === selected.id,
      )
    : undefined;
  return (
    <div className={tw("map-screen")}>
      <MapView items={items} selected={selected?.id} onSelect={setSelected} />
      <div className={tw("map-search-tools")}>
        <button className={tw("map-search")} onClick={openMenu}>
          <Search size={19} />
          <span>Busca localizaciones y eventos</span>
        </button>
        <div className={tw("map-kind-filters")}>
          <button
            className={tw(!kind ? "active" : "")}
            onClick={() => {
              setKind("");
              setSelected(undefined);
            }}
          >
            Todo
          </button>
          <button
            className={tw(kind === "lugares" ? "active" : "")}
            onClick={() => {
              setKind("lugares");
              setSelected(undefined);
            }}
          >
            <MapPin size={15} />
            Localizaciones
          </button>
          <button
            className={tw(kind === "eventos" ? "active" : "")}
            onClick={() => {
              setKind("eventos");
              setSelected(undefined);
            }}
          >
            <CalendarDays size={15} />
            Eventos
          </button>
        </div>
      </div>
      {selected && object ? (
        <div className={tw("map-info-card")}>
          <button
            className={tw("info-close icon-button")}
            aria-label="Cerrar información del marcador"
            onClick={() => setSelected(undefined)}
          >
            <X size={17} />
          </button>
          <h3>{object.name}</h3>
          <small>
            lat: {object.coords[0]} · lon: {object.coords[1]}
          </small>
          <p>
            {object.description.slice(0, 110)}
            {object.description.length > 110 ? "…" : ""}
          </p>
          <div className={tw("info-actions")}>
            <Link
              className={tw("button secondary")}
              to={`/${selected.kind}/${object.id}`}
            >
              Ver detalles
            </Link>
            <button
              className={tw("button")}
              onClick={() => navigate(`/ruta/${selected.kind}/${object.id}`)}
            >
              <Navigation size={15} />
              Calcular ruta
            </button>
          </div>
        </div>
      ) : null}
      <div className={tw("map-bottom-legend")}>
        <span>
          <i className={tw("legend-dot blue")} />
          Localizaciones
        </span>
        <span>
          <i className={tw("legend-dot red")} />
          Eventos
        </span>
        <span className={tw("legend-position")}>
          <i className={tw("legend-dot cyan")} />
          Ubicación demo
        </span>
      </div>
      <Link
        to="/eventos/nuevo"
        className={tw("fab")}
        aria-label="Crear nuevo evento"
      >
        <Plus size={24} />
      </Link>
    </div>
  );
}

export function Catalog({ kind }: { kind: "lugares" | "eventos" }) {
  const { data } = useStore();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [faculty, setFaculty] = useState("");
  const [career, setCareer] = useState("");
  const [official, setOfficial] = useState(false);
  const places = data.places.filter(
    (p) =>
      (!category || p.category === category) &&
      (!official || p.official) &&
      normalize(p.name + " " + p.description).includes(normalize(q)),
  );
  const events = data.events
    .filter(
      (e) =>
        (!category || e.category === category) &&
        (!faculty ||
          e.faculty === faculty ||
          e.faculty === "Todas las facultades") &&
        (!career || e.career === career || e.career === "Todas las carreras") &&
        normalize(e.name + " " + e.description).includes(normalize(q)),
    )
    .sort((a, b) => Number(b.featured) - Number(a.featured));
  const isEvent = kind === "eventos";
  const count = isEvent ? events.length : places.length;
  return (
    <div className={tw("page")}>
      <Back />
      <PageHead
        title={isEvent ? "Eventos del campus" : "Localizaciones"}
        description={
          isEvent
            ? "Descubre lo que está pasando en tu comunidad."
            : "Encuentra los espacios y servicios de la universidad."
        }
        action={
          <Link
            className={tw("button")}
            to={isEvent ? "/eventos/nuevo" : "/solicitar"}
          >
            <Plus size={18} />
            {isEvent ? "Crear evento" : "Solicitar localización"}
          </Link>
        }
      />
      <div className={tw("catalog-tools")}>
        <SearchBox
          value={q}
          onChange={setQ}
          placeholder={
            isEvent
              ? "Buscar eventos por nombre o descripción"
              : "Buscar localizaciones por nombre o descripción"
          }
        />
        {isEvent ? (
          <>
            <select
              aria-label="Filtrar por facultad"
              value={faculty}
              onChange={(e) => setFaculty(e.target.value)}
            >
              <option value="">Todas las facultades</option>
              {faculties.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
            <select
              aria-label="Filtrar por carrera"
              value={career}
              onChange={(e) => setCareer(e.target.value)}
            >
              <option value="">Todas las carreras</option>
              {careers.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </>
        ) : (
          <label className={tw("checkbox-label")}>
            <input
              type="checkbox"
              checked={official}
              onChange={(e) => setOfficial(e.target.checked)}
            />
            Solo oficiales
          </label>
        )}
      </div>
      <CategoryFilters value={category} onChange={setCategory} />
      <div className={tw("results-heading")}>
        <span>
          {count} {isEvent ? "eventos" : "localizaciones"}
        </span>
        {q || category || faculty || career || official ? (
          <button
            className={tw("text-button")}
            onClick={() => {
              setQ("");
              setCategory("");
              setFaculty("");
              setCareer("");
              setOfficial(false);
            }}
          >
            Limpiar filtros
            <X size={14} />
          </button>
        ) : null}
      </div>
      {count ? (
        <div className={tw(isEvent ? "event-grid" : "place-grid")}>
          {isEvent
            ? events.map((e) => <EventCard key={e.id} event={e} />)
            : places.map((p) => <PlaceCard key={p.id} place={p} />)}
        </div>
      ) : (
        <Empty text="No se encontraron elementos para su criterio de búsqueda." />
      )}
    </div>
  );
}

export function Detail({ kind }: { kind: "lugares" | "eventos" }) {
  const { id } = useParams();
  const { data, setData, user, toast } = useStore();
  const navigate = useNavigate();
  const items = useMapItems();
  const obj = (kind === "lugares" ? data.places : data.events).find(
    (p) => p.id === id,
  );
  const [report, setReport] = useState(false);
  const commentForm = useForm<{ text: string }>({
    resolver: zodResolver(commentSchema),
    defaultValues: { text: "" },
  });
  const reportForm = useForm<{ reason: string }>({
    resolver: zodResolver(reportSchema),
    defaultValues: { reason: "" },
  });
  const editForm = useForm<{ text: string }>({
    resolver: zodResolver(commentSchema),
    defaultValues: { text: "" },
  });
  const commentError = commentForm.formState.errors.text?.message;
  const reportError = reportForm.formState.errors.reason?.message;
  const [editing, setEditing] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  if (!obj) return <NotFound />;
  const category = data.categories.find((c) => c.id === obj.category);
  const event = kind === "eventos" ? (obj as Event) : undefined;
  const place = kind === "lugares" ? (obj as Place) : undefined;
  const own = event?.author === user?.id;
  const needsLogin = () => {
    if (!user) {
      navigate("/acceso");
      return true;
    }
    return false;
  };
  function vote(type: "positive" | "negative") {
    if (needsLogin() || !event || !user) return;
    if (own) {
      toast("No puede validar sus propios eventos.", "error");
      return;
    }
    setData((d) => ({
      ...d,
      events: d.events.map((e) => {
        if (e.id !== event.id) return e;
        const old = e.votes[user.id];
        const votes = { ...e.votes };
        if (old === type) delete votes[user.id];
        else votes[user.id] = type;
        return {
          ...e,
          positive:
            e.positive -
            (old === "positive" ? 1 : 0) +
            (old === type ? 0 : type === "positive" ? 1 : 0),
          negative:
            e.negative -
            (old === "negative" ? 1 : 0) +
            (old === type ? 0 : type === "negative" ? 1 : 0),
          votes,
        };
      }),
    }));
  }
  function addComment({ text }: { text: string }) {
    if (needsLogin() || !user) return;

    setData((d) => ({
      ...d,
      comments: [
        ...d.comments,
        {
          id: uid(),
          event: obj!.id,
          author: user.id,
          text,
          date: new Date().toISOString(),
        },
      ],
    }));
    commentForm.reset();
    toast("El comentario ha sido publicado correctamente.");
  }
  function sendReport({ reason }: { reason: string }) {
    if (!user || !event) return;

    setData((d) => ({
      ...d,
      reports: [
        ...d.reports,
        {
          id: uid(),
          event: event.id,
          author: user.id,
          reason: reason.trim(),
          ignored: false,
        },
      ],
    }));
    setReport(false);
    reportForm.reset();
    toast("Denuncia realizada. Un gestor revisará el evento.");
  }
  return (
    <div className={tw("detail-screen")}>
      <MapView
        items={items}
        selected={id}
        onSelect={(i) => navigate(`/${i.kind}/${i.id}`)}
      />
      <Modal
        title={obj.name}
        onClose={() => navigate(kind === "eventos" ? "/eventos" : "/lugares")}
      >
        <div className={tw("detail-category")}>
          <CategoryIcon name={category?.icon} />
          <span>{category?.name}</span>
          {place?.official ? (
            <Badge>
              <BadgeCheck size={12} />
              Oficial UCI
            </Badge>
          ) : null}
          {event?.featured ? <Badge tone="gold">Destacado</Badge> : null}
        </div>
        {event ? <Metadata event={event} /> : null}
        <p className={tw("detail-description")}>{obj.description}</p>
        {place ? (
          <div className={tw("detail-facts")}>
            <p>
              <MapPin size={18} />
              {place.address}
            </p>
            <p>
              <Clock3 size={18} />
              {place.hours}
            </p>
          </div>
        ) : null}
        <p className={tw("coords")}>
          lat: {obj.coords[0]} · lon: {obj.coords[1]}
        </p>
        <Link
          className={tw("button full-width")}
          to={`/ruta/${kind}/${obj.id}`}
        >
          <Navigation size={17} />
          Calcular ruta
        </Link>
        {event ? (
          <>
            <div className={tw("event-organizer")}>
              <UserRound size={17} />
              <div>
                <small>Organiza</small>
                <strong>{event.organizer}</strong>
              </div>
            </div>
            <div className={tw("event-audience")}>
              <span>{event.faculty}</span>
              <span>{event.career}</span>
            </div>
            <div className={tw("reaction-row")}>
              <span>¿Es válida esta información?</span>
              <div>
                <button
                  disabled={own}
                  className={tw(
                    user && event.votes[user.id] === "positive"
                      ? "selected"
                      : "",
                  )}
                  onClick={() => vote("positive")}
                  aria-label="Validar evento"
                  title={
                    own ? "No puede validar sus propios eventos" : undefined
                  }
                >
                  <ThumbsUp size={17} />
                  {event.positive}
                </button>
                <button
                  disabled={own}
                  className={tw(
                    user && event.votes[user.id] === "negative"
                      ? "selected"
                      : "",
                  )}
                  onClick={() => vote("negative")}
                  aria-label="Marcar evento como no válido"
                >
                  <ThumbsDown size={17} />
                  {event.negative}
                </button>
              </div>
            </div>
            {own ? (
              <p className={tw("field-hint")}>
                Puedes comentar tu evento. La validación y la denuncia están
                reservadas a otros usuarios.
              </p>
            ) : null}
            <section className={tw("comments")}>
              <h3>
                <MessageCircle size={19} />
                Comentarios{" "}
                <span>
                  {data.comments.filter((c) => c.event === id).length}
                </span>
              </h3>
              {data.comments
                .filter((c) => c.event === id)
                .map((c) => {
                  const author = data.users.find((u) => u.id === c.author);
                  return (
                    <div className={tw("comment")} key={c.id}>
                      <div className={tw("comment-head")}>
                        <span className={tw("avatar small-avatar")}>
                          {author?.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </span>
                        <strong>{author?.name ?? "Usuario UCI"}</strong>
                        {user &&
                        (user.id === c.author || user.role === "gestor") ? (
                          <div className={tw("comment-actions")}>
                            <button
                              className={tw("icon-button")}
                              aria-label={`Editar comentario de ${author?.name}`}
                              onClick={() => {
                                setEditing(c.id);
                                editForm.reset({ text: c.text });
                              }}
                            >
                              <Pencil size={14} />
                            </button>
                            <button
                              className={tw("icon-button")}
                              aria-label={`Eliminar comentario de ${author?.name}`}
                              onClick={() => setDeleting(c.id)}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ) : null}
                      </div>
                      {editing === c.id ? (
                        <form
                          noValidate
                          onSubmit={editForm.handleSubmit(({ text }) => {
                            setData((d) => ({
                              ...d,
                              comments: d.comments.map((x) =>
                                x.id === c.id ? { ...x, text } : x,
                              ),
                            }));
                            setEditing(null);
                            toast("Comentario actualizado.");
                          })}
                        >
                          <textarea
                            required
                            aria-label="Editar comentario"
                            {...editForm.register("text")}
                            aria-invalid={!!editForm.formState.errors.text}
                            maxLength={1000}
                          />
                          <FieldError
                            message={editForm.formState.errors.text?.message}
                          />
                          <div className={tw("inline-actions")}>
                            <button
                              className={tw("text-button")}
                              type="button"
                              onClick={() => setEditing(null)}
                            >
                              Cancelar
                            </button>
                            <button className={tw("button small-button")}>
                              Guardar
                            </button>
                          </div>
                        </form>
                      ) : (
                        <p>{c.text}</p>
                      )}
                    </div>
                  );
                })}
              {!data.comments.some((c) => c.event === id) ? (
                <p className={tw("muted")}>
                  Sé la primera persona en comentar.
                </p>
              ) : null}
              <form
                className={tw("comment-form")}
                onSubmit={commentForm.handleSubmit(addComment)}
                noValidate
              >
                <label htmlFor="comment">Comentar evento</label>
                <textarea
                  id="comment"
                  {...commentForm.register("text")}
                  placeholder="Comparte con la comunidad…"
                  maxLength={1000}
                  aria-invalid={!!commentError}
                  aria-describedby="comment-error"
                />
                {commentError ? (
                  <p className={tw("field-error")} id="comment-error">
                    {commentError}
                  </p>
                ) : null}
                <button className={tw("button small-button")}>
                  Enviar comentario
                </button>
              </form>
            </section>
            <button
              className={tw("report-button")}
              disabled={own}
              onClick={() => {
                if (!needsLogin()) setReport(true);
              }}
            >
              <Flag size={15} />
              Denunciar evento
            </button>
          </>
        ) : null}
      </Modal>
      {report ? (
        <Modal title="Denunciar evento" onClose={() => setReport(false)}>
          <p className={tw("muted")}>
            La denuncia será privada y solo la podrán revisar los gestores.
          </p>
          <form onSubmit={reportForm.handleSubmit(sendReport)} noValidate>
            <label htmlFor="reason">Motivo de la denuncia *</label>
            <textarea
              id="reason"
              {...reportForm.register("reason")}
              placeholder="Explica qué información debemos revisar"
              maxLength={1000}
              autoFocus
              aria-invalid={!!reportError}
            />
            {reportError ? (
              <p className={tw("field-error")}>{reportError}</p>
            ) : null}
            <button className={tw("button full-width")}>
              Confirmar denuncia
            </button>
          </form>
        </Modal>
      ) : null}
      {deleting ? (
        <Confirm
          title="Eliminar comentario"
          text="Se eliminará este comentario del evento."
          action="Eliminar"
          danger
          onClose={() => setDeleting(null)}
          onConfirm={() => {
            setData((d) => ({
              ...d,
              comments: d.comments.filter((c) => c.id !== deleting),
            }));
            toast("Comentario eliminado.");
          }}
        />
      ) : null}
    </div>
  );
}

export function RoutePage() {
  const { kind = "lugares", id } = useParams();
  const { data, toast } = useStore();
  const navigate = useNavigate();
  const items = useMapItems();
  const [started, setStarted] = useState(false);
  const chosen = items.find((i) => i.id === id && i.kind === kind) ?? items[0];
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<{ origin: string; destination: string }>({
    resolver: zodResolver(
      routeSchema(
        data.places.map((place) => place.id),
        items.map((item) => `${item.kind}/${item.id}`),
      ),
    ),
    defaultValues: {
      origin: "my-position",
      destination: chosen ? `${chosen.kind}/${chosen.id}` : "",
    },
  });
  const chosenKey = chosen ? `${chosen.kind}/${chosen.id}` : "";
  useEffect(() => setValue("destination", chosenKey), [chosenKey, setValue]);
  const origin = useWatch({ control, name: "origin" });
  const start = data.places.find((p) => p.id === origin)?.coords ?? MY_POSITION;
  const destination = chosen?.coords ?? CAMPUS;
  const route = useMemo(
    () => [
      start,
      [start[0], (start[1] + destination[1]) / 2] as Coords,
      [
        (start[0] + destination[0]) / 2,
        (start[1] + destination[1]) / 2,
      ] as Coords,
      [destination[0], (start[1] + destination[1]) / 2] as Coords,
      destination,
    ],
    [start, destination],
  );
  const meters =
    Math.round(
      (Math.abs(start[0] - destination[0]) * 111000 +
        Math.abs(start[1] - destination[1]) * 102000) /
        10,
    ) * 10;
  const minutes = Math.max(1, Math.ceil(meters / 75));
  return (
    <div className={tw("map-screen route-screen")}>
      <MapView
        items={chosen ? [chosen] : []}
        selected={chosen?.id}
        start={start}
        route={route}
      />
      <form
        className={tw("route-panel")}
        noValidate
        onSubmit={handleSubmit(() => {
          setStarted((value) => !value);
          toast(
            started
              ? "Recorrido finalizado."
              : "Recorrido de demostración iniciado.",
          );
        })}
      >
        <Link className={tw("back-link")} to={id ? `/${kind}/${id}` : "/"}>
          <ChevronLeft size={17} />
          Volver
        </Link>
        <h1>Calcular ruta</h1>
        <label htmlFor="origin">Punto de partida</label>
        <div className={tw("route-input")}>
          <LocateFixed size={18} />
          <select
            id="origin"
            {...register("origin", { onChange: () => setStarted(false) })}
            aria-invalid={!!errors.origin}
          >
            <option value="my-position">Mi ubicación (demostración)</option>
            {data.places.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <FieldError message={errors.origin?.message} />
        <label htmlFor="destination">Destino</label>
        <div className={tw("route-input")}>
          <MapPin size={18} />
          <select
            id="destination"
            {...register("destination", {
              onChange: (e) => {
                navigate("/ruta/" + e.target.value);
                setStarted(false);
              },
            })}
            aria-invalid={!!errors.destination}
          >
            {items.map((i) => (
              <option value={`${i.kind}/${i.id}`} key={`${i.kind}-${i.id}`}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
        <FieldError message={errors.destination?.message} />
        <div className={tw("route-estimate")}>
          <span>
            <strong>{minutes} min</strong>
            <small>A pie · {meters} m aproximados</small>
          </span>
          <Navigation size={28} />
        </div>
        <Badge tone="gray">Ruta de demostración</Badge>
        <p className={tw("field-hint")}>
          El recorrido, la distancia y el tiempo son ilustrativos. La posición
          de partida es un dato de ejemplo.
        </p>
        <ol className={tw("route-steps")}>
          <li>
            <span className={tw("step-dot")} />
            <div>
              <strong>Sal del punto de partida</strong>
              <small>
                {origin === "my-position"
                  ? "Ubicación de ejemplo"
                  : data.places.find((p) => p.id === origin)?.name}
              </small>
            </div>
          </li>
          <li>
            <ArrowRight size={17} />
            <div>
              <strong>Continúa por el paseo del campus</strong>
              <small>Sigue la línea marcada en el mapa</small>
            </div>
          </li>
          <li>
            <MapPin size={17} />
            <div>
              <strong>Llegada a tu destino</strong>
              <small>{chosen?.name}</small>
            </div>
          </li>
        </ol>
        <button className={tw("button full-width")}>
          {started ? <Check size={18} /> : <Navigation size={18} />}{" "}
          {started ? "Finalizar recorrido" : "Iniciar recorrido demo"}
        </button>
      </form>
    </div>
  );
}

export function MyEvents() {
  const { data, user, setData, toast } = useStore();
  const [deleting, setDeleting] = useState<Event | null>(null);
  const mine = data.events.filter((e) => e.author === user?.id);
  return (
    <RequireUser>
      <div className={tw("page narrow")}>
        <Back />
        <PageHead
          title="Mis eventos"
          description="Crea, modifica y comparte actividades con tu comunidad."
          action={
            <Link className={tw("button")} to="/eventos/nuevo">
              <Plus size={18} />
              Crear evento
            </Link>
          }
        />
        <div className={tw("own-events")}>
          {mine.map((e) => (
            <article className={tw("own-event")} key={e.id}>
              <div className={tw("own-event-heading")}>
                <Link to={`/eventos/${e.id}`}>
                  <h3>{e.name}</h3>
                </Link>
                <div>
                  <Link
                    className={tw("icon-button")}
                    to={`/eventos/${e.id}/editar`}
                    aria-label={`Modificar ${e.name}`}
                  >
                    <Pencil size={18} />
                  </Link>
                  <button
                    className={tw("icon-button red-text")}
                    onClick={() => setDeleting(e)}
                    aria-label={`Eliminar ${e.name}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className={tw("category-line")}>
                {data.categories.find((c) => c.id === e.category)?.name} ·{" "}
                {dateLabel(e.start)}
              </p>
              <p>{e.description}</p>
              <div className={tw("own-event-stats")}>
                <span>
                  <ThumbsUp size={15} />
                  {e.positive} validaciones
                </span>
                <span>
                  <MapPin size={15} />
                  {e.place}
                </span>
              </div>
            </article>
          ))}
        </div>
        {!mine.length ? (
          <Empty
            title="Tu próximo encuentro empieza aquí"
            text="Todavía no has creado eventos. Comparte una actividad con la comunidad."
            action={
              <Link className={tw("button")} to="/eventos/nuevo">
                Crear mi primer evento
              </Link>
            }
          />
        ) : null}
        <Link
          className={tw("fab")}
          to="/eventos/nuevo"
          aria-label="Crear evento"
        >
          <Plus />
        </Link>
        {deleting ? (
          <Confirm
            title="¿Eliminar este evento?"
            text={`Se eliminará «${deleting.name}», incluidos sus comentarios y denuncias. Esta acción no se puede deshacer en la demostración.`}
            action="Eliminar evento"
            danger
            onClose={() => setDeleting(null)}
            onConfirm={() => {
              setData((d) => ({
                ...d,
                events: d.events.filter((e) => e.id !== deleting.id),
                comments: d.comments.filter((c) => c.event !== deleting.id),
                reports: d.reports.filter((r) => r.event !== deleting.id),
              }));
              toast("El evento ha sido eliminado.");
            }}
          />
        ) : null}
      </div>
    </RequireUser>
  );
}

export function Profile() {
  const { data, user, login, reset } = useStore();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  return (
    <RequireUser>
      <div className={tw("page narrow")}>
        <Back />
        <PageHead title="Mi cuenta" />
        <section className={tw("profile-card")}>
          <span className={tw("avatar large-avatar")}>
            {user?.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
          <div>
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <Badge tone="gray">
              {user?.role === "gestor" ? "Gestor" : "Comunidad universitaria"}
            </Badge>
          </div>
        </section>
        <div className={tw("profile-data")}>
          <span>
            Solapín <strong>{user?.badge}</strong>
          </span>
          <span>
            Facultad <strong>{user?.faculty}</strong>
          </span>
        </div>
        <div className={tw("profile-actions")}>
          <Link className={tw("button secondary")} to="/mis-eventos">
            <CalendarDays size={17} />
            Mis eventos
          </Link>
          {user?.role === "gestor" ? (
            <Link className={tw("button")} to="/admin">
              <ShieldCheck size={17} />
              Panel de administración
            </Link>
          ) : (
            <Link className={tw("button")} to="/solicitar">
              <Plus size={17} />
              Solicitar localización
            </Link>
          )}
        </div>
        <section className={tw("my-requests")}>
          <div className={tw("section-title")}>
            <h2>Mis solicitudes</h2>
            <span>
              {data.requests.filter((r) => r.author === user?.id).length}
            </span>
          </div>
          {data.requests
            .filter((r) => r.author === user?.id)
            .map((r) => (
              <article key={r.id} className={tw("request-card")}>
                <div>
                  <h3>{r.name}</h3>
                  <Badge
                    tone={
                      r.status === "pending"
                        ? "gold"
                        : r.status === "approved"
                          ? "green"
                          : "red"
                    }
                  >
                    {r.status === "pending"
                      ? "Pendiente"
                      : r.status === "approved"
                        ? "Aprobada"
                        : "Rechazada"}
                  </Badge>
                </div>
                <p>{r.description}</p>
                <small>Enviada el {dateLabel(r.date)}</small>
                {r.response ? (
                  <p className={tw("request-response")}>
                    <strong>Respuesta del gestor:</strong> {r.response}
                  </p>
                ) : null}
              </article>
            ))}
          {!data.requests.some((r) => r.author === user?.id) ? (
            <p className={tw("muted")}>
              Tus solicitudes de nuevas localizaciones aparecerán aquí.
            </p>
          ) : null}
        </section>
        <section className={tw("demo-settings")}>
          <h3>Demostración del prototipo</h3>
          <p>
            Las acciones se guardan en este navegador para recorrer los flujos
            de las pantallas.
          </p>
          <div className={tw("inline-actions")}>
            <Link className={tw("button secondary")} to="/acceso">
              Cambiar perfil demo
            </Link>
            <button
              className={tw("text-button")}
              onClick={() => setConfirm(true)}
            >
              Restablecer datos
            </button>
            <button
              className={tw("text-button")}
              onClick={() => {
                login(null);
                navigate("/acceso");
              }}
            >
              Cerrar sesión
            </button>
          </div>
        </section>
        {confirm ? (
          <Confirm
            title="Restablecer demostración"
            text="Los cambios locales se sustituirán por los datos de ejemplo iniciales."
            action="Restablecer"
            onClose={() => setConfirm(false)}
            onConfirm={reset}
          />
        ) : null}
      </div>
    </RequireUser>
  );
}

export function Login() {
  const { data, login, toast } = useStore();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; password: string }>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const [error, setError] = useState("");
  const [forgot, setForgot] = useState(false);
  const [show, setShow] = useState(false);
  function enter(id: string) {
    const u = data.users.find((x) => x.id === id);
    if (u?.blocked) {
      setError("Esta cuenta está suspendida. Contacta con un gestor.");
      return;
    }
    login(id);
    toast("Se ha autenticado correctamente en el sistema.");
    const next = params.get("next");
    navigate(
      next?.startsWith("/") && !next.startsWith("//")
        ? next
        : u?.role === "gestor"
          ? "/admin"
          : "/",
    );
  }
  function submit({ email, password }: { email: string; password: string }) {
    setError("");

    const u = data.users.find(
      (x) => x.email.toLowerCase() === email.toLowerCase().trim(),
    );
    if (!u || password !== "demo-uci") {
      setError("Las credenciales son incorrectas, intente de nuevo.");
      return;
    }
    enter(u.id);
  }
  return (
    <div className={tw("page login-page")}>
      <Back />
      <div className={tw("login-card")}>
        <Brand />
        <h1>Iniciar sesión</h1>
        <p className={tw("muted")}>Accede a la comunidad de tu campus.</p>
        <form onSubmit={handleSubmit(submit)} noValidate>
          <label htmlFor="email">Correo UCI</label>
          <input
            id="email"
            type="email"
            {...register("email")}
            aria-invalid={!!errors.email}
            placeholder="alain.demo@uci.cu"
            autoComplete="off"
          />
          <FieldError message={errors.email?.message} />
          <label htmlFor="password">Contraseña</label>
          <div className={tw("password-field")}>
            <input
              id="password"
              type={show ? "text" : "password"}
              {...register("password")}
              aria-invalid={!!errors.password}
              placeholder="Contraseña de demostración"
              autoComplete="off"
            />
            <button
              type="button"
              aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
              onClick={() => setShow((v) => !v)}
            >
              {show ? "Ocultar" : "Mostrar"}
            </button>
          </div>
          <FieldError message={errors.password?.message} />
          {error ? (
            <p className={tw("field-error")} role="alert">
              {error}
            </p>
          ) : null}
          <button className={tw("button full-width")}>Iniciar sesión</button>
          <button
            type="button"
            className={tw("text-button forgot")}
            onClick={() => setForgot(true)}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </form>
        <div className={tw("demo-login")}>
          <Badge tone="gray">Acceso de demostración</Badge>
          <p>
            Prueba las pantallas con un perfil de ejemplo. No introduzcas tu
            contraseña real de la UCI.
          </p>
          <div>
            <button
              className={tw("button secondary")}
              onClick={() => enter("alain")}
            >
              <UserRound size={18} />
              Entrar como usuario
              <ArrowUpRight size={16} />
            </button>
            <button
              className={tw("button secondary")}
              onClick={() => enter("gestor")}
            >
              <ShieldCheck size={18} />
              Entrar como gestor
              <ArrowUpRight size={16} />
            </button>
          </div>
          <small>
            También puedes usar alain.demo@uci.cu o gestor.demo@uci.cu con la
            contraseña <b>demo-uci</b>.
          </small>
        </div>
      </div>
      {forgot ? (
        <Modal title="Recuperar acceso" onClose={() => setForgot(false)}>
          <p>
            En el sistema final, la recuperación se realizará a través del
            proveedor de identidad de la universidad.
          </p>
          <p className={tw("muted")}>
            Para recorrer este prototipo, utiliza uno de los perfiles de
            demostración.
          </p>
          <button
            className={tw("button full-width")}
            onClick={() => setForgot(false)}
          >
            Entendido
          </button>
        </Modal>
      ) : null}
    </div>
  );
}
export function NotFound() {
  return (
    <div className={tw("page")}>
      <Empty
        title="Esta página no está en el mapa"
        text="La localización o el evento puede haberse eliminado."
        action={
          <Link className={tw("button")} to="/">
            Volver al mapa
          </Link>
        }
      />
    </div>
  );
}
