const fs = require("fs");
const notFound = -1;
const empty = 0;

module.exports = class PeopleService {
  constructor() {
    this.peoples = JSON.parse(
      fs.readFileSync(__dirname + "/people.json", "utf8")
    );
  }

  updatePeople(id, people) {
    const intId = parseInt(id, 10);
    const peopleIndexToUpdate = this.peoples.findIndex((p) => p.id === intId);

    if (peopleIndexToUpdate !== notFound) {
      this.peoples[peopleIndexToUpdate] = people;
      return this.peoples[peopleIndexToUpdate];
    }
  }

  getPeople(filters) {
    if (Object.keys(filters).length === empty) {
      return this.peoples;
    } else {
      const filterKey = Object.keys(filters)[0];
      const filterValue = Object.values(filters)[0];
      const filteredPeopleList = this.peoples.filter(
        (people) => people[filterKey] === filterValue
      );

      return filteredPeopleList;
    }
  }
};
