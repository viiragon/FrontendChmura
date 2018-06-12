
import DataService from "./DataService.js";

function findInXML(collection, name) {
    for (var i = 0; i < collection.length; i++) {
        if (collection[i].nodeName == name) {
            return collection[i];
        }
    }
    return null;
}

function findAllInXML(collection, name) {
    var list = [];
    for (var i = 0; i < collection.length; i++) {
        if (collection[i].nodeName == name) {
            list.push(collection[i]);
        }
    }
    return list;
}

export default {
    readGPSFile: function(file) {
        var self = this;
        return new Promise(function(resolve, reject) {
            try {
                var reader = new FileReader();
                reader.onload = e => {
                    self.readGPSText(e.target.result)
						.then(trip => resolve(trip))
						.catch(error => reject(error));
                };
                reader.readAsText(file);
                console.log("Loading file: " + file.name);
            } catch (err) {
                var msg = "ERROR! The file cannot be read!";
                console.error(msg);
                reject(msg);
            }
        });
    },
    readGPSText(textFile) {
        return new Promise(function(resolve, reject) {
            try {
                var xmlDoc;
                if (window.DOMParser) {
                    var parser = new DOMParser();
                    xmlDoc = parser.parseFromString(textFile, "text/xml");
                } else {
                    // Internet Explorer
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                    xmlDoc.async = false;
                    xmlDoc.loadXML(textFile);
                }
                var gpx = xmlDoc.getElementsByTagName("gpx")[0];
				
                var metadata = findInXML(gpx.children, "metadata");
				var name = "";
				var description = "";
                var wayPoints = [];
				var startDate = new Date(),
						endDate = new Date();
				var tmpElement;
				if (metadata != null) {
					tmpElement = findInXML(metadata.children, "name");
					if (tmpElement != null) {
						name = tmpElement.innerHTML;
					}
					tmpElement = findInXML(metadata.children, "desc");
					if (tmpElement != null) {
						description = tmpElement.innerHTML;
					}
				}
				var trk = findInXML(gpx.children, "trk");
				tmpElement = findInXML(trk.children, "name");
				if (name == "" && tmpElement != null) {
					name = tmpElement.innerHTML;
				}
				tmpElement = findInXML(trk.children, "desc");
				if (description == "" && tmpElement != null) {
					description = tmpElement.innerHTML;
				}
				
				var trkseg = findInXML(trk.children, "trkseg");
				tmpElement = findInXML(trkseg.children, "name");
				if (name == "" && tmpElement != null) {
					name = tmpElement.innerHTML;
				}
				tmpElement = findInXML(trkseg.children, "desc");
				if (description == "" && tmpElement != null) {
					description = tmpElement.innerHTML;
				}
				
                var trkpts = findAllInXML(trkseg.children, "trkpt");
				if (trkpts.length > 0) {
					var point;
					var start = Number.MAX_SAFE_INTEGER,
						end = 0;
					for (var i = 0; i < trkpts.length; i++) {
						point = trkpts[i];
						tmpElement = findInXML(point.children, "time");
						if (tmpElement != null) {							
							var date = new Date(findInXML(point.children, "time").innerHTML);
						} else {
							var date = new Date();
						}
						wayPoints.push(
							DataService.createWaypoint(
								0,
								parseFloat(point.attributes.lat.nodeValue),
								parseFloat(point.attributes.lon.nodeValue),
								date
							)
						);
						if (date.getTime() < start) {
							start = date.getTime();
						}
						if (date.getTime() > end) {
							end = date.getTime();
						}
					}
					startDate = new Date(start);
					endDate = new Date(end);
				}
                var trip = DataService.createTrip(
					"",
                    name,
                    description,
                    startDate,
                    endDate,
                    wayPoints
                );
                console.log('Trip "' + name + '" loaded!');
                resolve(trip);
            } catch (err) {
                console.error(err);
                reject(err);
            }
        });
    },
    saveGPSFile(siteData) {
        return new Promise(function(resolve, reject) {
            try {
                var output = "<gpx>\n";
                output += "\t<metadata>\n";
                output += "\t\t<name>" + siteData.trip.name + "</name>\n";
                output += "\t\t<desc>" + siteData.trip.description + "</desc>\n";
                output += "\t</metadata>\n";
                output += "\t<trk>\n";
                output += "\t\t<trkseg>\n";
                var point;
                for (var i = 0; i < siteData.trip.waypoints.length; i++) {
                    point = siteData.trip.waypoints[i];
                    output +=
                    '\t\t\t<trkpt lat="' +
                    point.latitude +
                    '" lon="' +
                    point.longitude +
                    '">\n';
                    output += "\t\t\t\t<ele>0.0</ele>\n";
                    output += "\t\t\t\t<time>" + point.date + "</time>\n";
                    output += "\t\t\t</trkpt>\n";
                }
                output += "\t\t</trkseg>\n";
                output += "\t</trk>\n";
                output += "</gpx>\n";
                console.log(output);
                
                var a = document.getElementById("download");
                console.log(a);
                var blob = new Blob([output], { type: "text/plain" });
                a.href = window.URL.createObjectURL(blob);
                var cleanName = siteData.trip.name
                .replace(/ /g, "_")
                .replace(/[^\w\s]/gi, "");
                a.download = cleanName + ".gpx";
                a.click();
                a.href = "";
                console.log("Saved file: " + cleanName + ".gps");
                resolve(`Saved ${cleanName}`)
            } catch (err) {
                console.error("ERROR! Cannot save file!");
                console.error(err);
                reject(err);
            }
        });
    },
    getMock() { 
        return this.readGPSText(
            `<gpx>
                <metadata>
                    <name>Wycieczka w Warszawie</name>
                    <desc>Widzieliśmy nawet pałac kultury</desc>
                </metadata>
                <trk>
                    <trkseg>
                        <trkpt lat="-25.363" lon="131.044">
                            <ele>0.0</ele>
                            <time>Tue Jun 05 2018 18:04:57 GMT+0200</time>
                        </trkpt>
                    </trkseg>
                </trk>
            </gpx>`
        );
    }
};
