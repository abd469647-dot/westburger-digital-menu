import { RESTAURANT_WHATSAPP_NUMBER } from "@/config/restaurant";
import type { CartLine } from "@/lib/cart";
import { formatDA } from "@/lib/menu-options";

export type OrderDetails = {
  name: string;
  phone: string;
  type: "emporter" | "livraison";
  address?: string;
  notes?: string;
};

export const lineLabel = (line: CartLine) =>
  line.optionLabel ? `${line.name} (${line.optionLabel})` : line.name;

export function buildOrderMessage(lines: CartLine[], details: OrderDetails, total: number) {
  const items = lines
    .map((line) => `• ${lineLabel(line)} ×${line.qty} — ${formatDA(line.qty * line.price)}`)
    .join("\n");

  const parts = [
    "🍽️ NOUVELLE COMMANDE",
    "",
    `👤 Client: ${details.name}`,
    `📞 Téléphone: ${details.phone}`,
    "",
    "📦 Commande:",
    items,
    "",
    `💰 TOTAL: ${formatDA(total)}`,
    "",
    `🛍️ Type: ${details.type === "livraison" ? "Livraison" : "À emporter"}`,
  ];

  if (details.type === "livraison" && details.address?.trim()) {
    parts.push(`📍 Adresse: ${details.address.trim()}`);
  }
  if (details.notes?.trim()) {
    parts.push("", `📝 Note: ${details.notes.trim()}`);
  }

  return parts.join("\n");
}

export const buildWhatsAppUrl = (message: string) =>
  `https://wa.me/${RESTAURANT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
