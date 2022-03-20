<template>
  <div>
    <v-content>
      <v-card width="500" class="mx-auto mt-9">
        <v-card-title>Login</v-card-title>
        <v-card-text>
          <v-text-field
            label="E-mail"
            prepend-icon="mdi-account-circle"
            v-model="email"
          />
          <v-text-field
            label="Password"
            :type="showPassword ? 'text' : 'password'"
            prepend-icon="mdi-lock"
            @click:append="showPassword = !showPassword"
            v-model="password"
          />
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="error" @click="logout()"
            >logout
            <v-icon right dark> mdi-logout</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading3"
            :disabled="loading3"
            color="teal"
            class="ma-2 white--text"
            @click="login()((loader = 'loading3'))"
          >
            Login
            <v-icon left dark> mdi-login-variant</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-content>
  </div>
</template>

<script>
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../plugins/firebaseInit";

export default {
  data() {
    return {
      email: "",
      password: "",
      loader: null,
      loading3: false,
    };
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];

      setTimeout(() => (this[l] = false), 3000);

      this.loader = null;
    },
  },

  methods: {
    login() {
      //const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("User=" + user);
          // loginผ่านไปหน้าabout
          //this.$router.replace("/home");
          // ...
          this.email = user.email;
          this.$router.push("/Home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + " " + errorMessage);
        });
    },
  },
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
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
