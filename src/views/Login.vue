<template>
  <div class="login">
    <div class="navbar">
      <a @click="homepage">Home</a>      
      <a @click="allrecipes">All Recipes</a>
      <a @click="favorites">Favorite Recipes</a>  
      <!-- <a2 id="title"> RandomRecipe </a2> -->
      <a id="login" @click="login">Login</a>
    </div>  
    <h1>Signup or login now to save some recipes</h1>
    <!--Login section below-->
    <section>
      <div id="loginpanel">
        <input type="text" v-model="u_email"
          placeholder="Enter your email">
        <div />
        <input type="password" v-model="u_pass"
          placeholder="Enter your password">
        <br>
        <br>
        <div id="loginByEmail">
          <button :disabled="!isValidInput"
            @click="createAccount">Signup</button>
          <button :disabled="!isValidInput"
            @click="withEmail">Login</button>
        </div>
        <button :disabled="u_email.length === 0" @click="resetPass">Reset
            Password</button>
        <div>
        </div>
        <div id="withProvider">
          <button @click="withGMail">Google</button>
        </div>
      </div>
    </section>
    <span id="msgbox" v-show="message.length > 0">{{message}}</span>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  sendEmailVerification,
  signOut,
  signInWithRedirect,
  sendPasswordResetEmail,
} from "firebase/auth";

@Component
export default class Homepage extends Vue {
  homepage(): void{
    this.$router.replace({path: '/'})
  }
  login(): void{
    //already on this page
  }
  allrecipes(): void{
    this.$router.push({path: '/allrecipes'})
  }
  favorites(): void{
    this.$router.push({path: '/favorites'})
  }
  u_email = "";
  u_pass = "";
  message = "";
  auth: Auth | null = null;
  emailVerification = false;

  get isValidInput(): boolean {
    return this.u_email.length > 0 && this.u_pass.length > 0;
  }

  mounted(): void {
    this.auth = getAuth();
  }

  showMessage(txt: string) {
    this.message = txt;

    // The message will automatically disappear after 5 seconds
    setTimeout(() => {
      this.message = "";
    }, 5000);
  }

  createAccount(): void {
    createUserWithEmailAndPassword(this.auth!, this.u_email, this.u_pass)
      .then(async (cr: UserCredential) => {
        
          await sendEmailVerification(cr.user);
          await signOut(this.auth!);
          this.showMessage(
            "An email verification has been sent to " + cr.user.email
          );
        
      })
      .catch((err: any) => {
        this.showMessage(`Unable to create account ${err}`);
      });
  }

  resetPass(): void {
    sendPasswordResetEmail(this.auth!, this.u_email)
      .then(() => {
        this.showMessage(
          `A password reset link has been sent to ${this.u_email}`
        );
      })
      .catch((err: any) => {
        this.showMessage(`Unable to reset password ${err}`);
      });
  }
  withEmail(): void {
    signInWithEmailAndPassword(this.auth!, this.u_email, this.u_pass)
      .then(async (cr: UserCredential) => {
        if (cr.user.emailVerified)
          this.$router.push({ path: "/favorites" });
        else {
          this.showMessage("You must first verify your email");
          await signOut(this.auth!);
        }
      })
      .catch((err: any) => {
        this.showMessage(`Unable to login ${err}`);
      });
  }

  withGMail(): void {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth!, provider)
      .then((cred: UserCredential) => {
        console.log("Yes, logged in");

        // Move to the favorites page
        this.$router.push({ path: "/favorites" });
      })
      .catch((err: any) => {
        this.showMessage(`Unable to login with GMail ${err}`);
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login > * {
  text-align: center;
}

.navbar {
  overflow: hidden;
  background-color: #333;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}

/* Links inside the navbar */
.navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 16px 16px;
  text-decoration: none;
}

.navbar a2 {
  float: center;
  display: block;
  color: #f2f2f2;
  text-align: center;
  font-size: 30px;
  padding: 8px 8px;
  text-decoration: none;
}

#login {
  float: right;
}

/* Change background on mouse-over */
.navbar a:hover {
  background: #ddd;
  color: black;
}

section{
  margin-left: auto;
  margin-right: auto;
  background: darkgray;
  width: fit-content;
  align-self: center;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  outline-color: black;
  outline-width: 2px;
  outline-style: solid;
}
</style>
