
<template>
<div>
	<form action="">
		<div class="modal-card" style="width: auto">
			<header class="modal-card-head">
				<p v-if="isEdit==false" class="modal-card-title">Waypoint id: {{waypoint.get("id")}}</p>
				<b-input v-if="isEdit==true" v-model="title"></b-input>
			</header>
			<section class="modal-card-body">
				<div class="content"  v-if="isEdit==true">
					<h3>Wstaw ten punkt przed
						
					</h3>
					<b-field>
							<b-select placeholder="Nazwa punktu" v-model="previousMarker">
								<option
									v-for="option in allWaypoints"
									:value="option"
									:key="option.id">
									{{ option.id }}
								</option>
							</b-select>
						</b-field>
				</div>
				<div class="content" v-if="isEdit==true">
					<h3>Edytuj zdjęcia</h3>
				</div>
				<div class="columns" style="150px">
					<div class="column" v-for="url in imageUrls" :key="url" @click="$parent.close();isImageModalActive = true">
						<img :src="url" :style="{ 'width': '550px',  'background-position': 'top center', 'background-size': 'cover'}"></img>
						<!-- <b-modal :active.sync="isImageModalActive">
							<p class="image is-4by3" @click="$parent.close()">
								<img :src="url">
							</p>
						</b-modal> -->
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
				<button v-if="isEdit==true" @click="savePoint()" class="button is-info">Zapisz</button>
			</footer>
		</div>
	</form>
	
</div>
</template>

<script>

import http from "./HttpService.js";

import DataService from './DataService.js';

export default {
  name: "MapModal",
  props: ["waypoint", "allWaypoints", "tripId"],
  methods: {
    open: function() {
    },
    close: function() {
    },
    deleteDropFile(index) {
      this.dropFiles.splice(index, 1);
      this.imageUrls.splice(index, 1);
    },
    deleteWaypoint: function() {
		this.isEdit=false;
		
		this.$emit("remove-waypoint", this.waypoint);
		this.$parent.close();
		}, 
		savePoint: function() {
			this.isEdit = false;
			console.log(this.previousMarker)
			var point = {
				id: this.waypoint.get("id"),
            longitude: this.waypoint.getPosition().lng(),
            latitude: this.waypoint.getPosition().lat(),
						date: this.waypoint.get("date"),
						photo: this.waypoint.get("photo")
        }
			this.$emit("update-waypoint", point, this.previousMarker);
			
		this.$parent.close();
		}
	},
	mounted:function() {
var photo = this.waypoint.get("photo") || [];
this.imageUrls = [photo.url];
			console.log("wayp", photo);
			console.log(this.imageUrls)
	},
	watch: {
		tripId: function() {
			console.log(tripId)
			var photo = this.waypoint.get("photo") || [];
						console.log(photo);
						this.waypoint.set("photo", [...photo, data]);
		},
		dropFiles: function(files) {
			var formData = new FormData();
			var str = `{"waypointId": "` + this.waypoint.get("id") + `","date": "` + new Date().getTime() + `"}`;
			console.log(str);
			formData.append("photoInfo", str);
			formData.append("photo", files[0]);
	var self = this;
			http.postForm("/trips/" + self.tripId + "/photo", formData)
				.then((data) => {
					if (data != "failed") {
						var photo = self.waypoint.get("photo") || [];
						console.log(photo);
						self.waypoint.set("photo", [...photo, data]);
						self.imageUrls = self.waypoint.get("photo");
						console.log(self.imageUrls)
					}
				}).catch((error) => {
					console.log(error);
				});
		}
	},
  data() {
    return {
      dropFiles: [],

      otherPoints: [{ name: "Punkt Początkowy", id: 44 }],
      isEdit: false,
	previousMarker: null,
      isImageModalActive: false,
      imageUrls: [
        
      ],
      title: "Przykładowa nazwa",
      description:
        "Curabitur accumsan turpis pharetra <strong>augue tincidunt</strong> blandit. Quisque condimentum maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna vel cursus venenatis. Suspendisse potenti. Etiam mattis sem rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et neque nisl."
    };
  }
};
</script>