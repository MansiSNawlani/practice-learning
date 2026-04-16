import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "../schemaHelpers";
import { JobInfoTable } from "./jobInfo";
import { relations } from "drizzle-orm/relations";

export const InterviewTable = pgTable('interviews', {
    id,
    jobInfoId: uuid().references(() => JobInfoTable.id, { onDelete: "cascade" }).notNull(),
    duration: varchar().notNull(), // Store duration as a string (e.g., "30 minutes", "1 hour")
    humeChatId : varchar(), // Store the Hume chat ID for this interview
    feedback: varchar(), // Optional feedback from the interviewer
    createdAt,
    updatedAt
})


export const interviewRelations = relations(InterviewTable, ({ one }) => ({
    jobInfo: one(JobInfoTable, {
        fields: [InterviewTable.jobInfoId],
        references: [JobInfoTable.id],
    }),
}))