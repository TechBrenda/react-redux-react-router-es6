import { createStore } from 'redux';
import rootReducer from './reducers';
import initialState from './reducers/initialState';
import * as courseActions from './actions/courseActions';

it('Should handle creating courses', () => {
  // arrange
  const store = createStore(rootReducer, initialState);
  const course = { title: 'Clean Code' };

  // act
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);

  // assert
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});

it('Should handle creating multiple courses', () => {
  // arrange
  const store = createStore(rootReducer, initialState);
  const course = {
    id: 1,
    title: 'Clean Code',
  };
  const course2 = {
    id: 2,
    title: 'More Clean Code',
  };

  // act
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);
  const action2 = courseActions.createCourseSuccess(course2);
  store.dispatch(action2);

  // assert
  const courseCount = store.getState().courses.length;
  expect(courseCount).toEqual(2);
});

it('Should handle creating and updating courses', () => {
  // arrange
  const store = createStore(rootReducer, initialState);
  const course = {
    id: 1,
    title: 'Clean Code',
  };
  const updatingCourse = {
    id: 2,
    title: 'More Clean Code',
  };
  const updatedCourse = {
    id: 2,
    title: 'Cleaner Code',
  };

  // act
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);
  const action2 = courseActions.createCourseSuccess(updatingCourse);
  store.dispatch(action2);
  const action3 = courseActions.updateCourseSuccess(updatedCourse);
  store.dispatch(action3);

  // assert
  const createdCourses = store.getState().courses;
  expect(createdCourses).toContainEqual(course);
  expect(createdCourses).toContainEqual(updatedCourse);
});
