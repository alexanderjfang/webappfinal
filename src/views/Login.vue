<template>
  <div class="login">
    <div class="navbar">
      <a @click="homepage">Home</a>      
      <a @click="allrecipes">All Recipes</a>
      <a @click="favorites">Favorite Recipes</a>  
      <!-- <a2 id="title"> RandomRecipe </a2> -->
      <a v-if="!loggedin" id="login" @click="login">Login</a>
      <a v-if="loggedin" id="login" @click="logout">Logout</a>
    </div>  
    <h1>Sign up or log in now to save recipes</h1>
    <!--Login section below-->
    <section>
      <div id="loginpanel">
        <input type="text" v-model="u_email"
          placeholder="Enter your email">
        <div />
        <br>
        <input type="password" v-model="u_pass"
          placeholder="Enter your password">
        <br>
        <br>
        <div id="loginByEmail">
          <button id="signup" :disabled="!isValidInput"
            @click="createAccount">Sign Up</button>
          <button id="email" :disabled="!isValidInput"
            @click="withEmail">Login</button>
          <br>
        </div>
        <br>
        <div id="withProvider">
          <button id="gmail" @click="withGMail">Google Login</button>
        </div>
        <div>
        </div>
        <br>
        <button id="reset" :disabled="u_email.length === 0" @click="resetPass">Reset
            Password</button>
      </div>
    </section>
    <span id="msgbox" v-show="message.length > 0">{{message}}</span>
    <div class = "navbarbottom">
      <a @click="contactUs">Contact Us</a>
      <a @click="aboutUs">About Us</a>
    </div>
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
  sendEmailVerification,
  signOut,
  sendPasswordResetEmail,
  User,
} from "firebase/auth";
@Component
export default class Homepage extends Vue {
  //LOGOUT LOGIC
  auth: Auth | null = null;
  loggedin = false;
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
  aboutUs(): void{
    this.$router.push({path: '/aboutUs'})
  }
  contactUs(): void{
    this.$router.push({path: '/contactUs'})
  }
  u_email = "";
  u_pass = "";
  message = "";
  emailVerification = false;
  get isValidInput(): boolean {
    return this.u_email.length > 0 && this.u_pass.length > 0;
  }
  //LOGOUT LOGIC
  logout(): void {
    if (this.auth) signOut(this.auth);
    this.loggedin=false;
    //console.log("logged out")
  }
  mounted(): void {
    //LOGOUT LOGIC
    this.auth = getAuth();
    const user = this.auth.currentUser as User;
    const uid: string = this.auth.currentUser?.uid as string;
    if(uid==null){
      //user is not logged in
    }
    else{
      //user is logged in
      this.loggedin = true
    }
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
        //console.log("Yes, logged in");
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
  background-color: rgb(46, 93, 146);
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}
/* Links inside the navbar */
.home > * {
  text-align: center;
}
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
  width: fit-content;
  align-self: center;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  outline-color: rgb(46, 93, 146);
  outline-width: 2px;
  outline-style: solid;
  background-color:rgb(226, 226, 226);
  border-radius: 5px;
}
.navbarbottom {
  overflow: hidden;
  background-color: rgb(46, 93, 146);
  position: fixed; /* Set the navbar to fixed position */
  bottom: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}
.navbarbottom a{
  float: right;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 16px 16px;
  text-decoration: none;
}
.navbarbottom a:hover {
  background: #ddd;
  color: black;
}
button{
  border-color: rgb(46, 93, 146);
  background-color: rgb(255, 255, 255);
  color: black;
  border-radius: 3px;
}
#signup{
  width: 45%;
  float: left;
}
#gmail{
  width:100%;
}
#email{
  width:45%;
  float: right;
}
#reset{
 width: 100%;
}
</style>