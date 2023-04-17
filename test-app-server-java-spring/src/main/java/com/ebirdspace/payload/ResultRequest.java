package com.ebirdspace.payload;

import com.ebirdspace.model.Score;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class ResultRequest {

  @NotNull
  private Long studentId;

  @NotNull
  private Long courseId;

  @NotNull
  private Score score;

  public Long getStudentId() {
    return studentId;
  }

  public void setStudentId(Long studentId) {
    this.studentId = studentId;
  }

  public Long getCourseId() {
    return courseId;
  }

  public void setCourseId(Long courseId) {
    this.courseId = courseId;
  }

  public Score getScore() {
    return score;
  }

  public void setScore(Score score) {
    this.score = score;
  }
}
