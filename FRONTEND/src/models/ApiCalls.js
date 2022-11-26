 async function addDocument(formdata){
    /**
     * @params 
     * formdata -> get form details
     * Usecase:  Send document details and inserts to Document DB at server end and collect the response from server.
     */
    const response = await fetch("http://127.0.0.1:5000/upload",{
                method: "POST",
                body: formdata
            })
    const res_json = await response.json()
    console.log("Data fetched from /upload route path")
    console.log(res_json)
    return (res_json);
}

 async function uploadIPFS(id){
    /**
     * 
     */
    const url = `http://127.0.0.1:5000/uploadIPFS?id=${id}`
    const response = await fetch(url,{
                method: "GET"
            })
    const res_json = await response.json()
    console.log("Data fetched from /uploadIPFS route path")
    console.log(res_json)
    return res_json
}

export {addDocument, uploadIPFS}