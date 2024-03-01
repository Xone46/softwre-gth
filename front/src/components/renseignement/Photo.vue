<template>
    <div class="photos">

        <h1>Veuillez entrer une photo</h1>

        <input  type="file" multiple="multiple" class="form-control" placeholder="Format Photo" ref="file" @change="previewFile"/>

        <div class="sauvegarde">
            <button @click="sauvegarde">Sauvegarde de Secours</button>
        </div>

    </div>
</template>
  
<script>
import Photos from "@/requests/Photos"
export default {
    name: 'photo-component',
    data() {
        return {
            file : null
        }
    },

    components: {
    },

    props : {
        observateurId : String
    },

    methods: {

        previewFile() {
            this.file = this.$refs.file.files[0];
        },


        sauvegarde() {
            Photos.create(this.file, this.observateurId, this.observateurId)
            .then((result) => {
                console.log(result)
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },

    created() {

    }
}
</script>
  
<style scoped>
.photos {
    width: 100%;
    margin-top: 10px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
}

.photos input {
    width: 60%;
    height: 150px;
    background-color: white;
    border: 3px solid #04AA6D;
    border-radius: 10px;
    font-size: xx-large;
    cursor: pointer;
    color: #04AA6D;
}


.sauvegarde {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
    margin-top: 40px;
}

.sauvegarde button {
    background-color: #040faa;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}
</style>