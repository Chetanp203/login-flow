import React, { useEffect, useState } from 'react';
import GoogleLogin from 'react-google-login';

const Google = () => {

    function Success(res) {
        console.log(res, "success")
    }
    function Error(res) {
        console.log(res, "failure")
    }

    return (
        <div>
            <GoogleLogin
                clientId="770991335968-aau5uhjps9kfuqcn0pirv0ld7412htbd.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={Success}
                onFailure={Error}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
};

export default Google;