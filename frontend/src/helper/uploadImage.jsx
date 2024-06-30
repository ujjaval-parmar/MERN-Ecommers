const url = `https://api.cloudinary.com/v1_1/dpxxfb4dv/image/upload`


const uploadImage = async(image)=>{

    const formData = new FormData();

    formData.append('file', image);
    formData.append('upload_preset', 'mern-ecommerce' )

    const response = await fetch(url,{
        method: 'POST',
        body: formData

    })

    return response;
};


export default uploadImage;