import { initializeApp } from 'firebase/app'
import { connectAuthEmulator, getAuth } from 'firebase/auth'



export default (context, inject) => {

  const firebaseApp = initializeApp(
    {
      apiKey: context.$config.FIREBASE_KEY,
      authDomain: context.$config.FIREBASE_AUTHDOMAIN,
      projectId: context.$config.FIREBASE_PROJECT_ID,
      storageBucket: context.$config.FIREBASE_STORAGE_BUCKET,
      appId: process.env.appId,
      measurementId: context.$config.FIREBASE_MEASUREMENT_ID
    }
  )
  const firebaseAuth = getAuth()
  connectAuthEmulator(firebaseAuth, 'http://localhost:9099')

  firebaseAuth.onAuthStateChanged(async (authUser) => {
    if (authUser) {
      const claims = (await authUser.getIdTokenResult()).claims
      context.store.dispatch('onAuthStateChanged', { authUser, claims })
    } else {
      context.store.dispatch('onAuthStateChanged', { authUser: null })
    }
  })

  const $fire = {
    app: firebaseApp,
    auth: firebaseAuth
  }
  inject('fire', $fire)
}
