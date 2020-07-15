import { mount, shallowMount, VueClass } from "@vue/test-utils";
import { ILink } from '@/types/Link';

export const factory = (Component: VueClass<Vue>, options: Record<string, {}> = {}) => {
  return shallowMount(Component, {
    data () {
      return {
        ...options?.data
      }
    },
    propsData: {
      ...options?.propsData
    }
  })
};

export const mountFactory = (Component: VueClass<Vue>, options: Record<string, {}> = {}) => {
  return mount(Component, {
    data () {
      return {
        ...options?.data
      }
    },
    propsData: {
      ...options?.propsData
    }
  })
};

export const links: ILink[] = [
  {
    original: "https://example.com",
    shortened: "https://pbid.io/f3x2ab1c",
    urlId: "f3x2ab1c",
    createdAt: "2020-07-14T01:10:10.830Z",
    popularity: 100
  },
  {
    original: "https://pbid.io",
    shortened: "https://pbid.io/3ft2da5c",
    urlId: "3ft2da5c",
    createdAt: "2020-07-15T01:10:10.830Z",
    popularity: 150
  },
  {
    original: "https://pbid.io",
    shortened: "https://pbid.io/3ft2da5d",
    urlId: "3ft2da5d",
    createdAt: "2020-07-15T01:10:10.830Z",
    popularity: 150
  }
]