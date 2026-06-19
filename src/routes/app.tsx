import { createFileRoute } from "@tanstack/react-router";
import { MockupScreen } from "@/screens/MockupScreen";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "WARPIN App MVP - Simulador Móvil" },
      { name: "description", content: "Simulador interactivo en tiempo real de la aplicación móvil WARPIN para universitarios." },
    ],
  }),
  component: AppRouteComponent,
});

function AppRouteComponent() {
  return <MockupScreen />;
}
