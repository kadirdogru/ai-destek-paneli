/**
 * PRD §1 — Ticket detay sayfası (Server Component → Client shell)
 */
import { notFound } from "next/navigation";
import { ticketGetir } from "@/lib/data";
import TicketDetailClient from "@/components/tickets/TicketDetailClient";

export const dynamic = "force-dynamic";

export default async function TicketDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ticket = ticketGetir(id);
  if (!ticket) notFound();

  return <TicketDetailClient baslangicTicket={ticket} />;
}
