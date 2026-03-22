let courses = [];

// CREATE COURSE
exports.createCourse = (req, res) => {
  const { title, description, category } = req.body;

  const course = {
    id: Date.now(),
    title,
    description,
    category,
  };

  courses.push(course);

  res.json({ message: "Course created", course });
};

// GET COURSES
exports.getCourses = (req, res) => {
  res.json(courses);
};