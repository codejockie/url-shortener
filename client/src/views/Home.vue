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
              type="text"
              name="url"
              v-model="url"
              autofocus
              autocomplete="off"
              placeholder="Shorten your link"
            />
            <button class="btn-shorten" @click="shorten()">
              {{ buttonText || "Shorten" }}
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

@Component({
  components: {
    Links
  },
  name: "Home"
})
export default class Home extends Vue {
  private url = "";
  private oldUrl = "";
  private links: ILink[] = [];
  private buttonText = "";

  copyToClipboard(url: string) {
    copy(url);
  }

  @Watch("url")
  urlChanged(newUrl: string) {
    if (!this.url.includes("pbid.io") && this.oldUrl != newUrl) {
      this.buttonText = "Shorten";
    }
  }

  async shorten() {
    if (!this.url || this.url.includes("pbid.io")) {
      this.url && this.copyToClipboard(this.url);
      return;
    }

    this.oldUrl = this.url;
    const { data } = await linksService.shortenLink(this.url);
    this.links = [data, ...this.links] as ILink[];
    this.url = data.shortened ?? this.oldUrl;
    this.buttonText = data?.shortened ? "Copy" : "Shorten";
  }

  async created() {
    const { data } = await linksService.getLinks();
    this.links = sortByDate(data as ILink[]);
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  max-width: 80rem;
  margin: 0 auto;
}

.container {
  padding: 1rem;
  display: block;
}

@media only screen and (min-width: 48rem) {
  .container {
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

  @media screen and (min-width: 768px) {
    border-radius: 0.5rem 0 0 0.5rem;
    display: inline-block;
    width: 91%;
  }
}

button {
  background: #42b983;
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  line-height: 3rem;
  margin-top: 1rem;
  width: 100%;

  @media screen and (min-width: 768px) {
    border-radius: 0 0.5rem 0.5rem 0;
    width: 7.38rem;
  }
}

@media only screen and (min-width: 48rem) {
  button {
    width: 10%;
    margin-top: 0;
  }
}

.top {
  height: 500px;
  height: 60vh;
  min-height: 450px;
  max-height: 460px;
  padding: 0;
  margin: 0;
  background-color: #002553;

  & .bg_over {
    position: relative;
    padding-top: 150px;
    z-index: 1;
    vertical-align: middle;
    overflow-x: hidden;
  }
}

a,
a:hover,
button,
button:hover {
  text-decoration: none;
  -webkit-transition: all 0.25s ease-out;
  -ms-transition: all 0.25s ease-out;
  transition: all 0.25s ease-out;
}

.header {
  text-align: center;

  & h1 {
    color: #fff;
    font-weight: 700;
    font-size: 2.2rem;
    padding: 0;
    margin: 0;
    text-align: center;

    @media only screen and (min-width: 1066px) {
      font-size: 2.6rem;
    }
  }

  & h2 {
    color: #fff;
    font-size: 1.2rem;
    font-weight: 300;
    letter-spacing: 1px;
    padding: 0;
    margin: 4px 0 35px;
    text-align: center;

    @media only screen and (min-width: 1066px) {
      letter-spacing: 3px;
    }
  }
}
</style>
