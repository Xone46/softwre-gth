<template>
    <div class="photos">

        <h1 v-if="!flagReset">Veuillez entrer une photo</h1>

        <p class="display-button" v-if="flagReset" @click="displayImage">Clique ici pour voir Image</p>
        <input  type="file" multiple="multiple" class="form-control" placeholder="Format Photo" ref="file" @change="previewFile"/>

        <div v-if="!flagReset" class="sauvegarde">
            <button @click="sauvegarde">Téléverser </button>
        </div>

        <div v-if="flagReset" class="reset">
            <button @click="reset">Reset</button>
        </div>

    </div>
</template>
  
<script>
import Photos from "@/requests/accessoire_levage/famille_ac1/Photos.js"
export default {
    name: 'photo-component',
    data() {
        return {
            flagReset : false,
            file : null,
            imgSrc : null
        }
    },

    components: {
    },

    props : {
        observateurId : String
    },

    methods: {

        checkProperties(file) {
            if(file) {
                return true;
            } else {
                return false;
            }
        },

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

                if(result) {
                    this.imgSrc = result.filename;
                    this.flagReset = true;
                    this.$emit("changeColorPhoto_famille_ac1", this.checkProperties(this.file));
                }

            })
            .catch((error) => {
                console.log(error);
            });
        },

        reset() {
            Photos.reset(this.observateurId)
            .then((result) => {

                if(result.data) {
                    this.flagReset = false;
                    this.file = null;
                    this.imgSrc = null;
                    this.$emit("changeColorPhoto_famille_ac1", this.checkProperties(this.file));
                }

            })
            .catch((error) => {
                console.log(error);
            });
        }
    },

    created() {

            console.log("achraf")

            Photos.select(this.observateurId)
            .then((result) => {
                if(result.data.img != null) {
                    console.log(result.data)
                    this.flagReset = true;
                    this.flagImg = true;
                    this.imgSrc = result.data.img;
                    this.$emit("changeColorPhoto_famille_ac1", true);
                }
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

.reset {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: white;
}

.reset button {
    background-color: #aa1704;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}
</style>