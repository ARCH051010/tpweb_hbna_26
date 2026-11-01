import { tw } from "./styles";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import {
  Layers,
  LocateFixed,
  Plus,
  Minus,
  Compass,
  MapPin,
} from "lucide-react";
import type { Coords } from "./model";
import { CAMPUS, CAMPUS_BOUNDS, MY_POSITION } from "./model";

export type MapItem = {
  id: string;
  kind: "lugares" | "eventos";
  name: string;
  coords: Coords;
  color: string;
  symbol: string;
};
type Props = {
  items?: MapItem[];
  selected?: string;
  onSelect?: (item: MapItem) => void;
  route?: Coords[];
  start?: Coords;
  small?: boolean;
  picking?: boolean;
  onPick?: (p: Coords) => void;
};
export default function CampusMap({
  items = [],
  selected,
  onSelect,
  route,
  start = MY_POSITION,
  small = false,
  picking = false,
  onPick,
}: Props) {
  const el = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.LayerGroup | null>(null);
  const path = useRef<L.LayerGroup | null>(null);
  const handler = useRef(onSelect);
  handler.current = onSelect;
  const picker = useRef(onPick);
  picker.current = onPick;
  const canPick = useRef(picking);
  canPick.current = picking;
  const [layer, setLayer] = useState<"real" | "schema">("real");
  const [layersOpen, setLayersOpen] = useState(false);
  useEffect(() => {
    if (!el.current) return;
    const m = L.map(el.current, {
      zoomControl: false,
      attributionControl: false,
      minZoom: 14,
      maxZoom: 19,
      scrollWheelZoom: !small,
      maxBounds: [
        [22.966, -82.494],
        [23.008, -82.438],
      ],
      maxBoundsViscosity: 0.8,
    }).setView(CAMPUS, small ? 15 : 16);
    map.current = m;
    L.imageOverlay("/campus.svg", CAMPUS_BOUNDS, {
      opacity: 1,
      pane: "tilePane",
      zIndex: 0,
    }).addTo(m);
    markers.current = L.layerGroup().addTo(m);
    path.current = L.layerGroup().addTo(m);
    m.on("click", (e) => {
      if (canPick.current)
        picker.current?.([+e.latlng.lat.toFixed(6), +e.latlng.lng.toFixed(6)]);
    });
    const observer = new ResizeObserver(() => m.invalidateSize());
    observer.observe(el.current);
    return () => {
      observer.disconnect();
      m.remove();
      map.current = null;
    };
  }, [small]);
  useEffect(() => {
    const m = map.current;
    if (!m || layer !== "real") return;
    let failures = 0;
    const tile = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      crossOrigin: true,
      zIndex: 1,
    });
    tile.on("tileerror", () => {
      failures++;
      if (failures >= 3) setLayer("schema");
    });
    tile.addTo(m);
    return () => {
      m.removeLayer(tile);
    };
  }, [layer, small]);
  useEffect(() => {
    const group = markers.current;
    const m = map.current;
    if (!group || !m) return;
    group.clearLayers();
    for (const item of items) {
      const root = document.createElement("div");
      root.className = tw(
        `map-marker ${item.kind === "eventos" ? "event-marker" : ""} ${selected === item.id ? "selected" : ""}`,
      );
      root.style.setProperty("--marker-color", item.color);
      const span = document.createElement("span");
      span.textContent = item.symbol;
      root.append(span);
      const icon = L.divIcon({
        html: root,
        iconSize: [40, 48],
        iconAnchor: [20, 45],
        className: tw("marker-host"),
      });
      const marker = L.marker(item.coords, {
        icon,
        title: item.name,
        alt: item.name,
        keyboard: true,
      }).addTo(group);
      const label = document.createElement("span");
      label.textContent = item.name;
      marker.bindTooltip(label, {
        direction: "bottom",
        offset: [0, 3],
        className: tw("map-label"),
        permanent: selected === item.id,
      });
      marker.on("click", () => {
        handler.current?.(item);
      });
    }
    const userIcon = L.divIcon({
      html: `<span class="${tw("position-halo")}"><span></span></span>`,
      iconSize: [44, 44],
      iconAnchor: [22, 22],
      className: tw("position-host"),
    });
    L.marker(start, {
      icon: userIcon,
      title: "Punto de partida de demostración",
      keyboard: false,
    }).addTo(group);
  }, [items, selected, start, small]);
  useEffect(() => {
    const m = map.current;
    const g = path.current;
    if (!m || !g) return;
    g.clearLayers();
    if (route?.length) {
      L.polyline(route, { color: "#fff", weight: 10, lineCap: "round" }).addTo(
        g,
      );
      L.polyline(route, {
        color: "#3388ee",
        weight: 5,
        lineCap: "round",
        dashArray: "1 9",
      }).addTo(g);
      m.fitBounds(L.latLngBounds(route), { padding: [65, 70], maxZoom: 17 });
    }
  }, [route, small]);
  useEffect(() => {
    const item = items.find((i) => i.id === selected);
    if (item && !route?.length) map.current?.panTo(item.coords);
  }, [selected, items, route]);
  return (
    <div
      className={tw(
        `campus-map ${small ? "small" : ""} ${picking ? "picking" : ""}`,
      )}
    >
      <div
        className={tw("map-canvas")}
        ref={el}
        role="region"
        aria-label={
          picking
            ? "Mapa: selecciona un punto dentro del campus"
            : "Mapa interactivo del campus UCI"
        }
      />
      {!small ? (
        <>
          <div className={tw("campus-pill")}>
            <span className={tw("status-dot")} />
            <b>Campus UCI</b>
            <span>La Habana, Cuba</span>
          </div>
          <div className={tw("map-north")} aria-label="Norte">
            <span>N</span>
            <Compass size={25} strokeWidth={1.4} />
          </div>
        </>
      ) : null}
      <div className={tw("map-controls")}>
        <div className={tw("layer-control")}>
          <button
            type="button"
            className={tw(`map-button ${layersOpen ? "active" : ""}`)}
            onClick={() => setLayersOpen((v) => !v)}
            aria-label="Cambiar capa del mapa"
            aria-expanded={layersOpen}
          >
            <Layers size={20} />
          </button>
          {layersOpen ? (
            <div className={tw("layer-menu")}>
              <strong>Vista del mapa</strong>
              <button
                type="button"
                className={tw(layer === "real" ? "active" : "")}
                onClick={() => {
                  setLayer("real");
                  setLayersOpen(false);
                }}
              >
                OpenStreetMap <span>Cartografía real</span>
              </button>
              <button
                type="button"
                className={tw(layer === "schema" ? "active" : "")}
                onClick={() => {
                  setLayer("schema");
                  setLayersOpen(false);
                }}
              >
                Campus ilustrado <span>Esquema de demostración</span>
              </button>
            </div>
          ) : null}
        </div>
        <button
          type="button"
          className={tw("map-button")}
          aria-label="Centrar en punto de partida"
          onClick={() => map.current?.setView(start, 17)}
        >
          <LocateFixed size={20} />
        </button>
        <div className={tw("zoom-buttons")}>
          <button
            type="button"
            className={tw("map-button")}
            aria-label="Acercar mapa"
            onClick={() => map.current?.zoomIn()}
          >
            <Plus size={20} />
          </button>
          <button
            type="button"
            className={tw("map-button")}
            aria-label="Alejar mapa"
            onClick={() => map.current?.zoomOut()}
          >
            <Minus size={20} />
          </button>
        </div>
      </div>
      {picking ? (
        <div className={tw("map-pick-hint")}>
          <MapPin size={15} />
          Toca el mapa para elegir el punto
        </div>
      ) : null}
      <div className={tw("map-attribution")}>
        {layer === "real" ? (
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noreferrer"
          >
            © OpenStreetMap
          </a>
        ) : (
          <span>Esquema ilustrativo · posiciones aproximadas</span>
        )}
      </div>
    </div>
  );
}
