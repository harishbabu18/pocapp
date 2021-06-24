import {FETCH_USERS_REQUEST,FETCH_USERS_SUCCESS,FETCH_USERS_FAILURE} from './userType' 
import axios from 'axios'
import SERVER_URL from "../../config";


 const fetchUsersRequest = () => {
    return{
        type:FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess = users => {
    return{
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}

const fetchUsersFilterSuccess = users => {
    return{
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}

const fetchUsersFailure = error => {
    return{
        type:FETCH_USERS_FAILURE,
        payload:error
        
    }
}
export const fetchUsers = (filter) => {
    return (dispatch) => {
        dispatch(fetchUsersRequest)
        axios.post( SERVER_URL +
            "/customer/filter",filter)
        .then(response => {
            const users = response.data
            dispatch(fetchUsersSuccess(users))
        }).catch(error => {
            const errorMsg = error.message
            dispatch(fetchUsersFailure(errorMsg))
        })
    }

}