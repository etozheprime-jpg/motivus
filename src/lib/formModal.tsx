import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Ctx = { open: boolean; openForm: () => void; closeForm: () => void };

const FormModalContext = createContext<Ctx | null>(null);

export function FormModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openForm = useCallback(() => setOpen(true), []);
  const closeForm = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ open, openForm, closeForm }), [open, openForm, closeForm]);
  return <FormModalContext.Provider value={value}>{children}</FormModalContext.Provider>;
}

export function useFormModal() {
  const ctx = useContext(FormModalContext);
  if (!ctx) throw new Error("useFormModal turi būti naudojamas FormModalProvider viduje");
  return ctx;
}
