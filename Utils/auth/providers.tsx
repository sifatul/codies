import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider} from "firebase/auth";


const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider()
// const googleScopes = [
//     // 'https://www.googleapis.com/auth/user.gender.read',
//     // 'https://www.googleapis.com/auth/userinfo.profile',
//     // 'https://www.googleapis.com/auth/user.birthday.read',
//     'https://www.googleapis.com/auth/user.emails.read'
// ]
// googleScopes.map(scope => googleProvider.addScope(scope))
googleProvider.setCustomParameters({
  prompt: 'select_account',
})

// githubProvider.setCustomParameters({
//   prompt: 'select_account',
// })

export { googleProvider, githubProvider }

