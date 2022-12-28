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
  CLEAR_PRODUCT,
  SET_PAGE_VIEW,
  SET_USER_LOGIN,
  SET_LOADING,
  SET_LOCAL_ADRESS,
  SET_USER_ADDRESS,
  GET_USERS,
  GET_REVIEWS,
  CHANGE_REVIEW_VISIBLE,
  CHANGE_REVIEW_ARCHIVE,
  SET_LOCAL_CART,
  SET_USER_CART,
  GET_USER_CART,
  CLEAR_CARTS,
  REFRESH_CARTS,
  SET_ORDER,
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
    case CLEAR_PRODUCT:
      return {
        ...state,
        productDetail: {}
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
    case SET_USER_LOGIN :
      return{
        ...state,
        user: action.payload
      }
    case SET_LOADING:
      return{
        ...state,
        loading:!state.loading
      }
    case SET_LOCAL_ADRESS:
      return {
        ...state,
        adress: action.payload
      }
    case SET_USER_ADDRESS:
      return {
        ...state,
        adress:action.payload
      }
      case SET_LOCAL_CART:
        return{
          ...state,
          localCart:action.payload
        }
      case GET_USER_CART:
        return {
          ...state,
          userCart: action.payload.products.map(c => { return {idProduct: c.id, name: c.name, price: c.price, img: c.img[0], quantity: c.product_cart.quantity}}),
          localCart: action.payload.products.map(c => { return {idProduct: c.id, name: c.name, price: c.price, img: c.img[0], quantity: c.product_cart.quantity}})
        }
      case SET_USER_CART:
        return {
          ...state,
          userCart : action.payload,
          localCart: action.payload      
        }
        case CLEAR_CARTS:
          return {
            ...state,
            localCart: [],
            userCart: []
          };
        case REFRESH_CARTS:
          return {
            ...state,
            localCart: state.localCart.map(c => c),
            userCart: state.userCart.map(c => c)
          }
          case GET_USERS:
            return {
              ...state,
              users: action.payload
            }
          case GET_REVIEWS:
            return {
              ...state,
              reviews: action.payload
            }
          case CHANGE_REVIEW_VISIBLE:
            return {
              ...state,
              reviews: action.payload.result,
              lastMsg: action.payload.msg
            }
          case CHANGE_REVIEW_ARCHIVE:
            return {
              ...state,
              reviews: action.payload.result,
              lastMsg: action.payload.msg
            }
          case SET_ORDER : 
          return{
            ...state,
            lastMsg: action.payload.msg,
            order: action.payload.result
          }
    default:
      return { ...state };
  }
}

