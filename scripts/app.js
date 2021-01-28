import Note from "./Note.js"

const myApp = Vue.createApp({
    data(){
        return{
            notes: [],
            createMode: false
            //editMode: false
        }
    },
    created: function(){
        console.log("App created")
        Note.fetchAll((data) =>
                         {
                            this.notes = data
                            console.log("Notes1=",this.notes)
                        })
    },
    methods:{
        toggleCreateMode: function(){
            this.createMode = !this.createMode
        },
        addNote: function(event){
            const formData = new FormData(event.target)
            const note = new Note(formData.get("title"),formData.get("description"))
            const postAndGet = async () => {
                const saving = await note.save()
                Note.fetchAll((data) =>
                                {
                                    this.notes = data
                                    console.log("Notes2=",this.notes)
                                })
            }
            postAndGet()
            this.createMode = false
        }
    }
})

myApp.mount("body")