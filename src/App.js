import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Router from './router';
import { authentication } from './store';
import Notiflix from 'notiflix';

function App() {
  const [auth, setAuth] = useRecoilState(authentication);
  const [mounted, setMounted] = useState(false);
  const getUser = async () => {
    try {
      let response = await axios.get('/me')
      setAuth({
        check: true,
        user: response.data.data
      })
    } catch (e) {
      setAuth({
        check: false,
        user: []
      })
    }
    setMounted(true);
  }

  useEffect(() => {
    getUser();
  }, [auth.check, mounted]);

  if (!mounted) {
    Notiflix.Loading.standard('', {
      backgroundColor: 'white',
    });
  }
  Notiflix.Loading.remove();
  return <Router />


}

export default App;
