import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

/* Action Creators */

export const loadCoursesSuccess = (courses) => {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
};

export const createCourseSuccess = (course) => {
  return { type: types.CREATE_COURSE_SUCCESS, course };
};

export const updateCourseSuccess = (course) => {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
};

/* Thunks */

export const loadCourses = () => {
  return (dispatch) => {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((courses) => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
};

export const saveCourse = (course) => {
  //eslint-disable-next-line no-unused-vars
  return (dispatch, getState) => {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((error) => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
};
