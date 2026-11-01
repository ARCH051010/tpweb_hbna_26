import { tw } from "./styles";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categorySchema,
  locationSchema,
  userActionSchema,
  decisionSchema,
} from "./validation";
import type { CategoryValues, LocationValues } from "./validation";
import { Link, NavLink, Route, Routes } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Eye,
  Flag,
  Inbox,
  LayoutDashboard,
  MapPin,
  Pencil,
  Plus,
  ShieldCheck,
  Star,
  Tags,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useStore } from "./store";
import type { Category, Event, Place, User } from "./model";
import { dateLabel, normalize, uid } from "./model";
import {
  Back,
  Badge,
  CategoryIcon,
  Confirm,
  Empty,
  Modal,
  PageHead,
  SearchBox,
} from "./ui";
import { MapView, NotFound, RequireUser } from "./pages";
import { FieldError, LocationFields } from "./forms";

const tabs = [
  ["", "Estadísticas", LayoutDashboard],
  ["localizaciones", "Localizaciones", MapPin],
  ["eventos", "Eventos", CalendarDays],
  ["categorias", "Categorías", Tags],
  ["usuarios", "Usuarios", Users],
  ["solicitudes", "Solicitudes", Inbox],
] as const;
export default function Admin() {
  const { data } = useStore();
  return (
    <RequireUser admin>
      <div className={tw("admin-page")}>
        <div className={tw("admin-top")}>
          <Back />
          <span className={tw("admin-context")}>
            <ShieldCheck size={15} />
            Administración de GeoUCI
          </span>
        </div>
        <nav
          className={tw("admin-tabs")}
          aria-label="Secciones de administración"
        >
          {tabs.map(([path, label, Icon]) => (
            <NavLink
              key={path}
              to={`/admin${path ? "/" + path : ""}`}
              end={!path}
            >
              <Icon size={17} />
              {label}
              {path === "solicitudes" &&
              data.requests.some((r) => r.status === "pending") ? (
                <span className={tw("count-pill")}>
                  {data.requests.filter((r) => r.status === "pending").length}
                </span>
              ) : null}
            </NavLink>
          ))}
        </nav>
        <Routes>
          <Route index element={<Statistics />} />
          <Route path="categorias" element={<Categories />} />
          <Route path="localizaciones" element={<Locations />} />
          <Route path="eventos" element={<EventsControl />} />
          <Route path="usuarios" element={<UsersControl />} />
          <Route path="solicitudes" element={<Requests />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </RequireUser>
  );
}

function Statistics() {
  const { data } = useStore();
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("visits");
  const places = data.places
    .filter((p) => !category || p.category === category)
    .sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : b.visits - a.visits,
    );
  const events = data.events
    .filter((e) => !category || e.category === category)
    .sort((a, b) =>
      sort === "name" ? a.name.localeCompare(b.name) : b.visits - a.visits,
    );
  const cards = [
    {
      title: "Cantidad de usuarios",
      value: data.users.length,
      unit: "usuarios",
      description: "Usuarios registrados en el sistema",
      icon: Users,
    },
    {
      title: "Cantidad de eventos",
      value: events.length,
      unit: "eventos",
      description: "Eventos creados en el sistema",
      icon: CalendarDays,
    },
    {
      title: "Cantidad de localizaciones",
      value: places.length,
      unit: "localizaciones",
      description: "Localizaciones registradas en el sistema",
      icon: MapPin,
    },
    {
      title: "Solicitudes pendientes",
      value: data.requests.filter((r) => r.status === "pending").length,
      unit: "solicitudes",
      description: "Propuestas que esperan una revisión",
      icon: Inbox,
    },
  ];
  return (
    <>
      <PageHead
        title="Estadísticas del Sistema"
        description="Una vista general de la actividad del campus."
      />
      <div className={tw("admin-toolbar")}>
        <label>
          Categoría
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {data.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Ordenar listados
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="visits">Más visitados primero</option>
            <option value="name">Nombre A–Z</option>
          </select>
        </label>
        <Badge tone="gray">Datos de demostración</Badge>
      </div>
      <div className={tw("stats-grid")}>
        {cards.map((c) => (
          <section className={tw("stat-card")} key={c.title}>
            <div>
              <h2>{c.title}</h2>
              <c.icon size={20} />
            </div>
            <strong>
              {c.value} <span>{c.unit}</span>
            </strong>
            <p>{c.description}</p>
          </section>
        ))}
      </div>
      <div className={tw("rankings")}>
        <section className={tw("ranking-card")}>
          <h2>
            <MapPin size={22} />
            Localizaciones más visitadas
          </h2>
          {places.slice(0, 5).map((p, i) => (
            <Link
              to={`/lugares/${p.id}`}
              className={tw("ranking-row")}
              key={p.id}
            >
              <span className={tw("rank-number")}>{i + 1}</span>
              <div>
                <strong>{p.name}</strong>
                <small>
                  <Eye size={14} />
                  {p.visits} visitas
                </small>
              </div>
              <ChevronRight size={16} />
            </Link>
          ))}
        </section>
        <section className={tw("ranking-card")}>
          <h2>
            <CalendarDays size={22} />
            Eventos más visitados
          </h2>
          {events.slice(0, 5).map((e, i) => (
            <Link
              to={`/eventos/${e.id}`}
              className={tw("ranking-row")}
              key={e.id}
            >
              <span className={tw("rank-number")}>{i + 1}</span>
              <div>
                <strong>{e.name}</strong>
                <small>
                  <Eye size={14} />
                  {e.visits}
                  <span>·</span>
                  <Check size={14} />
                  {e.positive} validaciones
                </small>
              </div>
              <ChevronRight size={16} />
            </Link>
          ))}
        </section>
      </div>
      <p className={tw("field-hint")}>
        Los contadores de visitas son ilustrativos. Las cantidades de elementos
        reflejan los datos actuales de la demostración.
      </p>
    </>
  );
}

function Categories() {
  const { data, setData, toast } = useStore();
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Category | null | undefined>(
    undefined,
  );
  const [deleting, setDeleting] = useState<Category | null>(null);
  const categories = data.categories.filter((c) =>
    normalize(c.name + " " + c.description).includes(normalize(q)),
  );
  function remove(c: Category) {
    if (
      data.places.some((p) => p.category === c.id) ||
      data.events.some((e) => e.category === c.id) ||
      data.requests.some((r) => r.category === c.id && r.status === "pending")
    ) {
      toast(
        "La categoría a eliminar tiene elementos asociados. Reasígnalos antes de eliminarla.",
        "error",
      );
      return;
    }
    setDeleting(c);
  }
  return (
    <>
      <PageHead
        title="Categorías"
        action={
          <button className={tw("button")} onClick={() => setEditing(null)}>
            <Plus size={18} />
            Crear categoría
          </button>
        }
      />
      <div className={tw("admin-toolbar")}>
        <SearchBox value={q} onChange={setQ} placeholder="Buscar categorías" />
        <span className={tw("muted")}>{categories.length} categorías</span>
      </div>
      <div className={tw("table-wrap")}>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th className={tw("actions-column")}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td>
                  <span className={tw("table-name")}>
                    <CategoryIcon name={c.icon} size={17} />
                    {c.name}
                  </span>
                </td>
                <td className={tw("description-cell")}>{c.description}</td>
                <td>
                  <div className={tw("table-actions")}>
                    <button
                      className={tw("icon-button solid")}
                      aria-label={`Modificar categoría ${c.name}`}
                      onClick={() => setEditing(c)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className={tw("icon-button danger-solid")}
                      aria-label={`Eliminar categoría ${c.name}`}
                      onClick={() => remove(c)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!categories.length ? <Empty /> : null}
      {editing !== undefined ? (
        <CategoryEditor
          category={editing}
          close={() => setEditing(undefined)}
        />
      ) : null}
      {deleting ? (
        <Confirm
          title="¿Eliminar esta categoría?"
          text={`Se eliminará la categoría «${deleting.name}».`}
          action="Eliminar categoría"
          danger
          onClose={() => setDeleting(null)}
          onConfirm={() => {
            setData((d) => ({
              ...d,
              categories: d.categories.filter((c) => c.id !== deleting.id),
            }));
            toast("La categoría ha sido eliminada con éxito.");
          }}
        />
      ) : null}
    </>
  );
}
function CategoryEditor({
  category,
  close,
}: {
  category: Category | null;
  close: () => void;
}) {
  const { data, setData, toast } = useStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryValues>({
    resolver: zodResolver(categorySchema(data.categories, category?.id)),
    defaultValues: {
      name: category?.name ?? "",
      description: category?.description ?? "",
    },
  });
  function save({ name, description }: CategoryValues) {
    const item = {
      id: category?.id ?? uid(),
      name: name.trim(),
      description: description.trim(),
      icon: category?.icon ?? "pin",
      color: category?.color ?? "#6b7280",
    };
    setData((d) => ({
      ...d,
      categories: category
        ? d.categories.map((c) => (c.id === category.id ? item : c))
        : [...d.categories, item],
    }));
    toast(
      category
        ? "La categoría ha sido modificada correctamente."
        : "La categoría ha sido creada correctamente.",
    );
    close();
  }
  return (
    <Modal
      title={category ? "Modificar categoría" : "Nueva categoría"}
      onClose={close}
    >
      <form onSubmit={handleSubmit(save)} noValidate>
        <label htmlFor="category-name">Nombre</label>
        <input
          id="category-name"
          {...register("name")}
          placeholder="Nombre de la categoría"
          autoFocus
          maxLength={80}
          aria-invalid={!!errors.name}
        />
        <FieldError message={errors.name?.message} />
        <label htmlFor="category-description">
          Descripción de la categoría
        </label>
        <textarea
          id="category-description"
          {...register("description")}
          placeholder="Descripción de la categoría"
          maxLength={500}
          aria-invalid={!!errors.description}
        />
        <FieldError message={errors.description?.message} />
        <button className={tw("button full-width")}>Guardar</button>
      </form>
    </Modal>
  );
}

function Locations() {
  const { data, setData, toast } = useStore();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [editing, setEditing] = useState<Place | null | undefined>();
  const [selected, setSelected] = useState<string[]>([]);
  const [deleting, setDeleting] = useState<string[] | null>(null);
  const places = data.places.filter(
    (p) =>
      normalize(p.name + " " + p.description).includes(normalize(q)) &&
      (!category || p.category === category) &&
      (!type || (type === "official" ? p.official : !p.official)),
  );
  return (
    <>
      <PageHead
        title="Localizaciones"
        action={
          <button className={tw("button")} onClick={() => setEditing(null)}>
            <Plus size={18} />
            Crear localización
          </button>
        }
      />
      <div className={tw("admin-toolbar")}>
        <SearchBox
          value={q}
          onChange={setQ}
          placeholder="Buscar localizaciones"
        />
        <select
          aria-label="Filtrar categoría de localizaciones"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          {data.categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <select
          aria-label="Filtrar tipo de localización"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Todos los tipos</option>
          <option value="official">Oficiales</option>
          <option value="community">Comunitarias</option>
        </select>
      </div>
      {selected.length ? (
        <div className={tw("selection-bar")}>
          <span>{selected.length} seleccionadas</span>
          <button
            className={tw("text-button red-text")}
            onClick={() => setDeleting(selected)}
          >
            <Trash2 size={15} />
            Eliminar selección
          </button>
          <button
            className={tw("icon-button")}
            aria-label="Limpiar selección"
            onClick={() => setSelected([])}
          >
            <X size={17} />
          </button>
        </div>
      ) : null}
      <div className={tw("table-wrap")}>
        <table>
          <thead>
            <tr>
              <th className={tw("checkbox-column")}>
                <input
                  type="checkbox"
                  aria-label="Seleccionar todas las localizaciones visibles"
                  checked={
                    !!places.length &&
                    places.every((p) => selected.includes(p.id))
                  }
                  onChange={(e) =>
                    setSelected(e.target.checked ? places.map((p) => p.id) : [])
                  }
                />
              </th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Tipo</th>
              <th className={tw("actions-column")}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {places.map((p) => (
              <tr key={p.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(p.id)}
                    aria-label={`Seleccionar ${p.name}`}
                    onChange={(e) =>
                      setSelected((s) =>
                        e.target.checked
                          ? [...s, p.id]
                          : s.filter((x) => x !== p.id),
                      )
                    }
                  />
                </td>
                <td>
                  <Link className={tw("table-name")} to={`/lugares/${p.id}`}>
                    {p.name}
                    <ArrowUpRight size={14} />
                  </Link>
                </td>
                <td>
                  {data.categories.find((c) => c.id === p.category)?.name}
                </td>
                <td>
                  <Badge tone={p.official ? "gray" : "gold"}>
                    {p.official ? "Oficial" : "Comunitaria"}
                  </Badge>
                </td>
                <td>
                  <div className={tw("table-actions")}>
                    <button
                      className={tw("icon-button solid")}
                      aria-label={`Modificar ${p.name}`}
                      onClick={() => setEditing(p)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className={tw("icon-button danger-solid")}
                      aria-label={`Eliminar ${p.name}`}
                      onClick={() => setDeleting([p.id])}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!places.length ? <Empty /> : null}
      {editing !== undefined ? (
        <LocationEditor place={editing} close={() => setEditing(undefined)} />
      ) : null}
      {deleting ? (
        <Confirm
          title={
            deleting.length > 1
              ? "¿Eliminar estas localizaciones?"
              : "¿Eliminar esta localización?"
          }
          text={
            deleting.length > 1
              ? `Se eliminarán ${deleting.length} localizaciones del mapa.`
              : `Se eliminará «${data.places.find((p) => p.id === deleting[0])?.name}» del mapa.`
          }
          action="Eliminar localización"
          danger
          onClose={() => setDeleting(null)}
          onConfirm={() => {
            setData((d) => ({
              ...d,
              places: d.places.filter((p) => !deleting.includes(p.id)),
            }));
            setSelected([]);
            toast("La localización ha sido eliminada.");
          }}
        />
      ) : null}
    </>
  );
}
function LocationEditor({
  place,
  close,
}: {
  place: Place | null;
  close: () => void;
}) {
  const { data, setData, toast } = useStore();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<LocationValues>({
    resolver: zodResolver(locationSchema(data.categories)),
    defaultValues: {
      name: place?.name ?? "",
      category: place?.category ?? "",
      description: place?.description ?? "",
      lat: place ? String(place.coords[0]) : "",
      lng: place ? String(place.coords[1]) : "",
      address: place?.address ?? "",
      official: place?.official ?? false,
    },
  });
  const [lat, lng] = useWatch({ control, name: ["lat", "lng"] });
  function save({
    name,
    category,
    description,
    lat,
    lng,
    address,
    official,
  }: LocationValues) {
    const item: Place = {
      id: place?.id ?? uid(),
      name: name.trim(),
      category,
      description: description.trim(),
      coords: [Number(lat), Number(lng)],
      official,
      address: address.trim() || "Campus UCI",
      hours: place?.hours ?? "Consulta los horarios en el lugar",
      visits: place?.visits ?? 0,
      art: place?.art ?? "faculty",
    };
    setData((d) => ({
      ...d,
      places: place
        ? d.places.map((p) => (p.id === place.id ? item : p))
        : [...d.places, item],
    }));
    toast(
      place
        ? "La información de la localización ha sido actualizada."
        : "La localización ha sido creada con éxito.",
    );
    close();
  }
  return (
    <Modal
      title={place ? "Modificar localización" : "Nueva localización"}
      onClose={close}
    >
      <form onSubmit={handleSubmit(save)} noValidate>
        <label htmlFor="location-name">Nombre *</label>
        <input
          id="location-name"
          {...register("name")}
          maxLength={100}
          placeholder="Nombre de la localización"
          aria-invalid={!!errors.name}
        />
        <FieldError message={errors.name?.message} />
        <label htmlFor="location-category">Categoría *</label>
        <select
          id="location-category"
          {...register("category")}
          aria-invalid={!!errors.category}
        >
          <option value="">Seleccionar categoría</option>
          {data.categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <FieldError message={errors.category?.message} />
        <label htmlFor="location-description">Descripción *</label>
        <textarea
          id="location-description"
          {...register("description")}
          maxLength={2000}
          aria-invalid={!!errors.description}
        />
        <FieldError message={errors.description?.message} />
        <label htmlFor="address">Dirección o referencia</label>
        <input id="address" {...register("address")} maxLength={150} />
        <LocationFields
          latInput={register("lat")}
          lngInput={register("lng")}
          lat={lat}
          lng={lng}
          onChange={(a, b) => {
            setValue("lat", a, { shouldValidate: true, shouldDirty: true });
            setValue("lng", b, { shouldValidate: true, shouldDirty: true });
          }}
          error={errors.lat?.message}
        />
        <label className={tw("checkbox-label")}>
          <input type="checkbox" {...register("official")} />
          Es una localización oficial
        </label>
        <button className={tw("button full-width")}>Guardar</button>
      </form>
    </Modal>
  );
}

function EventsControl() {
  const { data, setData, toast } = useStore();
  const [q, setQ] = useState("");
  const [reported, setReported] = useState(false);
  const [reportsId, setReportsId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Event | null>(null);
  const count = (id: string) =>
    data.reports.filter((r) => r.event === id && !r.ignored).length;
  const events = data.events.filter(
    (e) =>
      normalize(e.name + " " + e.description).includes(normalize(q)) &&
      (!reported || count(e.id) > 0),
  );
  return (
    <>
      <PageHead title="Control de eventos" />
      <div className={tw("admin-toolbar")}>
        <SearchBox value={q} onChange={setQ} placeholder="Buscar eventos" />
        <div className={tw("segmented")}>
          <button
            className={tw(!reported ? "active" : "")}
            onClick={() => setReported(false)}
          >
            Todos los eventos
          </button>
          <button
            className={tw(reported ? "active" : "")}
            onClick={() => setReported(true)}
          >
            <Flag size={14} />
            Denunciados
          </button>
        </div>
      </div>
      <div className={tw("table-wrap")}>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Denuncias</th>
              <th className={tw("actions-column")}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.id}>
                <td>
                  <Link to={`/eventos/${e.id}`} className={tw("table-name")}>
                    {e.name}
                  </Link>
                  <small className={tw("table-subtitle")}>
                    {dateLabel(e.start)} · {e.organizer}
                  </small>
                </td>
                <td>
                  {data.categories.find((c) => c.id === e.category)?.name}
                </td>
                <td>
                  <button
                    className={tw(
                      `report-count ${count(e.id) ? "has-reports" : ""}`,
                    )}
                    onClick={() => setReportsId(e.id)}
                    aria-label={`Ver denuncias de ${e.name}`}
                  >
                    {count(e.id)}
                    {count(e.id) ? <ArrowUpRight size={15} /> : null}
                  </button>
                </td>
                <td>
                  <div className={tw("table-actions")}>
                    <button
                      className={tw(
                        `icon-button ${e.featured ? "starred" : ""}`,
                      )}
                      aria-label={
                        e.featured
                          ? `Quitar destacado a ${e.name}`
                          : `Destacar ${e.name}`
                      }
                      aria-pressed={e.featured}
                      onClick={() => {
                        setData((d) => ({
                          ...d,
                          events: d.events.map((x) =>
                            x.id === e.id ? { ...x, featured: !x.featured } : x,
                          ),
                        }));
                        toast(
                          e.featured
                            ? "Se ha retirado el destacado."
                            : "El evento ha sido destacado.",
                        );
                      }}
                    >
                      <Star
                        size={19}
                        fill={e.featured ? "currentColor" : "none"}
                      />
                    </button>
                    <button
                      className={tw("icon-button danger-solid")}
                      aria-label={`Eliminar ${e.name}`}
                      onClick={() => setDeleting(e)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!events.length ? <Empty /> : null}
      {reportsId ? (
        <Modal title="Denuncias" onClose={() => setReportsId(null)}>
          <p className={tw("muted")}>
            {data.events.find((e) => e.id === reportsId)?.name} · Solo visibles
            para gestores
          </p>
          {data.reports
            .filter((r) => r.event === reportsId)
            .map((r) => (
              <article className={tw("report-card")} key={r.id}>
                <strong>
                  {data.users.find((u) => u.id === r.author)?.name}
                </strong>
                <p>{r.reason}</p>
                {r.ignored ? (
                  <Badge tone="gray">Revisada · descartada</Badge>
                ) : (
                  <button
                    className={tw("button secondary small-button")}
                    onClick={() => {
                      setData((d) => ({
                        ...d,
                        reports: d.reports.map((x) =>
                          x.id === r.id ? { ...x, ignored: true } : x,
                        ),
                      }));
                      toast("La denuncia se ha revisado y descartado.");
                    }}
                  >
                    Descartar denuncia
                  </button>
                )}
              </article>
            ))}
          {!data.reports.some((r) => r.event === reportsId) ? (
            <p>No se han recibido denuncias para este evento.</p>
          ) : null}
        </Modal>
      ) : null}
      {deleting ? (
        <Confirm
          title="¿Eliminar este evento?"
          text={`Se eliminará «${deleting.name}» junto con sus comentarios y denuncias.`}
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
    </>
  );
}

function UsersControl() {
  const { data, setData, user, toast } = useStore();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("");
  const [action, setAction] = useState<{
    user: User;
    kind: "block" | "unblock" | "promote";
  } | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ reason: string }>({
    resolver: zodResolver(userActionSchema(action?.kind === "block")),
    defaultValues: { reason: "" },
  });
  const users = data.users.filter(
    (u) =>
      normalize(u.name + " " + u.email + " " + u.badge).includes(
        normalize(q),
      ) &&
      (!filter ||
        (filter === "blocked"
          ? u.blocked
          : filter === "gestor"
            ? u.role === "gestor"
            : !u.blocked)),
  );
  function choose(u: User, kind: "block" | "unblock" | "promote") {
    if (u.id === user?.id) {
      toast("No es posible bloquear o promoverse a sí mismo.", "error");
      return;
    }
    if (kind === "promote" && u.role === "gestor") {
      toast("El usuario ya es un gestor.", "error");
      return;
    }
    if (
      kind === "block" &&
      u.role === "gestor" &&
      data.users.filter((x) => x.role === "gestor" && !x.blocked).length <= 1
    ) {
      toast("No se puede bloquear al último gestor activo.", "error");
      return;
    }
    reset({ reason: "" });
    setAction({ user: u, kind });
  }
  function confirm({ reason }: { reason: string }) {
    if (!action) return;

    setData((d) => ({
      ...d,
      users: d.users.map((u) =>
        u.id === action.user.id
          ? {
              ...u,
              role: action.kind === "promote" ? "gestor" : u.role,
              blocked:
                action.kind === "block"
                  ? true
                  : action.kind === "unblock"
                    ? false
                    : u.blocked,
              suspensionReason: action.kind === "block" ? reason : "",
            }
          : u,
      ),
    }));
    toast(
      action.kind === "promote"
        ? "El usuario ha sido promovido a gestor."
        : action.kind === "block"
          ? "El usuario ha sido bloqueado."
          : "El usuario ha sido desbloqueado.",
    );
    setAction(null);
  }
  return (
    <>
      <PageHead title="Control de usuarios" />
      <div className={tw("admin-toolbar")}>
        <SearchBox
          value={q}
          onChange={setQ}
          placeholder="Buscar por nombre, correo o solapín"
        />
        <select
          aria-label="Filtrar estado de usuarios"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">Todos los usuarios</option>
          <option value="active">Activos</option>
          <option value="blocked">Bloqueados</option>
          <option value="gestor">Gestores</option>
        </select>
      </div>
      <div className={tw("table-wrap")}>
        <table className={tw("users-table")}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Solapín</th>
              <th>Gestor</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <strong>
                    {u.name}
                    {u.id === user?.id ? (
                      <span className={tw("you-label")}>Tú</span>
                    ) : null}
                  </strong>
                  <small className={tw("table-subtitle")}>{u.email}</small>
                </td>
                <td>{u.badge}</td>
                <td>
                  {u.role === "gestor" ? (
                    <Badge tone="gray">
                      <ShieldCheck size={12} />
                      Es gestor
                    </Badge>
                  ) : (
                    <button
                      className={tw("button small-button")}
                      onClick={() => choose(u, "promote")}
                    >
                      Promover a gestor
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className={tw(
                      `button small-button ${u.blocked ? "secondary red-text" : "danger"}`,
                    )}
                    onClick={() => choose(u, u.blocked ? "unblock" : "block")}
                  >
                    {u.blocked ? "Desbloquear usuario" : "Bloquear usuario"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!users.length ? <Empty /> : null}
      <p className={tw("field-hint")}>
        No se permite modificar el propio rol ni bloquear al último gestor
        activo. En esta versión solo se puede promover a gestor.
      </p>
      {action ? (
        <Modal
          title={
            action.kind === "promote"
              ? "¿Promover a este usuario?"
              : action.kind === "block"
                ? "¿Bloquear a este usuario?"
                : "¿Desbloquear a este usuario?"
          }
          onClose={() => setAction(null)}
        >
          <p>
            <strong>{action.user.name}</strong>
            <br />
            {action.user.email}
          </p>
          <form onSubmit={handleSubmit(confirm)} noValidate>
            {action.kind === "block" ? (
              <>
                <label htmlFor="block-reason">Razón de la suspensión *</label>
                <textarea
                  id="block-reason"
                  {...register("reason")}
                  maxLength={500}
                  aria-invalid={!!errors.reason}
                />
                <FieldError message={errors.reason?.message} />
              </>
            ) : (
              <p className={tw("muted")}>
                {action.kind === "promote"
                  ? "Tendrá acceso a las funciones de administración."
                  : "Podrá volver a acceder a las funciones de la comunidad."}
              </p>
            )}
            <div className={tw("modal-actions")}>
              <button
                type="button"
                className={tw("button secondary")}
                onClick={() => setAction(null)}
              >
                Cancelar
              </button>
              <button
                className={tw(
                  `button ${action.kind === "block" ? "danger" : ""}`,
                )}
              >
                {action.kind === "promote"
                  ? "Promover usuario"
                  : action.kind === "block"
                    ? "Bloquear usuario"
                    : "Desbloquear usuario"}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </>
  );
}

function Requests() {
  const { data, setData, toast } = useStore();
  const [filter, setFilter] = useState("pending");
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [mode, setMode] = useState<"review" | "approve" | "reject">("review");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ reason: string; official: boolean }>({
    resolver: zodResolver(decisionSchema(mode === "reject")),
    defaultValues: { reason: "", official: false },
  });
  const requests = data.requests.filter(
    (r) =>
      (!filter || r.status === filter) &&
      normalize(
        r.name + " " + (data.users.find((u) => u.id === r.author)?.name ?? ""),
      ).includes(normalize(q)),
  );
  const request = data.requests.find((r) => r.id === selected);
  const mapItems = useMemo(
    () =>
      request
        ? [
            {
              id: request.id,
              name: request.name,
              coords: request.coords,
              kind: "lugares" as const,
              color: "#258dcd",
              symbol: "●",
            },
          ]
        : [],
    [request],
  );
  function decide(
    accepted: boolean,
    { reason, official }: { reason: string; official: boolean },
  ) {
    if (!request || request.status !== "pending") return;

    setData((d) => ({
      ...d,
      requests: d.requests.map((r) =>
        r.id === request.id
          ? {
              ...r,
              status: accepted ? ("approved" as const) : ("rejected" as const),
              response: accepted
                ? "La localización ha sido añadida al mapa del campus."
                : reason.trim(),
            }
          : r,
      ),
      places: accepted
        ? [
            ...d.places,
            {
              id: uid(),
              name: request.name,
              description: request.description,
              category: request.category,
              coords: request.coords,
              official,
              address: "Campus UCI · propuesta de la comunidad",
              hours: "Consulta los horarios en el lugar",
              visits: 0,
              art: "faculty",
            },
          ]
        : d.places,
    }));
    toast(
      accepted
        ? "La solicitud fue aceptada y la localización se añadió al mapa."
        : "La solicitud fue rechazada. El motivo está disponible en la cuenta del solicitante.",
    );
    setSelected(null);
  }
  return (
    <>
      <PageHead
        title="Solicitudes de usuarios"
        description="Revisa las propuestas de nuevas localizaciones."
      />
      <div className={tw("admin-toolbar")}>
        <SearchBox
          value={q}
          onChange={setQ}
          placeholder="Buscar solicitudes o solicitantes"
        />
        <select
          aria-label="Filtrar estado de solicitudes"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="pending">Pendientes</option>
          <option value="approved">Aprobadas</option>
          <option value="rejected">Rechazadas</option>
          <option value="">Todas las solicitudes</option>
        </select>
      </div>
      <div className={tw("requests-grid")}>
        {requests.map((r) => (
          <button
            key={r.id}
            className={tw("request-summary")}
            onClick={() => {
              setSelected(r.id);
              setMode("review");
              reset({ reason: "", official: false });
            }}
          >
            <div className={tw("request-summary-head")}>
              <strong>{data.users.find((u) => u.id === r.author)?.name}</strong>
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
            <small>Nueva localización</small>
            <h3>{r.name}</h3>
            <p>{r.description}</p>
            <span className={tw("request-summary-foot")}>
              {dateLabel(r.date)}
              <ArrowUpRight size={17} />
            </span>
          </button>
        ))}
      </div>
      {!requests.length ? (
        <Empty
          title="No hay solicitudes en esta vista"
          text="Las nuevas propuestas aparecerán aquí para su revisión."
        />
      ) : null}
      {request ? (
        <Modal
          title={`Solicitud de ${data.users.find((u) => u.id === request.author)?.name}`}
          onClose={() => setSelected(null)}
        >
          <p className={tw("muted small-text")}>
            {data.users.find((u) => u.id === request.author)?.email}
          </p>
          <div className={tw("request-detail")}>
            <p>
              <strong>Nombre:</strong> {request.name}
            </p>
            <p>
              <strong>Categoría:</strong>{" "}
              {data.categories.find((c) => c.id === request.category)?.name}
            </p>
            <p>
              <strong>Descripción:</strong> {request.description}
            </p>
            <p>
              <strong>Razón de la solicitud:</strong> {request.reason}
            </p>
          </div>
          <MapView small items={mapItems} selected={request.id} />
          <p className={tw("coords")}>
            lat: {request.coords[0]} · lon: {request.coords[1]}
          </p>
          {request.status === "pending" ? (
            mode === "review" ? (
              <div className={tw("request-review-actions")}>
                <label className={tw("checkbox-label")}>
                  <input type="checkbox" {...register("official")} />
                  Es una localización oficial
                </label>
                <button
                  className={tw("button full-width")}
                  onClick={() => setMode("approve")}
                >
                  <Check size={17} />
                  Aprobar solicitud
                </button>
                <button
                  className={tw("button secondary full-width")}
                  onClick={() => setMode("reject")}
                >
                  <X size={17} />
                  Rechazar solicitud
                </button>
              </div>
            ) : mode === "approve" ? (
              <div className={tw("decision-box")}>
                <p>
                  ¿Añadir <strong>{request.name}</strong> al mapa del campus?
                </p>
                <div className={tw("modal-actions")}>
                  <button
                    className={tw("button secondary")}
                    onClick={() => setMode("review")}
                  >
                    Cancelar
                  </button>
                  <button
                    className={tw("button")}
                    onClick={handleSubmit((values) => decide(true, values))}
                  >
                    Confirmar aprobación
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit((values) => decide(false, values))}
                noValidate
              >
                <label htmlFor="reject-reason">Motivo del rechazo *</label>
                <textarea
                  id="reject-reason"
                  {...register("reason")}
                  maxLength={1000}
                  aria-invalid={!!errors.reason}
                  placeholder="Este motivo será visible para el solicitante"
                />
                <FieldError message={errors.reason?.message} />
                <div className={tw("modal-actions")}>
                  <button
                    type="button"
                    className={tw("button secondary")}
                    onClick={() => setMode("review")}
                  >
                    Cancelar
                  </button>
                  <button className={tw("button danger")}>
                    Confirmar rechazo
                  </button>
                </div>
              </form>
            )
          ) : (
            <div className={tw("request-response")}>
              <Badge tone={request.status === "approved" ? "green" : "red"}>
                {request.status === "approved" ? "Aprobada" : "Rechazada"}
              </Badge>
              <p>{request.response}</p>
            </div>
          )}
        </Modal>
      ) : null}
    </>
  );
}
