package com.ebirdspace.controller;

import com.ebirdspace.model.Result;
import com.ebirdspace.payload.ResultRequest;
import com.ebirdspace.repository.CourseRepository;
import com.ebirdspace.repository.ResultRepository;
import com.ebirdspace.repository.StudentRepository;
import javax.transaction.Transactional;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/result")
public class ResultController {

  private ResultRepository resultRepository;
  private StudentRepository studentRepository;
  private CourseRepository courseRepository;

  public ResultController(@Autowired ResultRepository resultRepository,
      @Autowired StudentRepository studentRepository,
      @Autowired CourseRepository courseRepository) {
    this.resultRepository = resultRepository;
    this.studentRepository = studentRepository;
    this.courseRepository = courseRepository;
  }

  @PostMapping("/create")
  @Transactional
  public ResponseEntity<?> createNewStudent(@Valid @RequestBody ResultRequest resultRequest) {
    Result result = new Result();
    result.setCourse(courseRepository.findById(resultRequest.getCourseId()).get());
    result.setStudent(studentRepository.findById(resultRequest.getStudentId()).get());
    result.setScore(resultRequest.getScore());
    resultRepository.save(result);

    return ResponseEntity.ok(result);
  }

  @GetMapping("/all")
  public ResponseEntity<?> getAllResults() {

    return ResponseEntity.ok(resultRepository.findAll());
  }

}
