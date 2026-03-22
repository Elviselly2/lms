let lessons = [];

// ADD LESSON
exports.addLesson = (req, res) => {
  const { courseId, title, content } = req.body;

  const lesson = {
    id: Date.now(),
    courseId,
    title,
    content,
  };

  lessons.push(lesson);

  res.json({ message: "Lesson added", lesson });
};

// GET LESSONS BY COURSE
exports.getLessons = (req, res) => {
  const { courseId } = req.params;

  const courseLessons = lessons.filter(
    (l) => l.courseId == courseId
  );

  res.json(courseLessons);
};