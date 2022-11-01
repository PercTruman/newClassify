# Class-ify 
This is a full-stack application for an use by an educational institution to create faculty, students, and subjects within the school. The user of this app would be an administrator with access granted via Ruby's bcrypt authentication gem.  This has been built to demonstrate my skills acquired during phase 4 of The Flatiron School's Software Engineering Program.  More specifically, Class-ify uses a Rails API with a React frontend.

## Requirements
* node v16.15.0
* npm v8.5.5
* ruby 2.27.4p191
* rails 6.1.3.2


### Setup and installation
Fork and clone
Run npm install
Run rails s to start the backend
Run npm start --prefix client

#### How to use
You must create a new user  by using the sign-in feature.  Once signed in you can:

1. Enter students' names for your campus using the Navigation bar's "Students" link.
2. Enter faculty names for your campus using the Navigation bar's "Teachers" link.
3. Using the Navigation Bars "Subjects" link, you can create subjects for the school, including class name, time, location, and teacher of the class.
    a. Subject's name, time, and location can also be edited.
    b. Subject may also be deleted.
4. You will, due to confidentiality, only have access to your campus' data.


##### Future goals
1.  The ability to populate classes with students will be added, with a limit placed on the number of students that can be created.


###Licensing


Copyright (2022) Shawn Hart

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.