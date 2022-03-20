<template>
  <v-card :loading="loading" class="mx-auto my-16" max-width="374">
    <v-card-title>
      <v-icon large left> mdi-desktop-classic </v-icon>
      <span class="text-h6 font-weight-light">Finalproject</span>
    </v-card-title>

    <v-card-text class="text-h5 font-weight-bold">
      <v-img
        src="data:image/png;base64,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"
      ></v-img>
    </v-card-text>
    <v-card-text class="text-h5 font-weight-bold">
      "เว็บไซร์จัดทำเพื่อการศึกษาเท่านั้น"
    </v-card-text>

    <v-card-actions>
      <v-list-item class="grow">
        <v-list-item-avatar color="grey darken-3">
          <v-img
            class="elevation-6"
            alt=""
            src="https://scontent.fcnx3-1.fna.fbcdn.net/v/t1.6435-9/80769984_3479379522104688_3450220307745341440_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=VqForChTlcoAX9cnx7y&_nc_ht=scontent.fcnx3-1.fna&oh=00_AT9Ej4Uza5hlrkgBSY0cAaz44E_yspFyk6wlONaZTfg5Ug&oe=625B721E"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Teerawat Boonpoom</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<script>
import { auth } from "../plugins/firebaseInit";
import { signOut } from "firebase/auth";
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      //const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log("logout");
          this.$router.replace("/");
          alert("Logout");
          // Sign-out successful.
        })
        .catch((error) => {
          console.log(error);
          // An error happened.
        });
    },
  },
};
</script>

<style></style>
