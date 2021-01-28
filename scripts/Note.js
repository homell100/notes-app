const url = "https://vue-noteapp-eded2-default-rtdb.europe-west1.firebasedatabase.app/notes.json"

export default class Note{
    constructor(title, description){
        this.title = title,
        this.description = description
    }
    save(){
        async function postData(url="", data={}){
            const response = await fetch(url,{
                                            method: 'POST',
                                            headers:{
                                                'Content-Type':'application/json'
                                            },
                                            body: JSON.stringify(data)
                                        })
            return response.json()
        }
        postData(url, {title:this.title,description:this.description})
        .catch((err) => console.log(err))
    }
    static fetchAll(cb){
        fetch(url)
        .then(response => response.json())
        .then(data => cb(data))
        .catch((error) => console.log(error))
    }
}