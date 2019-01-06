//This event is called from the LoginPage to be executed, then is sent to api, so here the credentials are being defined to the api post or get
export const AuthAction =(credentials)=>{
    return{
        type:'AUTH',
        credentials:credentials
    }
}

export const SignupAction = (params) => {
    return {
        type: 'SIGNUP',
        params: params
    }
};//Here it makes the call to the server
