let progress = [];

// MARK LESSON COMPLETE
exports.markComplete = (req, res) => {
  const { userId, lessonId } = req.body;

  progress.push({ userId, lessonId });

  res.json({ message: "Lesson marked complete" });
};

// GET USER PROGRESS
exports.getProgress = (req, res) => {
  const { userId } = req.params;

  const userProgress = progress.filter(p => p.userId == userId);

  res.json(userProgress);
};