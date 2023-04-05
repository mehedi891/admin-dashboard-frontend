import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



function ResetPassword() {
    const navigate = useNavigate();
    const handleResetPassword = (e) =>{
        e.preventDefault();

        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        const userObj = {password};

        fetch(`http://localhost:3001/api/user/${email}`,{
            method:'PUT',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(userObj)
        })
        .then(res => res.json())
        .then(data => {
          console.log(data.acknowledged)
           if(data.acknowledged === true){
            toast.success('Password reset Success');
            navigate('/');
        }
        else{
            toast.error('Something wrong')
        }
        })
        .catch(error =>{
            console.log(error);
        })   

    }
  return (
    <div className='login-container'>
        <form className="loginForm" onSubmit={handleResetPassword}>
                <div className="emailPass flex-column">
                    <h4>Email</h4>
                    <input type="text" name="email" placeholder='enter user email' required/>
                    <h4>New Password</h4>
                    <input type="password" name="password" placeholder='enter new password' required/>
                </div>
               
                <div className="loginBtnDiv">
                <input type="submit" className='btn loginBtn' value="Reset Password" />
                </div>
            </form>
    </div>
  )
}

export default ResetPassword