import { LOGIN, LOGOUT, UPDATE_USER, CURRENT_USER } from "../actionTypes";

const initialState = {
  token: null,
  _id: null,
  name: null,
  lastName: null,
  birthdate: null,
  mail: null,
  role: null,
  createdAt: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      const { token, role } = action.payload;
      return {
        ...state,
        token,
        role,
      };
    }
    case LOGOUT: {
      return initialState;
    }
    case CURRENT_USER: {
      const {
        token,
        _id,
        name,
        lastName,
        birthdate,
        products,
        mail,
        role,
        createdAt,
      } = action.payload;
      return {
        token: token,
        _id: _id,
        name: name,
        lastName: lastName,
        birthdate: birthdate,
        mail: mail,
        role: role,
        products: products,
        createdAt: createdAt,
      };
    }
    case UPDATE_USER: {
      //const { name, lastName, birthdate, mail, zone, cellphone, role, available, workingStatus, experience, vehiculo, licencia, carnetCirculacion, seguroVehiculo, placaVehiculo, rating, comments, createdAt } = action.payload;
      const params = action.payload;
      return {
        ...state,
        ...params,
      };
    }

    default:
      return state;
  }
}
