/* eslint-disable no-debugger */
import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  profile: null,
  posts: [],
  users: [],
  userList: [],
  count: 0,
  followers: [],
  friends: [],
  gallery: [],
  cards: null,
  addressBook: [],
  invoices: [],
  notifications: null,
  managers: [],
  regions: []
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // START LOADING
    stopLoading(state) {
      state.isLoading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PROFILE
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.profile = action.payload;
    },

    // GET POSTS
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload.results;
    },

    // DELETE USERS
    deleteUser(state, action) {
      const deleteUser = filter(state.userList, (user) => user.id !== action.payload);
      state.userList = deleteUser;
    },

    // GET FOLLOWERS
    getFollowersSuccess(state, action) {
      state.isLoading = false;
      state.followers = action.payload;
    },

    // ON TOGGLE FOLLOW
    onToggleFollow(state, action) {
      const followerId = action.payload;

      const handleToggle = map(state.followers, (follower) => {
        if (follower.id === followerId) {
          return {
            ...follower,
            isFollowed: !follower.isFollowed
          };
        }
        return follower;
      });

      state.followers = handleToggle;
    },
    // GET COUNT
    getCountSuccess(state, action) {
      state.count = action.payload;
    },

    // GET FRIENDS
    getFriendsSuccess(state, action) {
      state.isLoading = false;
      state.friends = action.payload;
    },

    // GET GALLERY
    getGallerySuccess(state, action) {
      state.isLoading = false;
      state.gallery = action.payload;
    },

    // GET MANAGE USERS
    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    },

    // GET CARDS
    getCardsSuccess(state, action) {
      state.isLoading = false;
      state.cards = action.payload;
    },

    // GET ADDRESS BOOK
    getAddressBookSuccess(state, action) {
      state.isLoading = false;
      state.addressBook = action.payload;
    },

    // GET INVOICES
    getInvoicesSuccess(state, action) {
      state.isLoading = false;
      state.invoices = action.payload;
    },

    // GET NOTIFICATIONS
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.notifications = action.payload;
    },

    // GET MANAGERS
    getManagers(state, action) {
      state.isLoading = true;
      state.managers = action.payload;
    },

    // GET REGIONS
    getRegions(state, action) {
      state.isLoading = true;
      state.regions = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteUser } = slice.actions;

// ----------------------------------------------------------------------

export function getProfile(id = 0) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/sd/companies/${id}/`);
      dispatch(slice.actions.getProfileSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getPosts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/posts');
      dispatch(slice.actions.getPostsSuccess(response.data.posts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFollowers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/social/followers');
      dispatch(slice.actions.getFollowersSuccess(response.data.followers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getFriends() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/social/friends');
      dispatch(slice.actions.getFriendsSuccess(response.data.friends));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getGallery() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/social/gallery');
      dispatch(slice.actions.getGallerySuccess(response.data.gallery));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getUserList(pageSize = 5, page = 0, filters = '') {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/sd/companies/?page=${page + 1}&page_size=${pageSize}${filters}`);
      dispatch(slice.actions.getCountSuccess(response.data.count));
      dispatch(slice.actions.getUserListSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCards() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/account/cards');
      dispatch(slice.actions.getCardsSuccess(response.data.cards));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAddressBook() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/account/address-book');
      dispatch(slice.actions.getAddressBookSuccess(response.data.addressBook));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getInvoices() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/account/invoices');
      dispatch(slice.actions.getInvoicesSuccess(response.data.invoices));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getNotifications() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/account/notifications-settings');
      dispatch(slice.actions.getNotificationsSuccess(response.data.notifications));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getUsers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/all');
      dispatch(slice.actions.getUsersSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getManagers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/sd/companies/used_managers/');
      dispatch(slice.actions.getManagers(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getRegions() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/sd/companies/used_regions/');
      dispatch(slice.actions.getRegions(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function setStatus(id, status) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(`/api/v1/sd/companies/${id}/update_status/`, { status });
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function setDate(id, date) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(`/api/v1/sd/companies/${id}/update_date/`, { date });
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
