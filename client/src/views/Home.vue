<template>
  <div class="home">
    <section class="top">
      <div class="bg_over">
        <div class="header">
          <h1 class="title">URL Shortener</h1>
          <h2 class="subtitle">Simplify & track your links</h2>
        </div>

        <div class="links">
          <input
            type="text"
            name="url"
            v-model="url"
            autofocus
            autocomplete="off"
            class="links__input"
            placeholder="Shorten your link"
          />
          <button class="links__button" @click="shortenUrl()">{{buttonText}}</button>
        </div>
      </div>
    </section>
    <Links :links="links" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { ILink } from "@/types/Link";
import { sortByDate } from "@/utils/links";
import Links from "@/components/Links.vue";

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
  private buttonText = "Shorten";

  @Watch("url")
  nameChanged(newUrl: string) {
    if (newUrl == "" && this.oldUrl != this.url) {
      this.buttonText = "Shorten";
    }
  }

  async shortenUrl() {
    if (!this.url || this.url.includes("pbid.io")) {
      return;
    }

    this.oldUrl = this.url;
    const { data } = await this.$http.post("/links", { url: this.url });
    this.links = [data, ...this.links] as ILink[];
    this.url = data ? data.shortened : this.oldUrl;
    this.buttonText = data && data.shortened ? "Copy" : this.buttonText;
  }

  async created() {
    const { data } = await this.$http.get("/links");
    this.links = sortByDate(data as ILink[]);
  }
}
</script>

<style lang="scss" scoped>
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

.links {
  margin: 0 auto;
  width: 90%;

  @media screen and (min-width: 601px) {
    width: 71.5%;
  }

  & .links__input {
    border: 1px solid lightgray;
    border-radius: 0.5rem;
    box-sizing: border-box;
    font-size: 1rem;
    height: 3rem;
    margin-bottom: 0.5rem;
    padding: 0 20px;
    width: 100%;

    @media screen and (min-width: 601px) {
      border-radius: 0.5rem 0 0 0.5rem;
      border-right: none;
      width: 91%;
      display: inline-block;
    }
  }

  & .links__button {
    background-color: #42b983;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    color: whitesmoke;
    cursor: pointer;
    font-size: 1rem;
    height: 3rem;
    width: 100%;

    @media screen and (min-width: 601px) {
      border-radius: 0 0.5rem 0.5rem 0;
      border-left: none;
      width: 7.38rem;
    }
  }
}
</style>
