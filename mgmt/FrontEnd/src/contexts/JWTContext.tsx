import React, { createContext, useEffect, useReducer, useState } from 'react';

import {bake_cookie,} from 'sfcookies';
// third-party
import { Chance } from 'chance';
import jwtDecode from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';
import { UserProfile } from 'types/auth';

// project import
import Loader from 'components/Loader';
import axios from 'utils/axios';
import { KeyedObject } from 'types/root';
import { AuthProps, JWTContextType } from 'types/auth';
import { keyBy, method } from 'lodash';
import Alert from 'themes/overrides/Alert';

const chance = new Chance();

// constant
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded: KeyedObject = jwtDecode(serviceToken);
  //alert(JSON.stringify(jwtDecode(serviceToken)))
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        const userEmail = window.localStorage.getItem('userEmail');


        if (serviceToken && verifyToken(serviceToken) && userEmail != "") {
          setSession(serviceToken);
          bake_cookie("sessionToken" , serviceToken)
          //alert(serviceToken)
            try {
              const response = await fetch('http://localhost:3001/validate', {
              method: 'GET',
              credentials: 'include',

            });
            //alert("After validate")
            if (!response.ok) {
              throw new Error(`Error! status: ${response.status}`);
              
            }

            else {
              const data = await response.text();
              if (data != "guest"){
                const testuser = JSON.parse((data))

              var userDetails = testuser.message
              //alert(JSON.stringify(userDetails))

              const user: UserProfile = {
                id: userDetails.Id,
                email: userDetails.Email,
                name: userDetails.Firstname + " " + userDetails.Lastname,
            }

              dispatch({
                type: LOGIN,
                payload: {
                  isLoggedIn: true,
                  user
                }
              });
              }
              
              //alert("Logged in")
            } 

            } catch (err){
            alert(err)
              console.error(err);
            }
            
 

        } else {
          dispatch({
            type: LOGOUT
          });

        }
      } catch (err) {
        alert(err)
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  /*
  const login = async (email: string, password: string) => {
    const response = await axios.post('api/account/login', { email, password });
    const { serviceToken, user } = response.data;
    setSession(serviceToken);
    //alert(user.id) // 5e86809283e28b96d2d38537
    //alert(user.email) // info@codedthemes.com
    //alert(user.avatar) // undefined
    //alert(user.image) // undefined
    //alert(user.name) // JWT User
    //alert(user.role) // undefined
    //alert(user.tier) // undefined

    alert(serviceToken)
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };
*/


  const login = async (email: string, password: string) => {
      const loginResponse = await fetch('http://localhost:3001/login', {
        method: 'POST',
        //credentials: 'include',
        body: JSON.stringify({ email, password })
      });
    
      const content = await loginResponse.json();
      const userDetails = content.user

      
      //id?: string;
      //email?: string;
      //avatar?: string;
      //image?: string;
      //name?: string;
      //role?: string;
      //tier?: string;
      

      const user: UserProfile = {
          id: userDetails.Id,
          email: userDetails.Email,
          name: userDetails.Firstname + " " + userDetails.Lastname,
      }
      //alert(JSON.stringify(user))

      localStorage.setItem('userEmail', email);

      setSession(content.token);
      bake_cookie("sessionToken" , content.token)
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user
        }
      });


  };
  
  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await fetch('http://localhost:3001/register', {
    method:'POST',
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName
    })
  });

  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async (email: string) => {};

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
