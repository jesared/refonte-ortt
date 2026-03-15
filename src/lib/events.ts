import { EventStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export interface UpcomingEventItem {
  id: string;
  title: string;
  location: string;
  startAt: Date;
}

export async function getUpcomingEvents(limit = 3): Promise<UpcomingEventItem[]> {
  try {
    const now = new Date();

    const events = await prisma.event.findMany({
      where: {
        status: EventStatus.PUBLISHED,
        startAt: {
          gte: now,
        },
      },
      orderBy: {
        startAt: "asc",
      },
      take: limit,
      select: {
        id: true,
        title: true,
        location: true,
        startAt: true,
      },
    });

    return events;
  } catch (error) {
    console.error("[events] Unable to fetch upcoming events", error);
    return [];
  }
}

export function formatEventDate(date: Date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "long",
  }).format(date);
}
