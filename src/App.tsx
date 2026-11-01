import { tw } from "./styles";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  Menu,
  X,
  MapPin,
  CalendarDays,
  Plus,
  LogIn,
  LogOut,
  ShieldCheck,
  UserRound,
  ChevronRight,
  Map as MapIcon,
} from "lucide-react";
import { Brand, CategoryIcon, SearchBox, Empty } from "./ui";
import { normalize } from "./model";
import { useStore } from "./store";
import {
  Explore,
  Catalog,
  Detail,
  RoutePage,
  MyEvents,
  Profile,
  Login,
  NotFound,
} from "./pages";
import { EventForm, RequestForm } from "./forms";
const Admin = lazy(() => import("./admin"));

function Drawer({ close }: { close: () => void }) {
  const { data, user } = useStore();
  const [query, setQuery] = useState("");
  const places = data.places.filter((p) =>
    normalize(p.name + " " + p.description).includes(normalize(query)),
  );
  const events = data.events.filter((p) =>
    normalize(p.name + " " + p.description).includes(normalize(query)),
  );
  const refId = "drawer-search";
  const drawerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.getElementById(refId)?.querySelector("input")?.focus();
    const background = [
      document.getElementById("main"),
      document.querySelector("header.topbar"),
    ];
    background.forEach((e) => e?.setAttribute("inert", ""));
    const hadOverflowHidden = document.body.classList.contains("overflow-hidden");
    document.body.classList.add("overflow-hidden");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") {
        const els = drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href],button,input,select,textarea,[tabindex="0"]',
        );
        if (!els?.length) return;
        const first = els[0],
          last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      background.forEach((e) => e?.removeAttribute("inert"));
      if (!hadOverflowHidden) document.body.classList.remove("overflow-hidden");
      previouslyFocused?.focus();
    };
  }, [close]);
  return (
    <div className={tw("drawer-backdrop")} onClick={close}>
      <aside
        ref={drawerRef}
        className={tw("drawer")}
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={tw("drawer-heading")}>
          <button
            className={tw("icon-button")}
            onClick={close}
            aria-label="Cerrar menú"
          >
            <X size={22} />
          </button>
          <h2>Menú</h2>
          <span className={tw("demo-tag")}>Demo</span>
        </div>
        <div id={refId} tabIndex={-1}>
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Busca localizaciones y eventos"
          />
        </div>
        <div className={tw("drawer-results")}>
          <section className={tw("drawer-section")}>
            <div className={tw("section-title")}>
              <MapPin size={18} />
              <h3>Localizaciones</h3>
              <Link
                to="/lugares"
                onClick={close}
                aria-label="Ver todas las localizaciones"
              >
                <ChevronRight size={17} />
              </Link>
            </div>
            {places.map((p) => (
              <Link
                key={p.id}
                onClick={close}
                to={`/lugares/${p.id}`}
                className={tw("drawer-result")}
              >
                <strong>{p.name}</strong>
                <small>
                  {data.categories.find((c) => c.id === p.category)?.name}
                </small>
              </Link>
            ))}
          </section>
          <section className={tw("drawer-section")}>
            <div className={tw("section-title")}>
              <CalendarDays size={18} />
              <h3>Eventos</h3>
              <Link
                to="/eventos"
                onClick={close}
                aria-label="Ver todos los eventos"
              >
                <ChevronRight size={17} />
              </Link>
            </div>
            {events.map((e) => (
              <Link
                key={e.id}
                onClick={close}
                to={`/eventos/${e.id}`}
                className={tw("drawer-result")}
              >
                <strong>{e.name}</strong>
                <small>
                  {data.categories.find((c) => c.id === e.category)?.name} ·{" "}
                  {e.positive} validaciones
                </small>
              </Link>
            ))}
          </section>
          {!places.length && !events.length ? (
            <Empty
              title="No se encontraron elementos"
              text="Prueba con otro criterio de búsqueda."
            />
          ) : null}
        </div>
        <nav className={tw("drawer-links")}>
          <Link to="/" onClick={close}>
            <MapIcon size={18} />
            Mapa del campus
          </Link>
          <Link to="/mis-eventos" onClick={close}>
            <CalendarDays size={18} />
            Mis eventos
          </Link>
          <Link to="/solicitar" onClick={close}>
            <Plus size={18} />
            Solicitar nueva localización
          </Link>
          <Link to="/perfil" onClick={close}>
            <UserRound size={18} />
            Mi cuenta y solicitudes
          </Link>
          {user?.role === "gestor" ? (
            <Link to="/admin" onClick={close}>
              <ShieldCheck size={18} />
              Panel de administración
            </Link>
          ) : null}
          <Link to="/acceso" onClick={close}>
            <LogIn size={18} />
            Cambiar perfil de demostración
          </Link>
        </nav>
        <p className={tw("drawer-foot")}>
          GeoUCI · Universidad de las Ciencias Informáticas
        </p>
      </aside>
    </div>
  );
}

