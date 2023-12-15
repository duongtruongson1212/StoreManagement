import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom'
import { login } from "../Redux/Actions/UserActions";
import Message from '../components/LoadingError/Error';
import Loading from '../components/LoadingError/Loading';
import Toast from '../components/LoadingError/Toast';
const Login = () => {
  window.scrollTo(0,0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const userLogin = useSelector(state => state.userLogin);
  const {error, loading, userInfo} = userLogin;

  useEffect(() =>{
    if(userInfo){
      history.push('/')
    }
  }, [userInfo, history])
  
  const handleSubmit =  (e) =>{
    e.preventDefault();
    dispatch(login(email, password));
  }
  return (
    <>
    <Toast/>
    <div className="header">

      <div className="inner-header flex">
        <div
          className="card shadow mx-auto"
          style={{ maxWidth: "380px", marginTop: "100px", width: 'inherit' }}
        >
          <div className="card-body">
            {
              error && (
                <Message variant="alert-danger">
                    {
                      error
                    }
                </Message>
              )
            }
            {
              loading && <Loading />
            }
            <h4 className="card-title mb-4 text-center text-dark">Đăng nhập</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input onChange={e => setEmail(e.target.value)}
                  className="form-control"
                  placeholder="Nhập email"
                  type="email"
                  value={email}
                />
              </div>
              <div className="mb-3">
                <input onChange={e => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Nhập mật khẩu"
                  type="password"
                  value={password}
                />
              </div>

              <div className="mb-4">
                <button type="submit" className="btn btn-primary w-100">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div>
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
    </>
  );
};

export default Login;
