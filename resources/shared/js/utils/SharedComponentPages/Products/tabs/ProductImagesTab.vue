<template>
    <div>
        <q-list class="rounded-borders q-mt-sm" style="max-width: 100%">
            <template>
                <div class="upload" :class="{noImage: noImage}">
                    <h4>Images</h4>
                    <div v-if="noImage">
                        <p class="noImage__text"> No image added to product yet...</p>
                    </div>
                    <q-uploader v-if="showUploadBox"
                        @removed="removeFile"
                        @added="imageAdded"
                        label="Upload New images"
                        multiple
                        style="width: 350px">
                        <template v-slot:header="scope">
                            <div class="row no-wrap items-center q-pa-sm q-gutter-xs">
                                <q-btn v-if="scope.queuedFiles.length > 0" icon="clear_all" @click="scope.removeQueuedFiles" round dense flat >
                                    <q-tooltip>Clear All</q-tooltip>
                                </q-btn>
                                <q-btn v-if="scope.uploadedFiles.length > 0" icon="done_all" @click="scope.removeUploadedFiles" round dense flat >
                                    <q-tooltip>Remove Uploaded Files</q-tooltip>
                                </q-btn>
                                <q-spinner v-if="scope.isUploading" class="q-uploader__spinner" />
                                <div class="col">
                                    <div class="q-uploader__title">Upload product images</div>
                                    <div class="q-uploader__subtitle">{{ fileSize(scope.uploadSizeLabel) }}</div>
                                </div>
                                <q-btn v-if="scope.canAddFiles" type="a" icon="add_box" round dense flat>
                                    <q-uploader-add-trigger />
                                    <q-tooltip>Pick Files</q-tooltip>
                                </q-btn>
                                <q-btn  :loading="loading" v-if="canUpload(scope.canUpload)" icon="cloud_upload" @click="startUpload" round dense flat >
                                    <q-tooltip>Upload File</q-tooltip>
                                </q-btn>
                                <q-btn icon="cancel" round dense flat @click="clearAllFiles">
                                    <q-tooltip>Cancel File Uploads</q-tooltip>
                                </q-btn>
                                <q-btn v-if="scope.isUploading" icon="clear" @click="scope.abort" round dense flat >
                                    <q-tooltip>Abort Upload</q-tooltip>
                                </q-btn>
                            </div>
                        </template>
                    </q-uploader>
                    <q-btn v-else
                           round
                           color="primary"
                           @click="showUploadBox=true"
                           icon="add_box">
                    </q-btn>
                    <div v-if="errorMessages" v-for="error in errorMessages">
                        <div class="errorMsg">{{error[0]}}</div>
                    </div>
                </div>
                <div class="q-pa-md">
                    <div class="q-gutter-md row items-center images-row" v-if="!noImage">
                        <template v-for="(image,index) in images" >
                            <q-img :key="index"
                                   @mouseover="setImage(image)"
                                   @mouseleave="hoveredImage=''"
                                   :src="image.thumb"
                                   :placeholder-src="placeholder"
                                   spinner-color="red"
                                   :class="{is_cover:image.cover}"
                                   style="height: 140px; max-width: 150px">
                                <div v-if="hovered(image)" class="column justify-between absolute-bottom
                                text-subtitle1 text-center q-pa-xs" style="height: 100%">
                                    <q-btn @click="imageClicked(image)" label="View" size="sm" ripple color="primary" rounded></q-btn>
                                    <q-btn @click="makeCover(image.id)"
                                           v-if="!image.cover" label="Make Cover"
                                           size="sm" ripple color="secondary" :loading="makingCover"
                                           push text-color="black">
                                    </q-btn>
                                    <q-btn :loading="deletingImage"
                                           label="Delete" size="sm" ripple
                                           color="red" glossy
                                           @click="confirmDelete(image)"
                                           >
                                    </q-btn>
                                </div>
                            </q-img>
                        </template>
                    </div>
                </div>
            </template>
        </q-list>
        <full-image-view v-if="showFullImage" @close="hideFullImage"
                         :image="fullImageView">
        </full-image-view>
        <q-dialog v-model="showDeleteModal" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <span>Are you sure you want to delete image?</span>
                </q-card-section>
                <q-card-actions align="right">
                    <q-btn label="No. Cancel" color="primary"
                           v-close-popup ></q-btn>
                    <q-btn
                        flat label="Yes. Continue" color="primary" :loading="loading"
                        @click=deleteImage></q-btn>
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
<script>
  import Requests from "../../../form/Requests";
  import FullImageView from "./partials/Images/FullImageView";

  export default {
    components: {FullImageView},
    props: ['propProduct','productMutator'],
    mixins: [Requests],
    data() {
      return {
        toBeDeleted: '',
        showDeleteModal: false,
        showUploadBox: false,
        uploadedImages: [],
        hoveredImage: '',
        clearFileSize: false,
        uploaded: false,
        fullImageView: '',
        showFullImage: false,
        makingCover: false,
        deletingImage: false,
      }
    },
    methods: {
      confirmDelete(image){
        this.toBeDeleted = image;
        this.showDeleteModal = true;
      },

      makeCover(imageID){
        this.makingCover = true
        this.form['product_id'] = this.propProduct.id;
        this.form['image_id'] = imageID;
        this.makeRequest("product-images-cover",{
          action:"patch",
          mutator: this.productMutator,
          store: this.$store,
          onSuccessCallback: ()=>{
            this.makingCover = false
          }
        })
      },
      deleteImage(){
        this.deletingImage = true;
        this.makeRequest(`product-images/${this.toBeDeleted.id}`,{
          action:"delete",
          mutator: this.productMutator,
          store: this.$store,
          onSuccessCallback: ()=>{
            this.showDeleteModal =false;
            this.deletingImage = false
          }
        })
      },
      imageClicked(image){
        this.showFullImage = true
        this.fullImageView = image.full
      },
      hideFullImage(){
        this.showFullImage = false;
      },
      fileSize(size){
        if(this.uploaded === true){
          return "0.0 B"
        }else {
          return size;
        }
      },
      canUpload(state){
        if(this.uploaded){
          return false;
        }else {
          return state;
        }
      },
      hovered(image) {
        return this.hoveredImage === image;
      },
      setImage(image) {
        this.hoveredImage = image;
      },
      imageAdded(uploaded){
        this.uploaded = false;
        uploaded.forEach((each)=>{
            this.uploadedImages.push(each)
        });
      },
      startUpload(){
        if(_.isEmpty(this.uploadedImages)){
          return this.showMessage({
            response: "Upload an image",
            color:"negative",
            icon:"thumb_down"
          })
        }
        this.errors.clearAll();
          let formData = new FormData();
        for (let i = 0; i < this.uploadedImages.length; i++) {
          formData.append('images[]', this.uploadedImages[i]);
        }
          formData.append('product_id', this.propProduct.id);
          this.form = formData;
          this.makeRequest("product_images",{
            action: "post",
            mutator: this.productMutator,
            store: this.$store,
            onSuccessCallback: ()=>{
              this.loading = false;
              this.uploaded = true;
              this.showUploadBox = false;
              this.clearAllFiles()
            }
          })
      },
      removeFile(removedFile){
        this.uploadedImages = this.uploadedImages.filter(file=>file.name !== removedFile[0].name)
        this.clearAllFiles()
      },
      clearAllFiles(){
        this.showUploadBox=false
        let uploadedFiles = document.querySelectorAll("div.q-uploader__list.scroll > div");
        uploadedFiles.forEach(file=> file.remove());
        this.uploadedImages = [];
        this.errors.clearAll()
      }
    },
    computed: {
      images() {
        if(this.propProduct.images){
          return this.propProduct.images.all_images
        }
      },
      placeholder() {
        return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWBAMAAADOL2zRAAAAG1BMVEXMzMyWlpaqqqq3t7fFxcW+vr6xsbGjo6OcnJyLKnDGAAAACXBIWXMAAA7EAAAOxAGVKw4bAAABAElEQVRoge3SMW+DMBiE4YsxJqMJtHOTITPeOsLQnaodGImEUMZEkZhRUqn92f0MaTubtfeMh/QGHANEREREREREREREtIJJ0xbH299kp8l8FaGtLdTQ19HjofxZlJ0m1+eBKZcikd9PWtXC5DoDotRO04B9YOvFIXmXLy2jEbiqE6Df7DTleA5socLqvEFVxtJyrpZFWz/pHM2CVte0lS8g2eDe6prOyqPglhzROL+Xye4tmT4WvRcQ2/m81p+/rdguOi8Hc5L/8Qk4vhZzy08DduGt9eVQyP2qoTM1zi0/uf4hvBWf5c77e69Gf798y08L7j0RERERERERERH9P99ZpSVRivB/rgAAAABJRU5ErkJggg=="
      },
      noImage(){
        if(this.images){
          return this.images.length <= 0;
        }
      },
      errorMessages(){
        return Object.values(this.errors)[0]
      }
    },
  }

</script>
<style lang="scss" scoped>
    .images-row{
        margin: 0 auto;
    }
    .noImage{
        display: flex;
        justify-content: center !important;
        align-items: center !important;
        padding: 2rem;
        border: dashed 1px;
        flex-direction: column;
        .noImage__text{
            padding: 1rem;
        }
    }
    .upload{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .is_cover{
        border: 1px solid #008000a3;
        box-shadow: #69d069 1px 1px 19px 2px;
    }
</style>
