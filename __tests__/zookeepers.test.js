const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers");

jest.mock('fs');

test("creates an animal object", () => {
    const zookeeper = createNewZookeeper(
        { name: "Darlene", id: "jhgdja3ng2" },
        zookeepers
    );
    
    expect(zookeeper.name).toBe("Darlene");
    expect(zookeeper.id).toBe("jhgdja3ng2");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "James",
            age: 30,
            favoriteAnimal: "penguin"
        },
        {
            id: "3",
            name:"Elijah",
            age: 25,
            favoriteAnimal: "bear"
        }
    ];

    const updatedZookeepers = filterByQuery({ age: 30 }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "James",
            age: 30,
            favoriteAnimal: "penguin"
        },
        {
            id: "3",
            name:"Elijah",
            age: 25,
            favoriteAnimal: "bear"
        }
    ];

    const result = findById("3", startingZookeepers);

    expect(result.name).toBe("Elijah");
});

test("validates age", () => {
    const zookeeper = {
        id: "2",
        name: "James",
        age: 30,
        favoriteAnimal: "penguin"
    };

    const invalidZookeeper = {
        id: "3",
        name:"Elijah",
        age: "25",
        favoriteAnimal: "bear"
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
})