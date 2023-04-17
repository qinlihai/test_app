package com.ebirdspace.controller;

import com.ebirdspace.model.Course;
import com.ebirdspace.payload.CourseRequest;
import com.ebirdspace.repository.CourseRepository;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/course")
public class CourseController {

  private CourseRepository courseRepository;

  public CourseController(@Autowired CourseRepository courseRepository) {
    this.courseRepository = courseRepository;
  }

  @PostMapping("/create")
  public ResponseEntity<?> createNewStudent(@Valid @RequestBody CourseRequest courseRequest) {

    Course course = new Course();
    course.setName(courseRequest.getName());

    courseRepository.save(course);

    return ResponseEntity.ok(course);
  }

  @GetMapping("/all")
  public ResponseEntity<?> getAllCourses() {
    return ResponseEntity.ok(courseRepository.findAll());
  }
}
