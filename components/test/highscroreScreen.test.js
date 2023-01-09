function countElements(lst) {
  const count = {};
  for (const element of lst) {
    if (element in count) {
      count[element]++;
    } else {
      count[element] = 1;
    }
  }
  return count;
}

function getTopList(counts) {
  const sorted = [];
  const items = Object.entries(counts).sort((a, b) => {
    if (b[1] === a[1]) {
      return a[0].localeCompare(b[0]);
    }
    return b[1] - a[1];
  });
  for (const [key] of items) {
    sorted.push(key);
  }
  return sorted.slice(0, 10);
}

test("countElements returns correct count for list with no duplicates", () => {
  const lst = ["a", "b", "c"];
  const result = countElements(lst);

  expect(result).toEqual({ a: 1, b: 1, c: 1 });
});

test("countElements returns correct count for list with some duplicates", () => {
  const lst = ["a", "b", "c", "b", "c", "c"];
  const result = countElements(lst);

  expect(result).toEqual({ a: 1, b: 2, c: 3 });
});

test("countElements returns correct count for empty list", () => {
  const lst = [];
  const result = countElements(lst);

  expect(result).toEqual({});
});

test("counts elements correctly", () => {
  const input = [1, 2, 2, 3, 3, 3];
  const expectedOutput = { 1: 1, 2: 2, 3: 3 };
  expect(countElements(input)).toEqual(expectedOutput);
});

test("gets top list correctly", () => {
  const input = { 1: 3, 2: 2, 3: 1 };
  const expectedOutput = ["1", "2", "3"];
  expect(getTopList(input)).toEqual(expectedOutput);
});

test("getTopList returns top 10 elements in correct order", () => {
  const counts = { a: 3, b: 2, c: 5, d: 1, e: 4, g: 3, h: 2, i: 1, j: 3 };
  const result = getTopList(counts);

  expect(result).toEqual(["c", "e", "a", "g", "j", "b", "h", "d", "i"]);
});

test("getTopList returns fewer than 10 elements if there are not enough in input", () => {
  const counts = { a: 3, b: 2, c: 5 };
  const result = getTopList(counts);

  expect(result).toEqual(["c", "a", "b"]);
});

test("getTopList returns empty list if input is an empty object", () => {
  const counts = {};
  const result = getTopList(counts);

  expect(result).toEqual([]);
});
