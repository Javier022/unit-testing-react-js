export default {
  get: jest.fn().mockImplementation(() =>
    Promise.resolve({
      data: {
        photos: {
          photo: [],
        },
      },
    })
  ),
  // devolvera un valor personalizado de manera correcta
  post: jest.fn().mockImplementation(() => Promise.reject("")),
  // devolvera un valor personalizado de manera erronea
  put: jest.fn().mockImplementation(() => Promise.reject("")),
};
