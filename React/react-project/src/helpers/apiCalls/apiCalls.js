import apiUrls from '../appURLs'
import headers from './headers'
import React from 'react';


export default  {
    post:(data,url,isAuth)=>{
        console.log('api post')
       let header=headers(isAuth);

        return new Promise((resolve,reject)=>{
            let options = { method: 'POST',
                dataType: 'json',

                headers: header,

                body:JSON.stringify(data),
            };

            window.fetch(apiUrls.baseAppUrl+url,options)
                .then((res)=>{
                    return  res.json()
                })
                .then((json)=>{
                    console.log(json)
                    resolve(json)
                })
                .catch(error=>reject(error))

        })
    },
    get:(url,isAuth)=>{
        console.log('api get')
        let header=headers(isAuth);

        return new Promise((resolve,reject)=>{
            let options = { method: 'GET',
                dataType: 'json',
                headers: header,
            };

            window.fetch(apiUrls.baseAppUrl+url,options)
                .then((res)=>{
                    return  res.json()
                })
                .then((json)=>{
                    console.log(json)
                    resolve(json)
                })
                .catch(error=>reject(error))

        })
    },
}