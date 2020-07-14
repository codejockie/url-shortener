<template>
  <div id="app">
    <header class="app_header">
      <div class="container">
        <div id="nav">
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link>
        </div>
      </div>
    </header>
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.app_header {
  color: #fff;
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  float: left;
  width: 100%;
  height: 70px;
  background-color: #002553;
  border-bottom: 1px solid rgba(255, 255, 255, 0.075);
  transform: translate(0px, 0%);
  transition: all 0.25s linear;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #fff;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  & a:not(:last-child)::after {
    color: #fff;
    content: "|";
    padding: 20px 5px;
  }
}

input:focus,
input:active,
button:focus,
button:active {
  outline: none;
}
</style>
