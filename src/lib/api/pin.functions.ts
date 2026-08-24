import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { fetchPublicPin } from "./pin.server";

// El cuerpo de .handler corre solo en el servidor, así que `pin.server.ts`
// —y con él la clave— se elimina del bundle del cliente.
export const getPublicPin = createServerFn({ method: "GET" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data }) => fetchPublicPin(data.id));
