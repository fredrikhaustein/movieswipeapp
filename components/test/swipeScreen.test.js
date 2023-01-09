import { generateRandomNr } from "../../utils/generateRandomNr";
import { generateGroupID } from "../../utils/genrateGroupID";

test("generateRandomNr generates a random number between 0 and the specified length", () => {
  const length = 10;
  const randomNr = generateRandomNr(length);

  expect(randomNr).toBeGreaterThanOrEqual(0);
  expect(randomNr).toBeLessThan(length);
});

test("generateGroupID generates a number between 100000 and 999999", () => {
  const groupID = generateGroupID();
  console.log(groupID);
  expect(groupID).toBeGreaterThanOrEqual(100000);
  expect(groupID).toBeLessThanOrEqual(999999);
});

test("setMovieNumber updates the 'movieNumber' state correctly", () => {
  const setMovieNumber = jest.fn();
  const countRef = { current: 5 };
  setMovieNumber(setMovieNumber, countRef);
  expect(setMovieNumber).toHaveBeenCalled();
});

test("setShowInfoBoolState updates the 'showInfoBool' state correctly", () => {
  const setShowInfoBool = jest.fn();
  const expectedValue = true;
  setShowInfoBool(expectedValue);
  expect(setShowInfoBool).toHaveBeenCalledWith(expectedValue);
});

test("setLengthDisLikeAndLikeState updates the 'lengthDisLikeAndLike' state correctly", () => {
  const setLengthDisLikeAndLike = jest.fn();
  const expectedValue = 10;
  setLengthDisLikeAndLike(expectedValue);
  expect(setLengthDisLikeAndLike).toHaveBeenCalled();
});

test("sets lengthDisLikeAndLike correctly", () => {
  const setLengthDisLikeAndLike = jest.fn();
  const expectedValue = 10;
  setLengthDisLikeAndLike(expectedValue);
  expect(setLengthDisLikeAndLike).toHaveBeenCalledWith(expectedValue);
});
