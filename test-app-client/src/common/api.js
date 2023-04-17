import {API_BASE_URL} from "./constants";

const request = (options) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  })

  // if(localStorage.getItem(ACCESS_TOKEN)) {
  //   headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
  // }

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
  .then(response =>
      response.json().then(json => {
        if(!response.ok) {
          return Promise.reject(json);
        }
        return json;
      })
  );
};

export function newStudent(studentRequest) {
  return request({
    url: API_BASE_URL + "/student/create",
    method: 'POST',
    body: JSON.stringify(studentRequest)
  });
}

export function allStudents() {
  return request({
    url: API_BASE_URL + "/student/all",
    method: 'GET'
  });
}

export function allCourses() {
  return request({
    url: API_BASE_URL + "/course/all",
    method: 'GET'
  });
}

export function newCourse(courseRequest) {
  return request({
    url: API_BASE_URL + "/course/create",
    method: 'POST',
    body: JSON.stringify(courseRequest)
  });
}

export function newResult(resultRequest) {
  return request({
    url: API_BASE_URL + "/result/create",
    method: 'POST',
    body: JSON.stringify(resultRequest)
  });
}

export function allResults() {
  return request({
    url: API_BASE_URL + "/result/all",
    method: 'GET'
  });
}


