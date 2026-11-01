import { tw } from "./styles";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { seed } from "./model";
import type { Data, User } from "./model";

const KEY = "geouci-demo-v1";
function readData(): Data {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const d = JSON.parse(raw);
      if (
        Array.isArray(d.places) &&
        Array.isArray(d.users) &&
        Array.isArray(d.events) &&
        Array.isArray(d.categories) &&
        Array.isArray(d.comments) &&
        Array.isArray(d.reports) &&
        Array.isArray(d.requests)
      )
        return d;
    }
  } catch {
    /* Browser storage can be unavailable. */
  }
  return structuredClone(seed);
}
type Store = {
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
  user: User | undefined;
  login: (id: string | null) => void;
  toast: (message: string, kind?: "success" | "error") => void;
  reset: () => void;
};
const Context = createContext<Store | null>(null);
export function Provider({ children }: { children: ReactNode }) {
  const [data, setData] = useState(readData);
  const [userId, setUserId] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem("geouci-user") || "alain";
    } catch {
      return "alain";
    }
  });
  const [message, setMessage] = useState("");
  const [toastKind, setToastKind] = useState<"success" | "error">("success");
  const toastRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      /* State remains available in memory. */
    }
  }, [data]);
  useEffect(() => {
    if (!message) return;
    toastRef.current?.showPopover?.();
    const t = setTimeout(() => setMessage(""), 4500);
    return () => clearTimeout(t);
  }, [message]);
  const selected = data.users.find((u) => u.id === userId);
  const user = selected?.blocked ? undefined : selected;
  function login(id: string | null) {
    setUserId(id);
    try {
      sessionStorage.setItem("geouci-user", id ?? "guest");
    } catch {
      /* Memory fallback. */
    }
  }
  const toast = (m: string, kind: "success" | "error" = "success") => {
    setToastKind(kind);
    setMessage(m);
  };
  return (
    <Context.Provider
      value={{
        data,
        setData,
        user,
        login,
        toast,
        reset: () => {
          setData(structuredClone(seed));
          login("alain");
          toast("Los datos de demostración se han restablecido.");
        },
      }}
    >
      {children}
      {message ? (
        <div
          className={tw("toast")}
          popover="manual"
          ref={toastRef}
          role="status"
        >
          <span
            className={tw(
              `toast-check ${toastKind === "error" ? "toast-warning" : ""}`,
            )}
          >
            {toastKind === "error" ? "!" : "✓"}
          </span>
          <span>{message}</span>
          <button aria-label="Cerrar aviso" onClick={() => setMessage("")}>
            ×
          </button>
        </div>
      ) : null}
    </Context.Provider>
  );
}
export function useStore() {
  const context = useContext(Context);
  if (!context) throw new Error("Missing GeoUCI provider");
  return context;
}
