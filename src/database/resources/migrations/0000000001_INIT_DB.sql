CREATE TABLE "timetables" (
  "id" uuid PRIMARY KEY,
  "meeting_date" timestamp,
  "place" varchar(400),
  "additional_info" varchar(400),
  "teacher_login" varchar(40),
  "student_login" varchar(40)
);
