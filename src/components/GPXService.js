
import CreatingDataService from "./CreatingDataService.js";

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
                    .then(trip => resolve(trip));
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
                var name = findInXML(metadata.children, "name").innerHTML;
                var description = findInXML(metadata.children, "desc").innerHTML;
                
                var wayPoints = [];
                var trkpts = findAllInXML(
                    findInXML(findInXML(gpx.children, "trk").children, "trkseg").children,
                    "trkpt"
                );
                var point;
                var startDate = Number.MAX_SAFE_INTEGER,
                endDate = 0;
                for (var i = 0; i < trkpts.length; i++) {
                    point = trkpts[i];
                    var date = new Date(findInXML(point.children, "time").innerHTML);
                    wayPoints.push(
                        CreatingDataService.createWaypoint(
                            parseFloat(point.attributes.lat.nodeValue),
                            parseFloat(point.attributes.lon.nodeValue),
                            date
                        )
                    );
                    if (date.getTime() < startDate) {
                        startDate = date.getTime();
                    }
                    if (date.getTime() > endDate) {
                        endDate = date.getTime();
                    }
                }
                var trip = CreatingDataService.createTrip(
                    name,
                    description,
                    new Date(startDate),
                    new Date(endDate),
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
