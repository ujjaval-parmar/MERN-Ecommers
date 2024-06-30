export const apiGanerator = async(api_url, method, credentials, body)=>{
    const fetchApi = await fetch(`/api/${api_url}`,{
        method: method,
        "Access-Control-Allow-Origin": "*",
        credentials: credentials ? 'include' : 'omit',
        body: body ? JSON.stringify(body) : undefined,
        headers: {
            'Content-Type': 'application/json',
        }
    })

    return fetchApi;


}

