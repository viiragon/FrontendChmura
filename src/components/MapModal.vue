
<template>
<div>
{{isCardModalActive}}
	<form action="">
		<div class="modal-card" style="width: auto">
			<header class="modal-card-head">
				<p v-if="isEdit==false" class="modal-card-title">{{title}}</p>
				<b-input v-if="isEdit==true" v-model="title"></b-input>
			</header>
			<section class="modal-card-body">
				<div class="content"  v-if="isEdit==true">
					<h3>Wstaw ten punkt przed
						
					</h3>
					<b-field>
							<b-select placeholder="Nazwa punktu">
								<option
									v-for="option in otherPoints"
									:value="option.id"
									:key="option.id">
									{{ option.name }}
								</option>
							</b-select>
						</b-field>
				</div>
				<div class="content" v-if="isEdit==true">
					<h3>Edytuj zdjęcia</h3>
				</div>
				<div class="columns" style="150px">
					<div class="column" v-for="url in imageUrls" :key="url" @click="isImageModalActive = true">
						<div :style="{ 'background-image': 'url(' + url + ')', 'height': '150px',  'background-position': 'center', 'background-size': 'cover'}"></div>
						<b-modal :active.sync="isImageModalActive">
							<p class="image is-4by3">
								<img :src="url">
							</p>
						</b-modal>
					</div>     
					<div class="column" v-if="isEdit==true">
						<b-upload v-model="dropFiles"
									multiple
									drag-drop>
									<section class="section">
								<div class="content has-text-centered">
									<!-- <p>
										<b-icon
											icon="upload"
											size="is-large">
										</b-icon>
									</p> -->
									<p>Drop your files here or click to upload</p>
								</div>
							</section>
						</b-upload>
					</div>
				</div>
				<div class="content" v-if="isEdit==true">
					<div class="tags">
						<span v-for="(file, index) in dropFiles"
							:key="index"
							class="tag is-info" >
							{{file.name}}
							<button class="delete is-small"
								type="button"
								@click="deleteDropFile(index)">
							</button>
						</span>
					</div>
				</div>
				<div class="content">
					<h2>Opis</h2>
					<p v-if="isEdit==false">{{description}}</p>
					<b-field v-if="isEdit==true">
						<b-input type="textarea"
						class="is-info"
							v-model="description"
							maxlength="5000"
							placeholder="Maxlength automatically counts characters">
						</b-input>
					</b-field>
					
				</div>
					
			</section>
			
			<footer class="modal-card-foot">
				<button class="button" type="button" @click="$parent.close()">Zamknij</button>
				<button v-if="isEdit==true" @click="deleteWaypoint()" class="button is-danger">Usuń</button>
				<button v-if="isEdit==false" @click="isEdit=true" class="button is-info">Edytuj</button>
				<button v-if="isEdit==true" @click="isEdit=false" class="button is-info">Zapisz</button>
			</footer>
		</div>
	</form>
	
</div>
</template>

<script>

import http from "./HttpService.js";

export default {
  name: "MapModal",
  props: ["isCardModalActive", ""],
  methods: {
    open: function() {
      this.isCardModalActive = true;
    },
    close: function() {
      this.isCardModalActive = false;
    },
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
    },
    deleteWaypoint: function() {
		this.isEdit=false;
		
		this.$emit("remove-waypoint", this.waypoint);
		this.$parent.close();
    }
  },
  props: ["waypoint"],
  data() {
    return {
      dropFiles: [],

      otherPoints: [{ name: "Punkt Początkowy", id: 44 }],
      isEdit: false,

      isImageModalActive: false,
      imageUrls: [
        "https://www.sydney.com/sites/sydney/files/styles/gallery_full_width/public/2017-12/Jacarandas%20in%20Spring%20bloom%2C%20Royal%20Botanic%20Garden%2C%20Sydney.jpg?itok=zpohBz_j",
        "https://www.adventure24.pl/upload/products/australia-objazd--gora-kosciuszki-1354716105.jpg"
      ],
      title: "Punkt w Australii",
      description:
        "Curabitur accumsan turpis pharetra <strong>augue tincidunt</strong> blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl."
    };
  }
};
</script>