<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { TailwindDarkFix } from "src/extensions/tailwindcss/dark-fix";
import { Dark } from "quasar";
export default defineComponent({
  name: "App",
  setup() {
    TailwindDarkFix();
    Dark.set(true);
  },
});
</script>
