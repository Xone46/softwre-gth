<template>
    <div class="photos">

        <h1 v-if="!flagReset">Veuillez saisir votre photo</h1>

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
import Photos from "@/requests/appareil_levage/famille1_lev1/Photos"

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
                    this.$emit("changeColorPhoto_famille1_lev1", true);
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
                    this.$emit("changeColorPhoto_famille1_lev1", false);
                }

            })
            .catch((error) => {
                console.log(error);
            });
        }
    },

    created() {

            Photos.select(this.observateurId)
            .then((result) => {
                if(result.data.img != null) {
                    this.flagReset = true;
                    this.flagImg = true;
                    this.imgSrc = result.data.img;
                    this.$emit("changeColorPhoto_famille1_lev1", true);
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
    background-color: #04AA6D;
    color: white;
    margin: 3px;
    border: 0px;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.display-button {
    border: 1px solid #04AA6D;
    color: #04AA6D;
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

.reset button:hover {
    background-color: rgb(84, 1, 1);
}

.spinner {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>