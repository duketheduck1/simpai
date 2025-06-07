import { varchar, integer, text, uuid, pgTable as table, timestamp, boolean} from "drizzle-orm/pg-core";

export const contents = table(
  "contents",
  {
    id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
    input: text("input").notNull(),
    title: text("title").notNull(),
    content: text("content").notNull(),
    duration: integer("duration").notNull().default(0),
    date: timestamp("date").notNull().defaultNow(),
    isOk: boolean("isOk").default(false),
    type: varchar("type", { length: 20 }).default("CHAT"),
    author: varchar("author", { length: 255 }).notNull(),
    idClerk: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("createdAt", {withTimezone: true}).defaultNow(), 
  }
);


