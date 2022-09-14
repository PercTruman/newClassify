### Overview
A school logistics app where a user(principal or other adminstrator) can organize their assignments.
Assignments can be grouped by category, like test, participation, performance, attendance.
Full CRUD for assignments. Students can add comments/questions to grades, to gain helpful feedback for their next assignment.
Teachers can also edit or delete their assignments.

### Features

User signin/signup
Navigation
Assignment List (title and short description)
Assignment Detail (shows comments here)
Assignment filter (by category)
Assignment create
Assignment edit
Assignment delete
<!-- comment create
Comment list
comment edit*
comment delete -->

### MVP
User signin/signup
Navigation
Assignment List
Assignment Detail (shows comments here)
Assignment filter (by category)
Assignment create
Assignment edit
Assignment delete
<!-- Comment create
Comment list -->



### Stretch Goals
Create chair test rankings
<!-- Comment edit
Comment delete -->


### Models
Teacher
___
has many assignments
has many students,through assignments


email
password_digest
first name
last name


Assignment
___
belongs to a student
belongs to a teacher


title
description
category (participation, test, daily)
grade
due date
assigned date
teacher_id
student_id


Student
has many comments
has many assignments
has many teachers, through assignments


first name
last name

<!-- Comments
______

belongs to a student
belongs to a assignment -->
