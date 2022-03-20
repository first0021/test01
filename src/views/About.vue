<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="16" sm="2" md="8" lg="2">
        <v-btn @click="logout()" class="red darken-4"
          >logout
          <v-icon right dark> mdi-logout</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ลำดับ</th>
          <th scope="col">ชื่อ</th>
          <th scope="col">นามสกุล</th>
          <th scope="col">รหัสประชาชน</th>
          <th scope="col">E-mail</th>
          <th scope="col">password</th>
          <th scope="col">นํ้าหนัก</th>
          <th scope="col">ส่วนสูง</th>
          <th scope="col">ที่อยู่</th>
        </tr>
      </thead>
      <tbody v-for="(item, index) in table" :key="index">
        <tr>
          <th scope="row">{{ index }}</th>
          <td>{{ item.data.name }}</td>
          <td>{{ item.data.lastname }}</td>
          <td>{{ item.data.atk }}</td>
          <td>{{ item.data.mail }}</td>
          <td>{{ item.data.number }}</td>
          <td>{{ item.data.wight }}</td>
          <td>{{ item.data.height }}</td>
          <td>{{ item.data.adress }}</td>
          <td>
            <v-btn color="error" @click="deleteData(item.id)">delete</v-btn>
          </td>
        </tr>
      </tbody>
    </table>
  </v-container>
</template>
<script>
import { db } from "../plugins/firebaseInit";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../plugins/firebaseInit";

export default {
  data() {
    return {
      dbData: "",
      nameC: " ",
      lastnameC: "",
      checkedNames: "",
      mails: "",
      numberphone: "",
      table: [],
      uid: "",
      email: "",
      address: "",
      uid2: "Kfc9EHJLSsO8ypIS9MS2tOqlDWA2",
      wi: "",
      lol: "",
      addresss: "",
    };
  },
  mounted() {
    this.checklogin();
  },
  methods: {
    async addData() {
      try {
        const docRef = await addDoc(collection(db, "note"), {
          name: this.nameC,
          lastname: this.lastnameC,
          atk: this.checkedNames,
          mail: this.mails,
          number: this.numberphone,
          wight: this.wi,
          height: this.lol,
          adress: this.addresss,
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    async readData() {
      const q = query(collection(db, "note"));
      onSnapshot(q, (querySnapshot) => {
        this.table = [];
        querySnapshot.forEach((doc) => {
          this.table.push({ id: doc.id, data: doc.data() });
        });
        console.log("see data");
      });
    },
    checklogin() {
      onAuthStateChanged(auth, (user) => {
        if (user && user.uid == "ORjRMimVF4c0C6hoUsrH89qkIU92") {
          const uid = user.uid;
          console.log(uid);
          this.readData();

          //this.email = user.email;
        } else {
          this.$router.push("/");
          // User is signed out
          // ...กรณีไม่ได้login ให้เปลี่ยนไปหน้าlogin ก่อน
          alert("Adimn Screen");
        }
      });
    },
    /* addit() {
      this.additems.push({
        text: this.nameC,
      });
    },*/
    logout() {
      //const auth = getAuth();
      signOut(auth)
        .then(() => {
          alert("Logout success");
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
          console.log(error);
        });
    },
    async deleteData(id) {
      await deleteDoc(doc(db, "note", id));
    },
  },
};
</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
.trang {
  position: relative;
  top: 0px;
  left: 400px;
}
</style>
