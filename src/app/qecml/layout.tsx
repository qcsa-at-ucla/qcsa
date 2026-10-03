import type { ReactNode } from "react";
import QECMLNavigation from "./QECMLNavigation";

export default function QECMLLayout({ children }: { children: ReactNode }) {
  return <QECMLNavigation>{children}</QECMLNavigation>;
}
