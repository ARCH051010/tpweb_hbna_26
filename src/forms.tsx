import { tw } from "./styles";
import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema, requestSchema } from "./validation";
import type { EventValues, RequestValues } from "./validation";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, MapPin } from "lucide-react";
import type { Coords, Event } from "./model";
import { careers, faculties, inCampus, uid } from "./model";
import { useStore } from "./store";
import { Back, PageHead } from "./ui";
import { MapView, NotFound, RequireUser } from "./pages";

export function FieldError({ message }: { message?: string }) {
  return message ? (
    <p className={tw("field-error")} role="alert">
      {message}
    </p>
  ) : null;
}
export function LocationFields({
  lat,
  lng,
  onChange,
  error,
  latInput,
  lngInput,
}: {
  lat: string;
  lng: string;
  latInput: UseFormRegisterReturn;
  lngInput: UseFormRegisterReturn;
  onChange: (lat: string, lng: string, name?: string) => void;
  error?: string;
}) {
  const { data } = useStore();
  const items = useMemo(
    () =>
      lat && lng && inCampus([Number(lat), Number(lng)])
        ? [
            {
              id: "selected-point",
              name: "Punto seleccionado",
              kind: "lugares" as const,
              coords: [Number(lat), Number(lng)] as Coords,
              color: "#258dcd",
              symbol: "●",
            },
          ]
        : [],
    [lat, lng],
  );
  return (
    <fieldset className={tw("location-fields")}>
      <legend>Ubicación en el campus *</legend>
      <select
        aria-label="Elegir una localización existente"
        value=""
        onChange={(e) => {
          const p = data.places.find((p) => p.id === e.target.value);
          if (p) onChange(String(p.coords[0]), String(p.coords[1]), p.name);
        }}
      >
        <option value="">Selecciona una localización o toca el mapa</option>
        {data.places.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      <MapView
        small
        picking
        items={items}
        selected="selected-point"
        onPick={(p) =>
          onChange(String(p[0]), String(p[1]), "Punto seleccionado en el mapa")
        }
      />
      <div className={tw("form-columns coordinate-fields")}>
        <div>
          <label htmlFor="latitude">Latitud</label>
          <input
            id="latitude"
            inputMode="decimal"
            {...latInput}
            placeholder="22.987562"
            aria-invalid={!!error}
          />
        </div>
        <div>
          <label htmlFor="longitude">Longitud</label>
          <input
            id="longitude"
            inputMode="decimal"
            {...lngInput}
            placeholder="-82.466557"
            aria-invalid={!!error}
          />
        </div>
      </div>
      <FieldError message={error} />
      <p className={tw("field-hint")}>
        <MapPin size={12} />
        Las localizaciones y eventos deben estar dentro del campus. Posiciones
        aproximadas para el prototipo.
      </p>
    </fieldset>
  );
}
export function EventForm() {
  const { id } = useParams();
  const { data, setData, user, toast } = useStore();
  const original = data.events.find((e) => e.id === id);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<EventValues>({
    resolver: zodResolver(eventSchema(data.categories)),
    defaultValues: {
      name: original?.name ?? "",
      category: original?.category ?? "",
      description: original?.description ?? "",
      organizer: original?.organizer ?? user?.name ?? "",
      lat: original ? String(original.coords[0]) : "",
      lng: original ? String(original.coords[1]) : "",
      place: original?.place ?? "",
      start: original?.start ?? "",
      end: original?.end ?? "",
      faculty: original?.faculty ?? "Todas las facultades",
      career: original?.career ?? "Todas las carreras",
    },
  });
  const [lat, lng] = useWatch({ control, name: ["lat", "lng"] });
  if (id && !original) return <NotFound />;
  if (original && original.author !== user?.id)
    return (
      <RequireUser>
        <div className={tw("page narrow")}>
          <Back to="/mis-eventos" label="Volver a mis eventos" />
          <h1>Este evento pertenece a otro usuario</h1>
          <p>Solo puedes modificar los eventos que has creado.</p>
        </div>
      </RequireUser>
    );
  function submit({
    name,
    category,
    description,
    organizer,
    lat,
    lng,
    place,
    start,
    end,
    faculty,
    career,
  }: EventValues) {
    if (!user) return;
    const event: Event = {
      id: original?.id ?? uid(),
      name: name.trim(),
      category,
      description: description.trim(),
      organizer: organizer.trim(),
      coords: [Number(lat), Number(lng)],
      start,
      end,
      faculty,
      career,
      place: place || "Punto del campus",
      author: user.id,
      featured: original?.featured ?? false,
      positive: original?.positive ?? 0,
      negative: original?.negative ?? 0,
      visits: original?.visits ?? 0,
      art: original?.art ?? "innovation",
      votes: original?.votes ?? {},
    };
    setData((d) => ({
      ...d,
      events: original
        ? d.events.map((x) => (x.id === id ? event : x))
        : [...d.events, event],
    }));
    toast(
      original
        ? "El evento ha sido modificado correctamente."
        : "El evento ha sido creado correctamente.",
    );
    navigate("/mis-eventos");
  }
  return (
    <RequireUser>
      <div className={tw("page form-page")}>
        <Back to="/mis-eventos" label="Volver a mis eventos" />
        <div className={tw("form-card")}>
          <PageHead
            title={original ? "Modificar evento" : "Nuevo evento"}
            description="Comparte una actividad con la comunidad universitaria."
          />
          <form onSubmit={handleSubmit(submit)} noValidate>
            {Object.keys(errors).length ? (
              <div className={tw("form-alert")} role="alert">
                Ha introducido valores incorrectos. Revisa los campos señalados.
              </div>
            ) : null}
            <label htmlFor="name">Nombre *</label>
            <input
              id="name"
              {...register("name")}
              placeholder="Nombre del evento"
              maxLength={100}
              aria-invalid={!!errors.name}
            />
            <FieldError message={errors.name?.message} />
            <label htmlFor="category">Categoría *</label>
            <select
              id="category"
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
            <label htmlFor="organizer">Organizador *</label>
            <input
              id="organizer"
              {...register("organizer")}
              maxLength={120}
              aria-invalid={!!errors.organizer}
            />
            <FieldError message={errors.organizer?.message} />
            <label htmlFor="description">Descripción *</label>
            <textarea
              id="description"
              {...register("description")}
              placeholder="¿En qué consiste la actividad?"
              maxLength={2000}
              rows={4}
              aria-invalid={!!errors.description}
            />
            <FieldError message={errors.description?.message} />
            <div className={tw("form-columns")}>
              <div>
                <label htmlFor="start">Inicio *</label>
                <input
                  id="start"
                  type="datetime-local"
                  {...register("start")}
                  aria-invalid={!!errors.start}
                />
                <FieldError message={errors.start?.message} />
              </div>
              <div>
                <label htmlFor="end">Finalización *</label>
                <input
                  id="end"
                  type="datetime-local"
                  {...register("end")}
                  aria-invalid={!!errors.end}
                />
                <FieldError message={errors.end?.message} />
              </div>
            </div>
            <LocationFields
              latInput={register("lat")}
              lngInput={register("lng")}
              lat={lat}
              lng={lng}
              error={errors.lat?.message}
              onChange={(a, b, p) => {
                setValue("lat", a, { shouldValidate: true, shouldDirty: true });
                setValue("lng", b, { shouldValidate: true, shouldDirty: true });
                if (p) setValue("place", p);
              }}
            />
            <label htmlFor="faculty">Facultad</label>
            <select id="faculty" {...register("faculty")}>
              <option>Todas las facultades</option>
              {faculties.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
            <label htmlFor="career">Carrera</label>
            <select id="career" {...register("career")}>
              <option>Todas las carreras</option>
              {careers.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <div className={tw("form-footer")}>
              <Link className={tw("button secondary")} to="/mis-eventos">
                Cancelar
              </Link>
              <button className={tw("button")}>
                {original ? "Guardar cambios" : "Crear evento"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </RequireUser>
  );
}

export function RequestForm() {
  const { data, setData, user, toast } = useStore();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<RequestValues>({
    resolver: zodResolver(requestSchema(data.categories)),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      reason: "",
      lat: "",
      lng: "",
    },
  });
  const [lat, lng, name] = useWatch({ control, name: ["lat", "lng", "name"] });
  const [sent, setSent] = useState(false);
  function submit({
    name,
    category,
    description,
    reason,
    lat,
    lng,
  }: RequestValues) {
    if (!user) return;
    setData((d) => ({
      ...d,
      requests: [
        ...d.requests,
        {
          id: uid(),
          name: name.trim(),
          category,
          description: description.trim(),
          reason: reason.trim(),
          coords: [Number(lat), Number(lng)],
          author: user.id,
          status: "pending",
          response: "",
          date: new Date().toISOString(),
        },
      ],
    }));
    setSent(true);
    toast("Su solicitud ha sido enviada a un gestor para revisión.");
  }
  return (
    <RequireUser>
      <div className={tw("page form-page")}>
        <Back />
        {sent ? (
          <div className={tw("form-card success-state")}>
            <CheckCircle2 size={48} />
            <h1>Solicitud enviada</h1>
            <p>
              Un gestor revisará la información de <strong>{name}</strong> antes
              de incorporarla al mapa.
            </p>
            <p className={tw("muted")}>
              Puedes consultar el estado y la respuesta desde tu cuenta.
            </p>
            <Link className={tw("button full-width")} to="/perfil">
              Ver mis solicitudes
            </Link>
            <Link className={tw("button secondary full-width")} to="/">
              Volver al mapa
            </Link>
          </div>
        ) : (
          <div className={tw("form-card")}>
            <PageHead
              title="Solicitar localización"
              description="Ayuda a completar el mapa de nuestro campus."
            />
            <form onSubmit={handleSubmit(submit)} noValidate>
              {Object.keys(errors).length ? (
                <div className={tw("form-alert")} role="alert">
                  Ha introducido valores incorrectos.
                </div>
              ) : null}
              <label htmlFor="name">Nombre *</label>
              <input
                id="name"
                {...register("name")}
                placeholder="Nombre de la localización"
                maxLength={100}
                aria-invalid={!!errors.name}
              />
              <FieldError message={errors.name?.message} />
              <label htmlFor="category">Categoría *</label>
              <select
                id="category"
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
              <label htmlFor="description">Descripción *</label>
              <textarea
                id="description"
                {...register("description")}
                placeholder="Describe el espacio y qué podemos encontrar allí"
                maxLength={2000}
                aria-invalid={!!errors.description}
              />
              <FieldError message={errors.description?.message} />
              <LocationFields
                latInput={register("lat")}
                lngInput={register("lng")}
                lat={lat}
                lng={lng}
                error={errors.lat?.message}
                onChange={(a, b) => {
                  setValue("lat", a, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  setValue("lng", b, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
              />
              <label htmlFor="reason">Razón de la solicitud *</label>
              <textarea
                id="reason"
                {...register("reason")}
                placeholder="¿Por qué debería aparecer en el mapa?"
                maxLength={1000}
                aria-invalid={!!errors.reason}
              />
              <FieldError message={errors.reason?.message} />
              <p className={tw("field-hint")}>
                Toda nueva localización debe ser aprobada por un gestor.
              </p>
              <button className={tw("button full-width")}>
                Solicitar localización
              </button>
            </form>
          </div>
        )}
      </div>
    </RequireUser>
  );
}
