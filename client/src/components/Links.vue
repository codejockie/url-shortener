<template>
  <div class="result" v-if="links.length">
    <ul class="links">
      <li v-for="link of links" :key="link.urlId">
        <div>
          <LocaleDate :date="link.createdAt" />
          <p class="link_host">{{ getHostName(link.original) }}</p>
          <p class="original_link">
            <a :href="link.original" target="_blank">{{ link.original }}</a>
          </p>
          <p id="link" class="link">
            <a :href="link.shortened" class="short_link" target="blank">{{
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

  & .links li {
    border-radius: 2px;
    margin-bottom: 0;
    margin-top: 5px;
    z-index: 1;

    & div {
      border: 1px solid rgba(118, 140, 161, 0.08);
      box-shadow: 0 2px 4px rgba(4, 28, 80, 0.02);
      margin-top: 0;
      -webkit-transition: all 0.25s ease-out;
      -ms-transition: all 0.25s ease-out;
      transition: all 0.25s ease-out;
    }
  }

  & div {
    border-bottom: 1px solid rgba(118, 140, 161, 0.2);
    border-radius: 2px;
    box-sizing: border-box;
    color: #002553;
    float: left;
    font-size: 14px;
    line-height: 1.6;
    margin: 0;
    padding: 12px;
    position: relative;
    width: 100%;
    word-break: break-all;
  }

  & p {
    margin: 2px 0;
  }

  & .data_link {
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

  & .link_host {
    color: #002553;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;
  }

  & button.btn-copy {
    background: 0 0;
    color: #fe223b;
    cursor: pointer;
    border: none;
    border: 1px solid #fe223b;
    border-radius: 2px;
    box-shadow: none;
    font-size: 0.875rem;
    margin: 0;
    padding: 6px 12px;
    width: auto;

    &:hover {
      background: #fe223b;
      color: #fff;
    }

    @media screen and (min-width: 23.44rem) {
      margin: 0 0 0 15px;
    }
  }

  & button.popularity {
    float: right;
    background: 0 0;
    border: none;
    border: 1px solid #1076f7;
    border-radius: 2px;
    box-shadow: none;
    font-size: 14px;
    color: #1076f7;
    cursor: pointer;
    margin: 0;
    padding: 6px 12px;
    text-transform: lowercase;
    width: auto;

    &:hover {
      background: #1076f7;
      color: #fff;
    }

    & span {
      font-weight: 700;
    }

    @media screen and (min-width: 23.44rem) {
      margin: 0 0 0 15px;
    }
  }

  & #link a {
    border-radius: 2px;
    color: #ff2239;
    margin: 2.5rem auto 0;
    max-width: 380px;
    position: relative;
    word-break: break-all;

    &:hover {
      color: #002553;
    }
  }
}

.result .links li div {
  border: 1px solid #e6e6e7;
  margin-bottom: 0;
  margin-top: 0;
}

.links {
  & li:nth-child(1) div {
    margin-top: 0.94rem;
  }

  & li:last-child div {
    margin-bottom: 0.94rem;
  }
}

.result ul {
  & li:nth-child(1) div {
    margin-top: 0.31rem;
  }

  & li:last-child div {
    margin-bottom: 0;
  }
}

p.original_link {
  margin-bottom: 0.375rem;

  & a {
    color: rgba(118, 140, 161, 0.65);

    &:hover {
      color: #1076f7;
    }
  }
}

.link {
  display: block;

  @media screen and (min-width: 23.44rem) {
    display: inline-block;
  }
}

.short_link {
  font-size: 0.9rem;
  font-weight: 700;
}
</style>
