CREATE TABLE IF NOT EXISTS "appointments" (
  "id" uuid PRIMARY KEY,
  "meeting_date" timestamp,
  "place" varchar(400),
  "additional_info" varchar(400),
  "teacher_login" varchar(40)
);

CREATE TABLE IF NOT EXISTS "requests" (
  "id" uuid PRIMARY KEY,
  "creation_time" timestamp,
  "appointment_id" uuid,
  "student_login" varchar(40),
  "status" varchar(40)
);

ALTER TABLE "requests" ADD FOREIGN KEY ("appointment_id") REFERENCES "appointments" ("id") ON UPDATE CASCADE ON DELETE CASCADE;