export default function App() {
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const { user, login } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    setMenu(false);
    window.scrollTo(0, 0);
  }, [pathname]);
  const mapPage =
    pathname === "/" ||
    (/^\/(lugares|eventos)\/[^/]+$/.test(pathname) &&
      !pathname.endsWith("/nuevo")) ||
    pathname.startsWith("/ruta");
  return (
    <div className={tw(`app ${mapPage ? "map-layout" : ""}`)}>
      <a className={tw("skip-link")} href="#main">
        Saltar al contenido
      </a>
      <header className={tw("topbar")}>
        <div className={tw("header-brand")}>
          <button
            className={tw("menu-button")}
            aria-label="Abrir menú"
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            <Menu size={22} />
          </button>
          <Brand />
          {pathname.startsWith("/admin") ? (
            <span className={tw("admin-label")}>Admin</span>
          ) : null}
        </div>
        <nav className={tw("desktop-nav")} aria-label="Navegación">
          <NavLink to="/" end>
            Mapa
          </NavLink>
          <NavLink to="/lugares">Localizaciones</NavLink>
          <NavLink to="/eventos">Eventos</NavLink>
          {user?.role === "gestor" ? (
            <NavLink to="/admin">Administración</NavLink>
          ) : (
            <NavLink to="/mis-eventos">Mis eventos</NavLink>
          )}
        </nav>
        <div className={tw("header-account")}>
          <span className={tw("demo-tag")}>Prototipo</span>
          {user ? (
            <>
              <Link
                to="/perfil"
                className={tw("account-button")}
                aria-label={`Mi cuenta: ${user.name}`}
              >
                <span className={tw("avatar")}>
                  {user.name
                    .split(" ")
                    .map((s) => s[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span className={tw("account-name")}>
                  {user.name.split(" ")[0]}
                  <small>
                    {user.role === "gestor" ? "Gestor" : "Comunidad UCI"}
                  </small>
                </span>
              </Link>
              <button
                className={tw("icon-button logout-desktop")}
                aria-label="Cerrar sesión"
                onClick={() => {
                  login(null);
                  navigate("/acceso");
                }}
              >
                <LogOut size={17} />
              </button>
            </>
          ) : (
            <Link className={tw("button small-button")} to="/acceso">
              Iniciar sesión
            </Link>
          )}
        </div>
      </header>
      {menu ? <Drawer close={() => setMenu(false)} /> : null}
      <main id="main">
        <Suspense
          fallback={
            <div className={tw("loading")}>
              <MapPin />
              Cargando GeoUCI…
            </div>
          }
        >
          <Routes>
            <Route
              path="/"
              element={<Explore openMenu={() => setMenu(true)} />}
            />
            <Route path="/lugares" element={<Catalog kind="lugares" />} />
            <Route path="/eventos" element={<Catalog kind="eventos" />} />
            <Route path="/lugares/:id" element={<Detail kind="lugares" />} />
            <Route path="/eventos/:id" element={<Detail kind="eventos" />} />
            <Route path="/ruta" element={<RoutePage />} />
            <Route path="/ruta/:kind/:id" element={<RoutePage />} />
            <Route path="/eventos/nuevo" element={<EventForm />} />
            <Route path="/eventos/:id/editar" element={<EventForm />} />
            <Route path="/mis-eventos" element={<MyEvents />} />
            <Route path="/solicitar" element={<RequestForm />} />
            <Route path="/perfil" element={<Profile />} />
            <Route path="/acceso" element={<Login />} />
            <Route path="/admin/*" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}

export function CategoryFilters({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { data } = useStore();
  return (
    <div className={tw("category-filters")} aria-label="Filtrar por categoría">
      <button
        className={tw(!value ? "active" : "")}
        onClick={() => onChange("")}
      >
        Todas
      </button>
      {data.categories.map((c) => (
        <button
          key={c.id}
          className={tw(value === c.id ? "active" : "")}
          onClick={() => onChange(value === c.id ? "" : c.id)}
        >
          <CategoryIcon name={c.icon} size={15} />
          {c.name}
        </button>
      ))}
    </div>
  );
}
