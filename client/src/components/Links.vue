<template>
  <div class="result" v-if="links.length">
    <ul class="shortened-urls">
      <li v-for="link of links" :key="link.urlId">
        <div>
          <LocaleDate :date="link.createdAt" />
          <p class="link_host">{{ getHostName(link.original) }}</p>
          <p class="url_link">
            <a :href="link.original" target="_blank">{{ link.original }}</a>
          </p>
          <p id="link" class="d_i_b">
            <a :href="link.shortened" class="short_url" target="blank">{{
              link.shortened
            }}</a>
          </p>
          <button class="btn-copy" @click="copyToClipboard(link.shortened)">
            Copy
          </button>
          <button class="popularity">
            Clicks
            <span>{{ link.popularity }}</span>
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { copy } from "@/utils/misc";
import { ILink } from "@/types/Link";
import { hostName } from "@/utils/links";
import LocaleDate from "@/components/LocaleDate.vue";

@Component({
  components: {
    LocaleDate
  }
})
export default class Links extends Vue {
  @Prop({ required: true }) readonly links!: ILink[];

  copyToClipboard(url: string) {
    copy(url);
  }

  getHostName(url: string) {
    return hostName(url);
  }
}
</script>

<style scoped lang="scss">
a,
a:hover,
button,
button:hover {
  text-decoration: none;
  -webkit-transition: all 0.25s ease-in;
  -ms-transition: all 0.25s ease-in;
  transition: all 0.25s ease-in;
}

.result {
  margin: 0 auto;
  width: 90%;

  @media screen and (min-width: 601px) {
    width: 71.5%;
  }

  & ul {
    display: block;
    float: left;
    list-style-type: none;
    padding-left: 0;
    width: 100%;

    & li {
      float: left;
      width: 100%;
    }
  }

  & .shortened-urls li {
    margin-top: 5px;
    margin-bottom: 0;
    z-index: 1;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }

  & div {
    box-sizing: border-box;
    float: left;
    position: relative;
    width: 100%;
    color: #002553;
    line-height: 1.6;
    padding: 12px;
    margin: 0;
    font-size: 14px;
    word-break: break-all;
    border-bottom: 1px solid rgba(118, 140, 161, 0.2);
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    border-radius: 2px;
  }
}

.shortened-urls li div {
  margin-top: 0;
  border: 1px solid rgba(118, 140, 161, 0.08);
  box-shadow: 0 2px 4px rgba(4, 28, 80, 0.02);
  -webkit-transition: all 0.25s ease-out;
  -ms-transition: all 0.25s ease-out;
  transition: all 0.25s ease-out;
}

.result ul li div {
  margin-top: 0;
  margin-bottom: 0;
  border: 1px solid #e6e6e7;
}

.shortened-urls li:nth-child(1) div {
  margin-top: 15px;
}

.shortened-urls li:last-child div {
  margin-bottom: 15px;
}

.result ul li:nth-child(1) div {
  margin-top: 5px;
}

.result ul li:last-child div {
  margin-bottom: 0;
}

.result p {
  margin: 2px 0;
}

.result .data_link {
  border: 1px solid #002553;
  width: 110px;
  position: relative;
  text-align: center;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  font-size: 12px;
  padding: 3px 6px;
  margin: 0 0 3px;
}

.result .link_host {
  color: #002553;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
}

p.url_link {
  margin-bottom: 6px;
}

.result .url_link a {
  color: rgba(118, 140, 161, 0.65);

  &:hover {
    color: #1076f7;
  }
}

.d_i_b {
  display: inline-block;
}

.result #link a {
  color: #ff2239;
  word-break: break-all;
  max-width: 380px;
  margin: 40px auto 0;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  position: relative;

  &:hover {
    color: #002553;
  }
}

.short_url {
  font-size: 0.9rem;
  font-weight: 700;
}

.result button.btn-copy {
  background: 0 0;
  width: auto;
  font-size: 14px;
  color: #fe223b;
  cursor: pointer;
  box-shadow: none;
  border: none;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  border: 1px solid #fe223b;
  padding: 6px 12px;
  margin: 0 0 0 15px;

  &:hover {
    background: #fe223b;
    color: #fff;
  }
}

.result button.popularity {
  float: right;
  background: 0 0;
  width: auto;
  font-size: 14px;
  color: #1076f7;
  text-transform: lowercase;
  cursor: pointer;
  box-shadow: none;
  border: none;
  -webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  border-radius: 2px;
  border: 1px solid #1076f7;
  padding: 6px 12px;
  margin: 0 0 0 15px;

  &:hover {
    background: #1076f7;
    color: #fff;
  }

  & span {
    font-weight: 700;
  }
}
</style>
