import { eq } from "drizzle-orm";
import { db } from "../config/database";
import { notificationsTable } from "../models";

export async function getUserNotifications(userId: number) {
  const notifications = await db
    .select()
    .from(notificationsTable)
    .where(eq(notificationsTable.userId, userId))
    .orderBy(notificationsTable.createdAt);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return {
    notifications: notifications.reverse().map((n) => ({
      id: n.id,
      title: n.title,
      description: n.description,
      type: n.type,
      isRead: n.isRead,
      createdAt: n.createdAt?.toISOString(),
    })),
    unreadCount,
  };
}
