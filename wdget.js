const wdk = require("wikidata-sdk");
const rp = require("request-promise");
const fs = require("fs");

const sparql=`SELECT ?insect ?inesctLabel ?insectDescription (xsd:string(?insect) as ?iS)
WHERE {
  		  ?insect schema:description "species of insect"@en.
	 	  SERVICE wikibase:label { bd:serviceParam wikibase:language "ta". }
		  #FILTER (!(LANG(?insectDescription)="ta"))
}
#ORDER by ?lbl
LIMIT 100000 OFFSET 41400`
// function sparql2(q){
// 	return `SELECT ?insect ?inesctLabel ?insectDescription (xsd:string(?insect) as ?iS)
//             WHERE {
//               		  ?insect schema:description ?d.
//             	 	  SERVICE wikibase:label { bd:serviceParam wikibase:language "ta". }
//             		  #FILTER (!(LANG(?insectDescription)="ta"))
//             }
//             #ORDER by ?lbl
//             LIMIT 100`
// }


const url = wdk.sparqlQuery(sparql)
//const url2 = wdk.sparqlQuery(sparql2)

rp(url).then(simplify);

function simplify(data){
	var s = wdk.simplifySparqlResults (data);
	var arr = [];
	console.log(s);
	s.forEach(function(v,k,a){if(!v.insectDescription){arr.push(v.insect)} else {console.log("Already exists: "); console.log(v);}})
	console.log(JSON.stringify(arr,null,4));
	fs.writeFileSync("array.json",JSON.stringify(arr,null,4));

	//s.forEach(function(v,k,a){arr.push(v.insect)})
}
