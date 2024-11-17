<template>
  <div class="containers">
    <div>
      <NavbarVue />
    </div>
    <div>
      <div class="content">
        <slot></slot>
      </div>
    </div>
    <div>
      <BottomBarVue />
    </div>
  </div>
</template>

<script>
import BottomBarVue from "@/components/Users/BottomBar.vue";
import NavbarVue from "@/components/Users/Navbar.vue";

export default {
  components: { NavbarVue, BottomBarVue },
};
</script>

<style>
/* @import '../assets/fonts.css'; */

.containers {
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background-color: rgb(228, 228, 228);
}
.content {
  padding: 20px 120px 20px 120px;
  height: 100%;
  width: 100%;
}
</style>
