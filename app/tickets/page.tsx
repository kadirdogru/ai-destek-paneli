/**
 * PRD §4 — Ticket listesi sayfası
 * İnteraktif filtreleme client component'a devredilir.
 */
import TicketListClient from "@/components/tickets/TicketListClient";
import { tumTicketlariGetir } from "@/lib/data";

export const dynamic = "force-dynamic";

export default function TicketsPage() {
  const tickets = tumTicketlariGetir();
  return <TicketListClient baslangicTicketlar={tickets} />;
}
