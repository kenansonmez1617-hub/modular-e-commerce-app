const fetchProduct = async () => {
    try{
        const response = await fetch('../db.json')
        const data = await response.json()

        return data.products
    } catch(eror) {
      console.log(error)
      return []
    }
}


export default fetchProduct