// CONEXION
import { fetchUserData } from "../../Utils/fetchLocalStorageData";

export const URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
// export const URL = 'http://192.168.0.170:3001'; // para pruebas

const userStorageData = fetchUserData()
// ESTADO INICIAL
export const inicialtate = {
  products: [],
  productsNames: [],
  filteredProducts: [],
  productDetail: [],
  filters: {},
  page: 1,
  totalProducts: 1,
  lastMsg: '',
  cart:[],
  user:userStorageData
};

// PRODUCTOS
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_NAMES = 'GET_PRODUCTS_NAMES';
export const GET_TYPES = 'GET_TYPES'
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'
export const GET_PRODUCTS_BY_QUERY= 'GET_PRODUCTS_BY_QUERY'
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';

// USUARIOS
export const SET_USER_LOGIN_THIRDPARTIES = 'SET_USER_LOGIN_THIRDPARTIES'

// CARRITO
export const SET_PRODUCTS_IN_CART = 'SET_PRODUCTS_IN_CART'

// VARIAS
export const SET_PAGE_VIEW = 'SET_PAGE_VIEW';