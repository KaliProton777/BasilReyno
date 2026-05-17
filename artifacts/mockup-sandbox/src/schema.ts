import {
  pgTable,
  serial,
  text,
  date,
  time,
  timestamp,
} from "drizzle-orm/pg-core";

export const expoAppointments = pgTable("expo_appointments", {
  id: serial("id").primaryKey(),

  full_name: text("full_name").notNull(),
  company: text("company"),

  email: text("email").notNull(),
  phone: text("phone"),

  preferred_date: date("preferred_date").notNull(),

  preferred_time: time("preferred_time").notNull(),

  message: text("message"),

  // IMPORTANT
  recaptcha_token: text("recaptcha_token"),

  status: text("status").default("pending"),

  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});