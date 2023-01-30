import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async ({ userId }, { rejectWithValue }) => {
    try {
    } catch (error) {
      let errorData;
      switch (error.code) {
        case "auth/email-already-in-use":
          errorData = "Этот email уже используется в системе!";
          break;
        case "auth/weak-password":
          errorData = "Пароль слишком лёгкий. Не менее 6 символов";
          break;

        default:
          errorData = "Неизвестная ошибка. Обратитесь к администратору!";
          break;
      }
      return rejectWithValue(errorData);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ password, email }, { rejectWithValue }) => {
    try {
      const data = {
        role: "user",
      };

      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      ).then((userCredential) => {
        // Signed in
        const serverUser = userCredential.user;
        return {
          id: serverUser.uid,
          email: serverUser.email,
          displayName: serverUser.providerData.displayName,
          photoURL: serverUser.providerData.photoURL,
        };
      });

      await setDoc(doc(db, "users", user.id), data);

      return { ...user, ...data };
    } catch (error) {
      let errorData;
      console.log(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          errorData = "Этот email уже используется в системе!";
          break;
        case "auth/weak-password":
          errorData = "Пароль слишком лёгкий. Не менее 6 символов";
          break;

        default:
          errorData = "Неизвестная ошибка. Обратитесь к администратору!";
          break;
      }
      return rejectWithValue(errorData);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          // Signed in
          const serverUser = userCredential.user;
          return {
            id: serverUser.uid,
            email: serverUser.email,
            displayName: serverUser.providerData[0].displayName,
            photoURL: serverUser.providerData[0].photoURL,
          };
        }
      );

      const userData = await getDoc(doc(db, "users", user.id));
      if (userData.exists()) {
        return { ...user, ...userData.data() };
      }

      return user;
    } catch (error) {
      let errorData;
      switch (error.code) {
        case "auth/user-not-found":
          errorData =
            "Такого пользователя нет в системе. Проверьте введенный Email!";
          break;
        case "auth/wrong-password":
          errorData = "Пароль неверный. Проверьте введенный пароль!";
          break;

        default:
          errorData = "Неизвестная ошибка. Обратитесь к администратору!";
          break;
      }
      return rejectWithValue(errorData);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/serverLogoutUser",
  async () => {
    let result;
    await signOut(auth)
      .then(() => {
        result = true;
      })
      .catch((error) => {
        result = false;
      });
    return result;
  }
);

// {
//   "uid": "VFEoIGm9jiYl8yRD7rh48pzPLk52",
//   "email": "8168620@gmail.com",
//   "emailVerified": false,
//   "isAnonymous": false,
//   "providerData": [
//       {
//           "providerId": "password",
//           "uid": "8168620@gmail.com",
//           "displayName": null,
//           "email": "8168620@gmail.com",
//           "phoneNumber": null,
//           "photoURL": null
//       }
//   ],
//   "stsTokenManager": {
//       "refreshToken": "AOkPPWRRF-dWE3u9l-U6_qFVxRvFX9sZpXM5_lYTxkRNGZ0T5hqMLv8aGSzxidF1-_PHlHZVY_cGfqco5H6FrLM3Eh6RttLk9md2qZZTXqK3EncsSGhsLmyUjcbl3cLfOR0hF7MjObCraSS7eciKmoTjbBTuFWrSuSHeiFV1m6NK_aV0sdNCkvq2nxgRNSVCqelvjtTiJqXW",
//       "accessToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwNTU5YzU5MDgzZDc3YWI2NDUxOThiNTIxZmM4ZmVmZmVlZmJkNjIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc2VhZ29uLXJ1IiwiYXVkIjoic2VhZ29uLXJ1IiwiYXV0aF90aW1lIjoxNjc0Mzg3MjE4LCJ1c2VyX2lkIjoiVkZFb0lHbTlqaVlsOHlSRDdyaDQ4cHpQTGs1MiIsInN1YiI6IlZGRW9JR205amlZbDh5UkQ3cmg0OHB6UExrNTIiLCJpYXQiOjE2NzQzODcyMTgsImV4cCI6MTY3NDM5MDgxOCwiZW1haWwiOiI4MTY4NjIwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyI4MTY4NjIwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.JxAxdAVFQdlVKzMDOQcjHlvPJqB2XQ_Qd4yIusCxWPNRdLINui5fzBj4LME4w5COc-TmC4iv0ZkxDywIb1pzkXK5z3mlEz04mbS_IMw96mRhi3Iq4Ux-F-JoDslZakFAu3BKswh1tvJOZI6CUydiNF50vc0l0xi1xESPkpkd_oqXGNbR0djPm4hFxusz_iNVKMxm4OOwzg0h_L9Ak4g8N1LBmywqB66-nwFF_VwjFGswebG19GNbUTmDcJOXHS9HhYHohZ-YJ88x610nOukm9nejeJQ1CEUCY94apK05sstIgnPTgm6owoWG_GFAFn7ckWPg8Sf-ipoRMp9CQgclVQ",
//       "expirationTime": 1674390818482
//   },
//   "createdAt": "1674387218578",
//   "lastLoginAt": "1674387218578",
//   "apiKey": "AIzaSyATRtQGeI4pL7j-a3URxykLq9m8LHjqcyk",
//   "appName": "[DEFAULT]"
// }
