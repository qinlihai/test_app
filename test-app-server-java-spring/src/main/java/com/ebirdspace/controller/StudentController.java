package com.ebirdspace.controller;

import com.ebirdspace.model.Student;
import com.ebirdspace.payload.StudentRequest;
import com.ebirdspace.repository.StudentRepository;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/student")
public class StudentController {

  private StudentRepository studentRepository;

  public StudentController(@Autowired StudentRepository studentRepository) {
    this.studentRepository = studentRepository;
  }

  @PostMapping("/create")
  public ResponseEntity<?> createNewStudent(@Valid @RequestBody StudentRequest studentRequest) {

    Student student = new Student();
    student.setDob(studentRequest.getDob());
    student.setFirstName(studentRequest.getFirstName());
    student.setFamilyName(studentRequest.getFamilyName());

    studentRepository.save(student);

    return ResponseEntity.ok(student);

  }

  @GetMapping("/all")
  public ResponseEntity<?> getAllStudents() {
    return ResponseEntity.ok(studentRepository.findAll());
  }

}
