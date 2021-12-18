/* eslint-disable no-debugger */
import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  profile: null,
  userList: [],
  employeeList: [],
  count: 0,
  managers: [],
  regions: [],
  allRegions: [],
  cities: [],
  selectedId: null,
  sd_managers: [],
  me: null,
  employee: null
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

    getEmployeeListSuccess(state, action) {
      state.isLoading = false;
      state.employeeList = action.payload;
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

    // GET SDMANAGERS
    getSdManagers(state, action) {
      state.isLoading = true;
      state.sd_managers = action.payload;
    },

    // GET REGIONS
    getRegions(state, action) {
      state.isLoading = true;
      state.regions = action.payload;
    },

    // GET REGIONS
    getAllRegions(state, action) {
      state.isLoading = true;
      state.allRegions = action.payload;
    },

    // GET REGIONS
    getContacts(state, action) {
      state.isLoading = true;
      state.profile.contacts = [...state.profile.contacts, action.payload];
    },

    // GET REGIONS
    getComments(state, action) {
      state.isLoading = true;
      state.profile.comments = [...state.profile.comments, action.payload];
    },

    // GET REGIONS
    getNewDate(state, action) {
      state.isLoading = true;
      state.profile.date = action.payload;
    },

    getChangedProfileSuccess(state, action) {
      state.isLoading = true;
      state.profile = { ...action.payload };
    },

    // GET CITIES
    getCitiesSuccess(state, action) {
      state.isLoading = true;
      state.cities = action.payload;
    },

    getAddedProfile(state, action) {
      state.isLoading = true;
      state.profile = [...state.profile, ...action.payload];
    },

    getMe(state, action) {
      state.isLoading = true;
      state.me = action.payload;
    },

    getEmployee(state, action) {
      state.isLoading = true;
      state.employee = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteUser, hasError } = slice.actions;

// ----------------------------------------------------------------------

export function getProfile(id = 0) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`api/v1/sd/companies/${id}/`);
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
      const response = await axios.get('api/user/posts');
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
      const response = await axios.get('api/user/social/followers');
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
      const response = await axios.get('api/user/social/friends');
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
      const response = await axios.get('api/user/social/gallery');
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
      const response = await axios.get(`api/v1/sd/companies/?page=${page + 1}&page_size=${pageSize}${filters}`);
      dispatch(slice.actions.getCountSuccess(response.data.count));
      dispatch(slice.actions.getUserListSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getEmployeeList(pageSize = 5, page = 0, search = '') {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/users/?page=${page + 1}&page_size=${pageSize}&search=${search}`);
      dispatch(slice.actions.getCountSuccess(response.data.count));
      dispatch(slice.actions.getEmployeeListSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getEmployee(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/api/v1/users/${id}/`);
      dispatch(slice.actions.getEmployee(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteEmployee(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/api/v1/users/${id}/`);
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function blockEmployee(id, employee) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/api/v1/users/${id}/`, {
        ...employee,
        position: employee.position.id,
        is_banned: true
      });
      console.log(response);
      dispatch(slice.actions.stopLoading());
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
      const response = await axios.get('api/user/account/cards');
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
      const response = await axios.get('api/user/account/address-book');
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
      const response = await axios.get('api/user/account/invoices');
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
      const response = await axios.get('api/user/account/notifications-settings');
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
      const response = await axios.get('api/user/all');
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
      const response = await axios.get('api/v1/sd/companies/used_managers/');
      dispatch(slice.actions.getManagers(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getSdManagers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('api/v1/users/sd_managers/');
      dispatch(slice.actions.getSdManagers(response.data));
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
      const response = await axios.get('api/v1/sd/companies/used_regions/');
      dispatch(slice.actions.getRegions(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAllRegions(str = '') {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`api/v1/regions/?search=${str}`);
      dispatch(slice.actions.getAllRegions(response.data));
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
      await axios.patch(`api/v1/sd/companies/${id}/update_status/`, { status });
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function setDate(id, formatedDate, date) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(`api/v1/sd/companies/${id}/update_date/`, { date: formatedDate });
      dispatch(slice.actions.getNewDate(date));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function setContacts(data, profileId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`api/v1/sd/contacts/`, {
        name: data.name,
        position: data.position,
        phone: data.phoneNumber,
        email: data.email,
        company: profileId
      });
      dispatch(slice.actions.getContacts(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function changeContacts(data, contactId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch(`api/v1/sd/contacts/${contactId}/`, {
        name: data.name,
        position: data.position,
        phone: data.phoneNumber,
        email: data.email
      });
      dispatch(slice.actions.getContacts(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function setComments(text, profileId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`api/v1/sd/comments/`, {
        text,
        company: profileId
      });
      dispatch(slice.actions.getComments(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteCompany(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      axios.delete(`api/v1/sd/companies/${id}/`, {
        id
      });
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteContact(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      axios.delete(`api/v1/sd/contacts/${id}/`, {
        id
      });
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getChangedProfile(id, data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.patch(`api/v1/sd/companies/${id}/`, {
        user: data.user.id || null,
        address: data.address || null,
        name: data.name || null,
        city: data.city.id || null,
        taxpayer_id: data.taxpayer_id || null,
        region: data.region.id || null
      });
      const response = await axios.get(`api/v1/sd/companies/${id}/`);
      dispatch(slice.actions.getChangedProfileSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getCities(search = '', regionId = '') {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`api/v1/cities/?search=${search}&region=${regionId}`);
      dispatch(slice.actions.getCitiesSuccess(response.data.results));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function setCompany(data, navigate) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('api/v1/sd/companies/', {
        user: data.user.id,
        name: data.name,
        taxpayer_id: data.taxpayer_id,
        region: data.region.id,
        city: data.city.id,
        address: data.address
      });
      navigate(`${PATH_DASHBOARD.user.list}/${response.data.id}`);
      dispatch(slice.actions.getAddedProfile(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getMe() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/v1/users/me/');
      dispatch(slice.actions.getMe(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
