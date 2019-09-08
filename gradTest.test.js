function createMenuData(data) {

  // split pre and post "/" into elements of their array (e.g. "parent1/parent1child" => ["parent1", "parent1child"]).
  const splitData = data.map(element => element.split("/"))

  // remove the parents with no existing children.
  const filteredSplitData = splitData.filter(element => element[1])

  // convert array elements into object elements with relevant key-value pairs (e.g. [ 'parent1', 'parent1child' ] => { title: 'parent1', data: [ 'parent1child' ] })
  let objectsArray = filteredSplitData.map(element => {
    let secondElArr = element[1].split("c")
    if (element[0] === secondElArr[0]) {
      return {
        title: element[0],
        data: [element[1]]
      }
    }
  })

  // create final array pushing new titles and associated data directly inside, or merging new data into existing data of matching titles within final array. 
  // (e.g. 
  // [{ title: 'parent1', data: ['parent1child']}] => [{ title: 'parent1', data: ['parent1child', 'parent1child2']}]
  // OR 
  // [{ title: 'parent1', data: ['parent1child', 'parent1child2']}] => [{ title: 'parent1', data: ['parent1child', 'parent1child2'] }, { title: 'parent2', data: ['parent2child'] }] 
  // ) 

  let finalArray = [];

  objectsArray.forEach((rawEl) => {
    var existing = finalArray.filter((finalEl) => {
      return finalEl.title == rawEl.title;
    });
    if (existing.length > 0) {
      var existingIndex = finalArray.indexOf(existing[0]);
      finalArray[existingIndex].data = finalArray[existingIndex].data.concat(rawEl.data);
    } else {
      finalArray.push(rawEl);
    }
  });

  return finalArray
}

describe("menu Data Generator", () => {
  it("creates correct data structure ", () => {
    const data = [
      "parent1/parent1child",
      "parent1/parent1child2",
      "parent2/parent2child",
      "parent2/parent2child2",
      "parent1/parent1child3",
      "parent3",
      "parent3/parent3child1",
      "parent4"
    ];

    const expectedResult = [
      {
        title: "parent1",
        data: ["parent1child", "parent1child2", "parent1child3"]
      },
      { title: "parent2", data: ["parent2child", "parent2child2"] },
      { title: "parent3", data: ["parent3child1"] }
    ];

    const actualResult = createMenuData(data);
    expect(actualResult).toMatchObject(expectedResult);
  });
});