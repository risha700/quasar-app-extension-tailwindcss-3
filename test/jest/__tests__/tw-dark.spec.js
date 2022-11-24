import { beforeEach, describe, expect, it } from "@jest/globals";
import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-jest";
import { DOMWrapper, mount } from "@vue/test-utils";
import App from "./MyApp";
import { createRouter, createWebHistory } from "vue-router";

installQuasarPlugin();
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    name: "base",
  }
]
export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

describe("App", () => {
  let wrapper;
  let docWrapper;

  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
  });

  it("Renders", async () => {
    docWrapper = new DOMWrapper(document);
    expect(docWrapper.html()).not.toBe("");
  });

  it("Adds dark tailwind classes", async () => {
    expect(docWrapper.html()).not.toBe("");
    expect(docWrapper.html()).toContain("tw-dark");
  });
});
