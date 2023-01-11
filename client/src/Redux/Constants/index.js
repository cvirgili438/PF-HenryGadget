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
  productDetail: {},
  filters: {},
  page: 1,
  totalProducts: 1,
  lastMsg: '',
  loading: false,
  userFromDb:{},
  users:[],
  reviews:[],
  cartProducts: [],
  refreshCart: null,  // Se usa para solor notificar de cambios en el carrito.
  user:userStorageData,
  adress:{},
  addresses: [],
  order:[],
  orders:[],
  campaigns:[],
  locations:[]
};

// PRODUCTOS
export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_PRODUCTS_NAMES = 'GET_PRODUCTS_NAMES';
export const GET_TYPES = 'GET_TYPES'
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID'
export const GET_PRODUCTS_BY_QUERY= 'GET_PRODUCTS_BY_QUERY'
export const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const CLEAR_PRODUCT = 'CLEAR_PRODUCT';
export const CHANGE_PRODUCT_ACTIVE = 'CHANGE_PRODUCT_ACTIVE';
export const CHANGE_PRODUCT_ARCHIVE = 'CHANGE_PRODUCT_ARCHIVE';

// USUARIOS
export const SET_USER_LOGIN = 'SET_USER_LOGIN'
export const GET_USERS = 'GET_USERS'
export const GET_REVIEWS = 'GET_REVIEWS'
export const CHANGE_REVIEW_VISIBLE = 'CHANGE_REVIEW_VISIBLE'
export const CHANGE_REVIEW_ARCHIVE = 'CHANGE_REVIEW_ARCHIVE'
export const CHANGE_USER_ACTIVE = 'CHANGE_USER_ACTIVE'
export const CHANGE_USER_ADMIN = 'CHANGE_USER_ADMIN'
export const PUT_PROFILE_USER = 'PUT_PROFILE_USER'
export const FORCE_RESET_PWD = 'FORCE_RESET_PWD'
export const CHECK_USER_RESET_PWD = 'CHECK_USER_RESET_PWD'



// VARIAS
export const SET_PAGE_VIEW = 'SET_PAGE_VIEW';
export const SET_LOADING = 'SET_LOADING'

//checkout
export const SET_LOCAL_ADRESS= 'SET_LOCAL_ADRESS'
export const SET_USER_ADDRESS = 'SET_USER_ADDRESS'

// Cart
export const REFRESH_CART = 'REFRESH_CART';

//orders
export const SET_ORDER = 'SET_ORDER'
export const GET_ORDERS = 'GET_ORDERS'
export const GET_ADMIN_ORDERS = 'GET_ADMIN_ORDERS'
export const CHANGE_ORDER_ARCHIVE = 'CHANGE_ORDER_ARCHIVE'
export const CHANGE_ORDER_STATUS = 'CHANGE_ORDER_STATUS'
export const DELETE_ORDER = 'DELETE_ORDER'
export const CHANGE_ORDER_SENT_MAIL = 'CHANGE_ORDER_SENT_MAIL'

//mailing
export const GET_CAMPAIGNS = 'GET_CAMPAIGNS'
export const CHANGE_CAMPAIGN_ARCHIVE = 'CHANGE_CAMPAIGN_ARCHIVE' 
export const PUBLISH_CAMPAIGN = 'PUBLISH_CAMPAIGN'
export const CREATE_CAMPAIGN = 'CREATE_CAMPAIGN'
export const UPDATE_CAMPAIGN = 'UPDATE_CAMPAIGN'
export const DELETE_CAMPAIGN = 'DELETE_CAMPAIGN'
export const CHANGE_CAMPAIGN_RATING = 'CHANGE_CAMPAIGN_RATING'

//review
export const ADD_REVIEW = 'ADD_REVIEW'


//locations
export const GET_LOCATIONS = 'GET_LOCATIONS'
export const GET_ADMIN_LOCATIONS = 'GET_ADMIN_LOCATIONS'
export const CREATE_LOCATION = 'CREATE_LOCATION'
export const UPDATE_LOCATION = 'UPDATE_LOCATION'
export const DELETE_LOCATION = 'DELETE_LOCATION'
export const CHANGE_LOCATION_VISIBLE = 'CHANGE_LOCATION_VISIBLE'
export const CHANGE_LOCATION_ARCHIVE = 'CHANGE_LOCATION_VISIBLE'

//adresses
export const GET_ADDRESSES = 'GET_ADDRESSES';
export const PUT_ADDRESSES = 'PUT_ADDRESSES';
export const DELETE_ADDRESS= 'DELETE_ADDRESS';