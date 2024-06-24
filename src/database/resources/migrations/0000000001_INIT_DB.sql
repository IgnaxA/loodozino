CREATE TABLE "appointments" (
  "id" uuid PRIMARY KEY,
  "meeting_date" datetime,
  "place" varchar(400),
  "additional_info" varchar(400),
  "teacher_login" varchar(40),
  "student_login" varchar(40)
);

CREATE TABLE "requests" (
  "id" uuid PRIMARY KEY,
  "creation_time" datetime,
  "appointment_id" uuid,
  "student_login" varchar(40),
  "status" varchar(40)
);

ALTER TABLE "appointments" ADD FOREIGN KEY ("id") REFERENCES "requests" ("appointment_id") ON UPDATE CASCADE ON DELETE CASCADE;
