// CONSTANTES
import {
  inicialtate,
  CREATE_PRODUCT,
  GET_PRODUCTS_NAMES,
  GET_PRODUCTS,
  GET_PRODUCTS_BY_QUERY,
  GET_PRODUCT_BY_ID,
  GET_TYPES,
  GET_ALL_PRODUCTS,
  CHANGE_PRODUCT_ACTIVE,
  CHANGE_PRODUCT_ARCHIVE,
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
  ADD_REVIEW,
  CHANGE_USER_ACTIVE,
  CHANGE_USER_ADMIN,
  CHANGE_REVIEW_VISIBLE,
  CHANGE_REVIEW_ARCHIVE,
  REFRESH_CART,
  SET_ORDER,
  GET_ORDERS,
  GET_ADMIN_ORDERS,
  CHANGE_ORDER_ARCHIVE,
  CHANGE_ORDER_STATUS,
  DELETE_ORDER,
  GET_CAMPAIGNS,
  CHANGE_CAMPAIGN_ARCHIVE,
  PUBLISH_CAMPAIGN,
  CREATE_CAMPAIGN,
  UPDATE_CAMPAIGN,
  DELETE_CAMPAIGN,
  CHANGE_CAMPAIGN_RATING,
  GET_ADDRESSES,
  PUT_ADDRESSES,
  DELETE_ADDRESS,
  PUT_PROFILE_USER
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
        productDetail: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        productDetail: {},
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
    case CHANGE_PRODUCT_ACTIVE:
      return {
        ...state,
        products: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case CHANGE_PRODUCT_ARCHIVE:
      return {
        ...state,
        products: action.payload.result,
        lastMsg: action.payload.msg,
      };

    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload.result,
        lastMsg: action.payload.msg
      };

    case DELETE_PRODUCT:
      return {
        ...state,
        products: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case SET_PAGE_VIEW:
      return {
        ...state,
        page: Number(action.payload),
      };
    case SET_USER_LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,

        loading: !state.loading
      };

    case SET_LOCAL_ADRESS:
      return {
        ...state,
        adress: action.payload,
      };
    case SET_USER_ADDRESS:
      return {
        ...state,
        adress: action.payload
      }
    case REFRESH_CART:
      return {
        ...state,
        refreshCart: action.payload
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_REVIEWS:
      return {
        ...state,
        reviews: action.payload,
      };
    case ADD_REVIEW:
      return{
        ...state,
        lastMsg: action.payload.msg
      }
    case CHANGE_REVIEW_VISIBLE:
      return {
        ...state,
        reviews: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case CHANGE_REVIEW_ARCHIVE:
      return {
        ...state,
        reviews: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case SET_ORDER:
      return {
        ...state,
        lastMsg: action.payload.msg,
        order: [...state.order, ...action.payload.result],
      };
    case GET_ORDERS:
      return {
        ...state,
        lastMsg: action.payload.msg,
        order: action.payload.data.orders,
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case GET_ADMIN_ORDERS:
      return {
        ...state,
        orders: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case CHANGE_ORDER_ARCHIVE:
      return {
        ...state,
        orders: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case CHANGE_ORDER_STATUS:
      return {
        ...state,
        orders: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case CHANGE_USER_ACTIVE:
      return {
        ...state,
        users: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case CHANGE_USER_ADMIN:
      return {
        ...state,
        users: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case GET_CAMPAIGNS:
      return {
        ...state,
        campaigns: action.payload.result,
        mails: action.payload.mails,
        lastMsg: action.payload.msg,
      };
    case CHANGE_CAMPAIGN_ARCHIVE:
      return {
        ...state,
        campaigns: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case PUBLISH_CAMPAIGN:
      return {
        ...state,
        campaigns: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case CREATE_CAMPAIGN:
      return {
        ...state,
        campaigns: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case UPDATE_CAMPAIGN:
      return {
        ...state,
        campaigns: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case DELETE_CAMPAIGN:
      return {
        ...state,
        campaigns: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case CHANGE_CAMPAIGN_RATING:
      return {
        ...state,
        campaigns: action.payload.result,
        lastMsg: action.payload.msg,
      };
    case GET_ADDRESSES:
      return {
        ...state,
        lastMsg: action.payload.msg,
        addresses: action.payload.result
      }
    case PUT_ADDRESSES:
      return {
        ...state,
        lastMsg:action.payload.msg,
        adress: action.payload.result
      }
    case DELETE_ADDRESS:
      return {
        ...state,
        lastMsg:action.payload.msg,
        addresses: state.addresses.filter(e => e.id !== action.payload.result)
      }
    case PUT_PROFILE_USER:
      return{
        ...state,
        lastMsg: 'profile data update, was succefull',
        user: {
          ...state.user,
          ...action.payload
        }
        
      }
    default:
      return { ...state };
  }
}
