"use server";

import { revalidatePath } from "next/cache";

export interface GuestbookEntry {
  id: string;
  name: string;
  attendance: string;
  message: string;
  createdAt: Date;
}

// Temporary in-memory storage (will be replaced with Prisma when DB is connected)
// Note: This is stored in server memory and will reset on each deployment
let mockEntries: GuestbookEntry[] = [
  {
    id: "1",
    name: "Tamu Pertama",
    attendance: "Hadir",
    message:
      "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Aamiin 🤲",
    createdAt: new Date("2026-01-20"),
  },
  {
    id: "2",
    name: "Keluarga Besar",
    attendance: "Hadir",
    message:
      "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fi khair. Selamat berbahagia! 💕",
    createdAt: new Date("2026-01-21"),
  },
];

export async function submitGuestbook(
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const name = formData.get("name") as string;
    const attendance = formData.get("attendance") as string;
    const message = formData.get("message") as string;

    if (!name || !attendance || !message) {
      return { success: false, error: "Semua field harus diisi" };
    }

    if (name.length < 2) {
      return { success: false, error: "Nama minimal 2 karakter" };
    }

    if (message.length < 5) {
      return { success: false, error: "Pesan minimal 5 karakter" };
    }

    // Check if DATABASE_URL is configured
    if (process.env.DATABASE_URL) {
      // Use Prisma when database is available
      try {
        const { prisma } = await import("@/lib/prisma");
        await prisma.guestbook.create({
          data: {
            name: name.trim(),
            attendance,
            message: message.trim(),
          },
        });
      } catch (dbError) {
        console.error("Database error, using mock storage:", dbError);
        // Fall back to mock storage
        mockEntries.unshift({
          id: Date.now().toString(),
          name: name.trim(),
          attendance,
          message: message.trim(),
          createdAt: new Date(),
        });
      }
    } else {
      // Use mock storage when no database
      mockEntries.unshift({
        id: Date.now().toString(),
        name: name.trim(),
        attendance,
        message: message.trim(),
        createdAt: new Date(),
      });
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error submitting guestbook:", error);
    return { success: false, error: "Gagal mengirim ucapan. Coba lagi nanti." };
  }
}

export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  try {
    // Check if DATABASE_URL is configured
    if (process.env.DATABASE_URL) {
      try {
        const { prisma } = await import("@/lib/prisma");
        const entries = await prisma.guestbook.findMany({
          orderBy: {
            createdAt: "desc",
          },
          take: 50,
        });
        return entries;
      } catch (dbError) {
        console.error("Database error, using mock data:", dbError);
        return mockEntries;
      }
    }

    // Return mock entries when no database
    return mockEntries;
  } catch (error) {
    console.error("Error fetching guestbook:", error);
    return mockEntries;
  }
}
