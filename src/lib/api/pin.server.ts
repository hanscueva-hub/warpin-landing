import process from "node:process";

// Server-only: el sufijo .server.ts impide que Vite lo incluya en el bundle
// del cliente, así que la clave nunca llega al navegador.
//
// La frontera de datos real NO está aquí: está en la función `get_public_pin`
// de Supabase, que devuelve exactamente tres columnas. Aunque esta respuesta
// se filtrara entera, no hay autor, ni coordenadas, ni imágenes que filtrar.

const SUPABASE_URL = "https://mwizaquouhqkrznhwvia.supabase.co";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export type PublicPin = {
  title: string;
  description: string;
  expiresAt: string;
};

/**
 * Devuelve el pin público, o `null` si no existe, ya expiró o el id no es
 * válido. Los tres casos se responden igual a propósito: si se distinguieran,
 * cualquiera podría sondear qué identificadores existen comparando respuestas.
 */
export async function fetchPublicPin(pinId: string): Promise<PublicPin | null> {
  if (!UUID_RE.test(pinId)) return null;

  // Leer dentro de la función, no en el ámbito del módulo: en algunos
  // entornos las variables se enlazan por petición.
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!anonKey) {
    console.error("Falta SUPABASE_ANON_KEY en las variables de entorno");
    return null;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_public_pin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      body: JSON.stringify({ p_pin_id: pinId }),
    });

    if (!res.ok) {
      console.error("get_public_pin respondió", res.status);
      return null;
    }

    const rows = (await res.json()) as Array<{
      title: string | null;
      description: string | null;
      expires_at: string;
    }>;

    if (!Array.isArray(rows) || rows.length === 0) return null;

    const row = rows[0];
    return {
      title: row.title ?? "",
      description: row.description ?? "",
      expiresAt: row.expires_at,
    };
  } catch (error) {
    console.error("get_public_pin falló", error);
    return null;
  }
}
