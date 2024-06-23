CREATE TABLE IF NOT EXISTS "students" (
  "login" varchar(40) PRIMARY KEY,
  "full_name" varchar(100),
  "phone_number" varchar(20),
  "study_program_id" uuid,
  "degree_level_id" uuid,
  "course" integer,
  "admission_year" integer,
  "socials" varchar(400)
);

CREATE TABLE IF NOT EXISTS "teachers" (
  "login" varchar(40) PRIMARY KEY,
  "full_name" varchar(100),
  "phone_number" varchar(20),
  "position" varchar(100),
  "socials" varchar(400)
);

CREATE TABLE IF NOT EXISTS "meeting_places" (
  "id" uuid PRIMARY KEY,
  "description" varchar(400),
  "priority" bool,
  "teacher_login" varchar(40),
  "offline" bool
);

CREATE TABLE IF NOT EXISTS "study_programs" (
  "id" uuid PRIMARY KEY,
  "name" varchar(100)
);

CREATE TABLE IF NOT EXISTS "degree_levels" (
  "id" uuid PRIMARY KEY,
  "name" varchar(100)
);

ALTER TABLE "meeting_places" ADD FOREIGN KEY ("teacher_login") REFERENCES "teachers" ("login") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "students" ADD FOREIGN KEY ("study_program_id") REFERENCES "study_programs" ("id") ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE "students" ADD FOREIGN KEY ("degree_level_id") REFERENCES "degree_levels" ("id") ON UPDATE CASCADE ON DELETE CASCADE;
