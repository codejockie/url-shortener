<template>
  <div class="home">
    <section class="top">
      <div class="bg_over">
        <div class="header">
          <h1 class="title">URL Shortener</h1>
          <h2 class="subtitle">Simplify & track your links</h2>
        </div>

        <div class="wrapper">
          <div class="container">
            <input
              autofocus
              type="text"
              name="url"
              v-model="url"
              autocomplete="off"
              placeholder="Shorten your link"
            />
            <button @click="shorten()" class="btn-shorten" :class="{ copy: isCopy }">
              {{ buttonText }}
            </button>
          </div>
        </div>
      </div>
    </section>
    <Links :links="links" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { copy } from "@/utils/misc";
import { ILink } from "@/types/Link";
import { sortByDate } from "@/utils/links";
import Links from "@/components/Links.vue";
import linksService from "@/services/links";
import { COPY, linkRegex, SHORTEN } from "@/constants";

@Component({
  components: {
    Links,
  },
  name: "Home",
})
export default class Home extends Vue {
  private url = "";
  private oldUrl = "";
  private links: ILink[] = [];
  private buttonText = SHORTEN;
  private isCopy = false;

  copyToClipboard(url: string) {
    copy(url);
  }

  @Watch("url")
  urlChanged(newUrl: string) {
    if (!linkRegex.test(this.url) && this.oldUrl != newUrl) {
      this.isCopy = false;
      this.buttonText = SHORTEN;
    }
  }

  async shorten() {
    if (linkRegex.test(this.url)) {
      // TODO: Show a tooltip
      return this.copyToClipboard(this.url);
    }

    try {
      this.oldUrl = this.url;
      const { data } = await linksService.shortenLink(this.url);
      this.links = [data, ...this.links] as ILink[];
      this.url = data.shortened ?? this.oldUrl;
      this.isCopy = data?.shortened ? true : false;
      this.buttonText = data?.shortened ? COPY : SHORTEN;
    } catch (error) {
      // TODO: Add a toast notification
      console.error(error);
    }
  }

  async created() {
    const { data } = await linksService.getLinks();
    this.links = sortByDate(data as ILink[]);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin: 0 auto;
  max-width: 80rem;
}

.container {
  display: block;
  padding: 1rem;

  @media only screen and (min-width: 48rem) {
    display: flex;
  }
}

input[type="text"] {
  border: none;
  border-radius: 0.5rem;
  box-sizing: border-box;
  font-size: 1rem;
  line-height: 3rem;
  padding: 0 1rem;
  width: 100%;

  @media screen and (min-width: 48rem) {
    border-radius: 0.5rem 0 0 0.5rem;
    display: inline-block;
    width: 91%;
  }
}

button {
  background-color: #42b983;
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  line-height: 3rem;
  margin-top: 1rem;
  width: 100%;

  &.copy {
    background-color: #ff2239;
    font-weight: bold;
  }

  @media screen and (min-width: 48rem) {
    border-radius: 0 0.5rem 0.5rem 0;
    margin-top: 0;
    width: 9%;
  }
}

.top {
  background-color: #002553;
  height: 31.25rem;
  height: 60vh;
  min-height: 28.125rem;
  max-height: 28.75rem;
  margin: 0;
  padding: 0;

  & .bg_over {
    overflow-x: hidden;
    padding-top: 9.375rem;
    position: relative;
    vertical-align: middle;
    z-index: 1;
  }
}

a,
a:hover,
button,
button:hover {
  text-decoration: none;
  -webkit-transition: all 0.2s ease-out;
  -ms-transition: all 0.2s ease-out;
  transition: all 0.2s ease-out;
}

.header {
  text-align: center;

  & h1 {
    color: #fff;
    font-weight: 700;
    font-size: 2.2rem;
    margin: 0;
    padding: 0;
    text-align: center;

    @media only screen and (min-width: 66.625rem) {
      font-size: 2.6rem;
    }
  }

  & h2 {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 300;
    letter-spacing: 1px;
    margin: 0.25rem 0 2.18rem;
    padding: 0;
    text-align: center;

    @media only screen and (min-width: 66.625rem) {
      letter-spacing: 3px;
    }
  }
}
</style>
