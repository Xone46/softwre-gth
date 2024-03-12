<template>
    <div class="photos">

        <h1 v-if="!flagImg">Veuillez entrer une photo</h1>

        <p class="display-button" v-if="flagImg" @click="displayImage">Clique ici pour voir Image</p>
        <input  type="file" multiple="multiple" class="form-control" placeholder="Format Photo" ref="file" @change="previewFile"/>

        <div class="sauvegarde">
            <button v-if="!flagImg" @click="sauvegarde">Sauvegarde de Secours</button>
            <button v-if="flagImg" @click="modifier">Modifier</button>
        </div>

    </div>
</template>
  
<script>
import Photos from "@/requests/Photos"
export default {
    name: 'photo-component',
    data() {
        return {
            file : null,
            imgSrc : null,
            flagImg : false,
        }
    },

    components: {
    },

    props : {
        observateurId : String
    },

    methods: {

        displayImage() {
            Photos.displayImage(this.imgSrc)
            .then((result) => {
                var image = new Image();
                image.src = "data:image/jpg;base64," + result;
                document.body.appendChild(image);
            })
            .catch((error) => {
                console.log(error)
            });
        },

        previewFile() {
            this.file = this.$refs.file.files[0];
        },


        sauvegarde() {
            Photos.create(this.file, this.observateurId)
            .then((result) => {
                this.imgSrc = result.data.filename;
                this.flagImg = true;
            })
            .catch((error) => {
                console.log(error);
            });
        },

        modifier() {

            Photos.update(this.file, this.observateurId)
            .then((result) => {
                this.imgSrc = result.data.filename;
            })
            .catch((error) => {
                console.log(error);
            });
        }
    },

    created() {

            Photos.select(this.observateurId)
            .then((result) => {
                this.flagImg = true;
                this.imgSrc = result.data.img;
            })
            .catch((error) => {
                console.log(error);
            });
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
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
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

.display-button {
    background-color: #04AA6D;
    color: white;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    width: max-content;
}
</style>