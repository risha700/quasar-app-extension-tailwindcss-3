import { createRouter, createWebHistory } from "vue-router";
import routes from "src/router/routes";
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, Suspense } from "vue";
import axios from "axios";
import { createStore } from "pinia";
// import mitt from 'mitt'
export const setupUtils = () => {
  global.window.axios = axios;
  // global.window.EventBus = mitt()
  // global.window.flash  = jest.fn()
  // global.window.delay = jest.fn()
  predefineWatchMedia();
};

export const predefineWatchMedia = (isOn) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: isOn || false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};
export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export const store = {
  state: {
    authUser: {},
  },
  getters: {
    fetchUserData: jest.fn().mockImplementation((state) => {
      return state.auth.authUser;
    }),
  },
  mutations: {
    fetchUserProfileData: jest.fn().mockImplementation((state, data) => {
      Object.keys(data).map((key) => {
        switch (typeof data[key]) {
          case "object":
            key === "tenants"
              ? (state.authUser[key] = data[key])
              : Object.keys(data[key]).map((sub_key) => {
                  state.authUser[sub_key] = data[key][sub_key];
                });
            break;
          case "string":
            state.authUser[key] = data[key];
            break;
        }
      });
      state.authUser.avatar = state.authUser.photo;
    }),
    loggedIn: jest.fn().mockImplementation((state, data) => {
      state.authUser = data;
      console.log("called");
    }),
    clearTempToken: jest.fn().mockImplementation((state) => {
      state.tempToken = null;
    }),
    setTempToken: jest.fn().mockImplementation((state, data) => {
      state.tempToken = data;
    }),
    unsetNewDevice: jest.fn().mockImplementation((state) => {
      state.authUser.new_device = false;
    }),
  },
  actions: {
    fetchUserProfileData: jest.fn(),
    logIn: jest.fn().mockImplementation(({ commit }, data) => {
      commit("loggedIn", data);
    }),
  },
};

export const createVuexStore = (initialState) =>
  createStore({
    ...initialState,
  });

export const mountSuspense = async (component, options) => {
  const wrapper = mount(
    defineComponent({
      render() {
        return h(Suspense, null, {
          default: h(component),
          fallback: h("div", "fallback"),
        });
      },
    }),
    options
  );

  await nextTick();
  return wrapper;
};

export const componentFactory = (component, options) => {
  return mount(component, {
    global: {
      // mocks:store,
      plugins: [router, createVuexStore(store)],
      // components:{SvgIcon, FlashMessage,SuspenseWithErrors},
      stubs: {
        lowerCase: true,
        mask: true,
      },
    },
    ...options,
  });
};
