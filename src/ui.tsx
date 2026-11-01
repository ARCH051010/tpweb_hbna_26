import { tw } from "./styles";
import { useEffect, useId, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  GraduationCap,
  Coffee,
  Music2,
  Dribbble,
  LibraryBig,
  House,
  Users,
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  Search,
  X,
  CalendarDays,
  BadgeCheck,
  MapPinned,
  Sparkles,
  Clock3,
} from "lucide-react";
import type { Event, Place } from "./model";
import { dateLabel, timeLabel } from "./model";
import { useStore } from "./store";

const icons: Record<string, typeof MapPin> = {
  graduation: GraduationCap,
  coffee: Coffee,
  music: Music2,
  ball: Dribbble,
  library: LibraryBig,
  home: House,
  users: Users,
};
export function CategoryIcon({
  name = "pin",
  size = 20,
}: {
  name?: string;
  size?: number;
}) {
  const Icon = icons[name] ?? MapPin;
  return <Icon size={size} />;
}
export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={tw("brand")} to="/" aria-label="GeoUCI, ir al mapa">
      <span className={tw("brand-icon")}>
        <MapPin size={25} strokeWidth={2.6} />
      </span>
      {!compact ? (
        <span>
          Geo<span className={tw("brand-green")}>UCI</span>
        </span>
      ) : null}
    </Link>
  );
}
export function Badge({
  children,
  tone = "green",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return <span className={tw(`badge ${tone}`)}>{children}</span>;
}
export function Back({
  to = "/",
  label = "Volver al mapa",
}: {
  to?: string;
  label?: string;
}) {
  return (
    <Link className={tw("back-link")} to={to}>
      <ChevronLeft size={17} />
      {label}
    </Link>
  );
}
export function PageHead({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className={tw("page-head")}>
      <div>
        {eyebrow ? <p className={tw("eyebrow")}>{eyebrow}</p> : null}
        <h1>{title}</h1>
        {description ? <p className={tw("muted")}>{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
export function SearchBox({
  value,
  onChange,
  placeholder = "Busca un lugar o un evento…",
}: {
  value: string;
  onChange: (s: string) => void;
  placeholder?: string;
}) {
  return (
    <div className={tw("search-box")}>
      <Search size={19} />
      <input
        aria-label={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {value ? (
        <button
          type="button"
          aria-label="Limpiar búsqueda"
          onClick={() => onChange("")}
        >
          <X size={16} />
        </button>
      ) : (
        <span className={tw("search-shortcut")}>⌕</span>
      )}
    </div>
  );
}
export function Empty({
  title = "No encontramos resultados",
  text = "Prueba con otro nombre o cambia los filtros.",
  action,
}: {
  title?: string;
  text?: string;
  action?: ReactNode;
}) {
  return (
    <div className={tw("empty")}>
      <span>
        <Search size={28} />
      </span>
      <h3>{title}</h3>
      <p>{text}</p>
      {action}
    </div>
  );
}
export function Modal({
  title,
  children,
  onClose,
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const d = ref.current;
    d?.showModal();
    return () => {
      d?.close();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={tw("modal")}
      aria-labelledby={id}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className={tw("modal-head")}>
        <h2 id={id}>{title}</h2>
        <button
          type="button"
          className={tw("icon-button")}
          aria-label="Cerrar ventana"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function Confirm({
  title,
  text,
  action = "Confirmar",
  danger = false,
  onConfirm,
  onClose,
}: {
  title: string;
  text: string;
  action?: string;
  danger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  return (
    <Modal title={title} onClose={onClose}>
      <p className={tw("muted modal-description")}>{text}</p>
      <div className={tw("modal-actions")}>
        <button className={tw("button secondary")} onClick={onClose}>
          Cancelar
        </button>
        <button
          className={tw(`button ${danger ? "danger" : ""}`)}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          {action}
        </button>
      </div>
    </Modal>
  );
}
export function PlaceCard({
  place,
  compact = false,
}: {
  place: Place;
  compact?: boolean;
}) {
  const { data } = useStore();
  const cat = data.categories.find((c) => c.id === place.category);
  return (
    <Link
      to={`/lugares/${place.id}`}
      className={tw(`place-card ${compact ? "compact" : ""}`)}
    >
      <div className={tw("place-card-content")}>
        <div
          className={tw("category-line") + " [color:var(--category-color)]"}
          style={{ "--category-color": cat?.color } as CSSProperties}
        >
          <CategoryIcon name={cat?.icon} size={13} />
          {cat?.name}
          {place.official ? (
            <BadgeCheck size={14} className={tw("official-icon")} />
          ) : null}
        </div>
        <h3>{place.name}</h3>
        <p>
          <MapPin size={12} />
          {compact ? place.address.split(" · ")[0] : place.address}
        </p>
      </div>
      <ArrowUpRight size={17} className={tw("card-arrow")} />
    </Link>
  );
}
export function EventCard({
  event,
  compact = false,
}: {
  event: Event;
  compact?: boolean;
}) {
  const { data } = useStore();
  const cat = data.categories.find((c) => c.id === event.category);
  return (
    <Link
      to={`/eventos/${event.id}`}
      className={tw(`event-card ${compact ? "compact" : ""}`)}
    >
      <div className={tw("event-art")}>
        {event.featured ? (
          <span className={tw("featured")}>
            <Sparkles size={12} /> Destacado
          </span>
        ) : null}
        <span className={tw("date-stamp")}>
          <b>{new Date(event.start).getDate()}</b>
          {new Intl.DateTimeFormat("es", { month: "short" }).format(
            new Date(event.start),
          )}
        </span>
      </div>
      <div className={tw("event-card-content")}>
        <div
          className={tw("category-line") + " [color:var(--category-color)]"}
          style={{ "--category-color": cat?.color } as CSSProperties}
        >
          {cat?.name}
          <span>•</span>
          <Clock3 size={12} />
          {timeLabel(event.start)}
        </div>
        <h3>{event.name}</h3>
        <p>
          <MapPin size={13} />
          {event.place}
        </p>
        <div className={tw("event-card-footer")}>
          <span>
            <span className={tw("avatar-stack")}>
              <i>LP</i>
              <i>RA</i>
              <i>+</i>
            </span>
            {event.positive} validaciones
          </span>
          <ArrowUpRight size={18} />
        </div>
      </div>
    </Link>
  );
}
export function Metadata({ event }: { event: Event }) {
  return (
    <div className={tw("metadata")}>
      <span>
        <CalendarDays size={19} />
        <span>
          <strong>{dateLabel(event.start)}</strong>
          <small>
            {timeLabel(event.start)}–{timeLabel(event.end)}
          </small>
        </span>
      </span>
      <span>
        <MapPinned size={19} />
        <span>
          <strong>{event.place}</strong>
          <small>Campus UCI, La Habana</small>
        </span>
      </span>
    </div>
  );
}
export function TextLink({
  to,
  children,
}: {
  to: string;
  children: ReactNode;
}) {
  return (
    <Link className={tw("text-link")} to={to}>
      {children}
      <ArrowRight size={15} />
    </Link>
  );
}
