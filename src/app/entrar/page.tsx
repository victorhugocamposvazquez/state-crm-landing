import type { Metadata } from "next";
import { Entrar } from "@/components/shell/Entrar";

export const metadata: Metadata = {
  title: "Entrar — statecrm",
  description: "Entra en tu agencia o crea la cuenta. Captación, Catastro, equipo y obra.",
};

export default function Page() {
  return <Entrar />;
}
