<template>
  <div class="bg-container">
    <div class="container">
      <div class="flex">
        <div class="card-container">
          <v-card-title primary-title>
            Welcome to our new gen e-commerge shopping online !
          </v-card-title>
          <v-spacer></v-spacer>
          <div>
            <v-progress-linear
              indeterminate
              reverse
              color="black"
              height="20"
              style="width: 400px"
            ></v-progress-linear>
          </div>
          <v-spacer></v-spacer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  width: 100%;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 50%;
  padding: 30px;
  border: 1px solid gray;
  border-radius: 5px;
  box-shadow: 0px 0px 10px black;
  background-color: white;
  padding: 20px;
}
.card-title {
  font-size: 30px;
}
/* .bg-container {
  background-image: url("../../public/img/panda-vector.jpg");
  background-repeat: repeat;
  background-size: contain;
} */
</style>
