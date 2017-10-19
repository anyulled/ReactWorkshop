const mockGeolocation = {
    getCurrentPosition: jest.fn(() => {
        console.log("::: getCurrentPosition called :::");
        return {
            coords: {
                latitude: 41.486201,
                longitude: 2.0378555
            }
        };
    })
};

global.navigator.geolocation = mockGeolocation;