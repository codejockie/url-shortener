import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Short.ly - Home",
      metaTags: [
        {
          name: "description",
          content: "Short.ly home page.",
        },
        {
          property: "og:description",
          content: "Short.ly home page.",
        },
      ],
    },
  },
  {
    path: "/about",
    name: "About",
    component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
    meta: {
      title: "Short.ly - About",
      metaTags: [
        {
          name: "description",
          content: "Short.ly about page.",
        },
        {
          property: "og:description",
          content: "Short.ly about page.",
        },
      ],
    },
  },
  {
    path: "/*",
    component: () => import(/* webpackChunkName: "notFound" */ "../views/NotFound.vue"),
    meta: {
      title: "Short.ly - 404",
      metaTags: [
        {
          name: "description",
          content: "Page you are looking for was not found.",
        },
        {
          property: "og:description",
          content: "Page you are looking for was not found.",
        },
      ],
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested"s will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  }

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(document.querySelectorAll("[data-vue-router-controlled]")).map((el) =>
    el.parentNode?.removeChild(el)
  );

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) {
    return next();
  }

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map((tagDef: Record<string, string>) => {
      const tag = document.createElement("meta");

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      // We use this to track which meta tags we create, so we don"t interfere with other ones.
      tag.setAttribute("data-vue-router-controlled", "");

      return tag;
    })
    // Add the meta tags to the document head.
    .forEach((tag: Node) => document.head.appendChild(tag));

  next();
});

export default router;
