import { createFileRoute } from "@tanstack/react-router";
import { MockupScreen } from "@/screens/MockupScreen";

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Simulador interactivo de la app | WARPIN" },
      { name: "description", content: "Prueba cómo funciona WARPIN antes del lanzamiento: publica un PIN en el mapa y explora la app desde tu navegador." },
      { property: "og:title", content: "Simulador interactivo de la app | WARPIN" },
      { property: "og:description", content: "Prueba cómo funciona WARPIN antes del lanzamiento: publica un PIN en el mapa y explora la app desde tu navegador." },
      { property: "og:url", content: "https://www.warpin.app/app" },
    ],
    links: [{ rel: "canonical", href: "https://www.warpin.app/app" }],
  }),
  component: AppRouteComponent,
});

function AppRouteComponent() {
  return <MockupScreen />;
}
