import { getLocation, saveTrip, deleteTrip } from "../client/js/apiController";

describe('Test, the function getLocation() exists', () => {
    test("should be true", () => {
        expect(getLocation).toBeDefined();
    })
});

describe('Test, the function saveTrip() exists', () => {
    test("should be true", () => {
        expect(saveTrip).toBeDefined();
    })
});

describe('Test, the function deleteTrip() exists', () => {
    test("should be true", () => {
        expect(deleteTrip).toBeDefined();
    })
});