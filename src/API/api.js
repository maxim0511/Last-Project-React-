import * as axios from "axios";


const instance = axios.create({
    withCredentials:true,
})
export const contentAPI = {
    content: (currentPage,pageSize,New,popular)=> {
        return instance.get(`api/photos?new=${New}&popular=${popular}&page=${currentPage}&limit=${pageSize}`)
                
    }
}
export const loginAPI ={ 
    firstEntrance () {
        return instance.post(`api/clients`,{
            name:'string',
            "allowedGrantTypes": [
                "password", "refresh_token"
              ]           
        })
    },
    login (id,Username,password,secret ) {
        return instance.get('oauth/v2/token',{
            params:{
              'grant_type':'password',
              'client_id':id,
              'client_secret':secret,
              'username':Username,
              'password':password
            }
          })
    },
}
export const regAPI = {
    registration (email,phone,fullName,password,username) {
        return instance.post(`api/users`, {
            email,
            phone,
            fullName,
            password,
            username,
            birthday: "2022-02-20T11:49:36.135Z",
            roles: [
              ''
            ]
        })
    }
}
export const AddImgAPI = {
    postImg (file){
        const formData = new FormData();
        formData.append('file',file)
        return instance.post(`api/media_objects`,
                formData,{
                    headers:{ Authorization:`Bearer ${localStorage.getItem('accesstoken')} `}
                }
        )
    },
    postNewImg (nameImg,description,New,Popular,idFile) {
        const data={
            'name':nameImg,
            'description':description,
            'new':New,
            'popular':Popular,
            image:`/api/media_objects/${idFile}`
            };
        return instance.post(`api/photos`,
            data,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem('accesstoken')} `,
                }
            }
        )
    },
}
export const tokenAPI = {
    getNewToken (idPers,refreshtoken,secret) {
        return instance.get('oauth/v2/token',{
            params : {
                'client_id':idPers,
                'grant_type':'refresh_token',
                'refresh_token':refreshtoken,
                'client_secret':secret
            }
        })
    }
}