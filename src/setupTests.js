const mockGeolocation = {
    getCurrentPosition: jest.fn(() => ({
        coords: {
            latitude: 41.486201,
            longitude: 2.0378555,
        },
    })),
};
global.navigator = {};
global.navigator.geolocation = mockGeolocation;
