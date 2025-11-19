import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

const ToastCtx = createContext({ push: () => {} });

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = useCallback(({ message, variant = "info", timeout = 2200 }) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, message, variant }]);
    window.setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, timeout);
  }, []);

  const value = useMemo(() => ({ push }), [push]);

  return (
    <ToastCtx.Provider value={value}>
      {children}
      <div className="toast-stack" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast--${t.variant}`}>{t.message}</div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  return useContext(ToastCtx);
}
