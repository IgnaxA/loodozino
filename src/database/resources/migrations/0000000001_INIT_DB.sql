CREATE TABLE "timetables" (
  "id" uuid PRIMARY KEY,
  "date" varchar(10),
  "time" varchar(10),
  "place" varchar(400),
  "additional_info" varchar(400),
  "teacher_login" varchar(40),
  "student_login" varchar(40)
);
