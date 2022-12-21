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
  loading: false,
  localCart:[],
  userCart:[],
  cartProducts: [],
  user:userStorageData,
  adress:{},

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
export const SET_USER_LOGIN = 'SET_USER_LOGIN'

// CARRITO
export const SET_LOCAL_CART = 'SET_LOCAL_CART'
export const GET_USER_CART = 'GET_USER_CART'
export const SET_USER_CART =  'SET_USER_CART'
export const DELETE_USER_CART = 'DELETE_USER_CART'
export const CLEAR_CARTS = 'CLEAR_CARTS'
export const REFRESH_CARTS = 'REFRESH_CARTS'
export const CART_PRODUCTS = 'CART_PRODUCTS'

// VARIAS
export const SET_PAGE_VIEW = 'SET_PAGE_VIEW';
export const SET_LOADING = 'SET_LOADING'

//checkout

export const SET_LOCAL_ADRESS= 'SET_LOCAL_ADRESS'
export const SET_USER_ADDRESS = 'SET_USER_ADDRESS'