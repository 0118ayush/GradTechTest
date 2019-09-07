function createMenuData(data) {

  const splitData = data.map(element => element.split("/"))

  const filteredSplitData = splitData.filter(element => element[1])

  let objectsArray = filteredSplitData.map(element => {
    let secondElArr = element[1].split("c")
    if (element[0] === secondElArr[0]) {
      return {
        title: element[0],
        data: [element[1]]
      }
    }
  })

  let output = [];

  objectsArray.forEach((item) => {
    var existing = output.filter((v) => {
      return v.title == item.title;
    });
    if (existing.length) {
      var existingIndex = output.indexOf(existing[0]);
      output[existingIndex].data = output[existingIndex].data.concat(item.data);
    } else {
      if (typeof item.data == 'string')
        item.data = [item.data];
      output.push(item);
    }
  });

  return output
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