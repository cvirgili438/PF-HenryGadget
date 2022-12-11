
// CONSTANTES
import {
  inicialtate,
  URL,
  CREATE_PRODUCT,
  GET_PRODUCTS_NAMES,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_QUERY,
  GET_PRODUCT_BY_ID,
  GET_TYPES,
  DELETE_PRODUCT,
  EDIT_PRODUCT,
  SET_PAGE_VIEW,
  SET_USER_LOGIN_THIRDPARTIES,
  SET_LOCAL_CART,
  GET_USER_CART,
} from '../Constants/index.js';


export default function rootReducer(state = inicialtate, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload.result,
        totalProducts: action.payload.total === 0 ? 1 : action.payload.total,
        lastMsg: action.payload.msg,
      };
    case GET_PRODUCTS_NAMES:
      return {
        ...state,
        productsNames: action.payload.map(e => e.name),
      };
    case GET_PRODUCTS_BY_QUERY:
      if (action.filter === false) {
        let products = action.payload.result;
        let filtered = products.slice(0, 9);
        return {
          ...state,
          products: products,
          filteredProducts: filtered,
          totalProducts: action.payload.total === 0 ? 1 : action.payload.total,
          lastMsg: action.payload.msg,
        };
      } else
        return {
          ...state,
          filteredProducts: action.payload.result,
          totalProducts: action.payload.total === 0 ? 1 : action.payload.total,
          lastMsg: action.payload.msg,
        };
    case GET_PRODUCT_BY_ID:
      return {
        ...state,
        productDetail: action.payload,
      };
    case GET_TYPES:
      let types = {};
      types.type = action.payload.type.map(el => {
        return el.name;
      });
      types.brand = action.payload.brand.map(el => {
        return el.name;
      });
      types.storage = action.payload.storage.map(el => {
        return el.size;
      });
      types.ram = action.payload.ram.map(el => {
        return el.size;
      });
      return {
        ...state,
        filters: types,
      };
    case CREATE_PRODUCT:
      return {
        ...state,
      };
    case EDIT_PRODUCT:
      return {
        ...state,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        // products: state.products.slice()
      };
    case SET_PAGE_VIEW:
      return {
        ...state,
        page: Number(action.payload),
      };
    case SET_USER_LOGIN_THIRDPARTIES:
      return{
        ...state,
        user: action.payload
      }
      case SET_LOCAL_CART:
        return{
          ...state,
          localCart:action.payload
        }
      case GET_USER_CART:
        return {
          ...state,
          userCart:action.payload
        }
    default:
      return { ...state };
  }
}

