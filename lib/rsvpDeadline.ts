export const rsvpClosedCode = "RSVP_CLOSED";

export const rsvpClosedMessage =
  "As confirmações pelo site foram encerradas em 01/09/2026 para que possamos organizar todos os detalhes com carinho.\nSe precisar falar sobre sua presença, entre em contato diretamente com nossa assessoria.";

export const rsvpAdvisor = {
  name: "Ilhabela Vip - Isabel Costa",
  whatsapp: "+55 12 99155-2826",
  whatsappUrl:
    "https://wa.me/5512991552826?text=Ol%C3%A1!%20Estou%20entrando%20em%20contato%20sobre%20a%20confirma%C3%A7%C3%A3o%20de%20presen%C3%A7a%20no%20casamento%20da%20J%C3%B4%20e%20do%20Web.",
  email: "contato@ilhabelavip.com.br",
};

export function getRsvpDeadline() {
  return new Date(process.env.RSVP_DEADLINE ?? "2026-09-02T00:00:00-03:00");
}

export function isRsvpClosed(now = new Date()) {
  const deadline = getRsvpDeadline();

  if (Number.isNaN(deadline.getTime())) {
    return false;
  }

  return now.getTime() >= deadline.getTime();
}
