import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import Search from './search'; // import the Search component

function SignInSignUp() {
    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');
    const [emailSignIn, setEmailSignIn] = useState('');
    const [passwordSignIn, setPasswordSignIn] = useState('');
    const [error, setError] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp);
      const user = userCredential.user;
      console.log(user);
      setLoggedIn(true); // set loggedIn state to true
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(emailSignIn, passwordSignIn);
      const user = userCredential.user;
      console.log(user);
      setLoggedIn(true); // set loggedIn state to true
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const userCredential = await firebase.auth().signInWithPopup(provider);
      const user = userCredential.user;
      console.log(user);
      setLoggedIn(true);
    } catch (error) {
      setError(error.message);
    }
  };

  // Render the Search component if loggedIn state is true
  if (loggedIn) {
    return <Search />;
  }

  // Render the sign up and sign in forms if loggedIn state is false
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <input type="email" value={emailSignUp} onChange={(e) => setEmailSignUp(e.target.value)} />
        <input type="password" value={passwordSignUp} onChange={(e) => setPasswordSignUp(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>

      <h2>Sign In</h2>
      <form onSubmit={handleSignIn}>
        <input type="email" value={emailSignIn} onChange={(e) => setEmailSignIn(e.target.value)} />
        <input type="password" value={passwordSignIn} onChange={(e) => setPasswordSignIn(e.target.value)} />
        <button type="submit">Sign In</button>
      </form>
      <br></br>
      <button onClick={handleGoogleSignIn}>Sign In with Google</button>


      {error && <p>{error}</p>}
    </div>
  );
}

export default SignInSignUp;
