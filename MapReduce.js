function mergeSort (arr) {
  if (arr.length === 1) {
    // return once we hit an array with a single item
    return arr;
  }
  const middle = Math.floor(arr.length / 2); // get the middle item of the array rounded down
  const left = arr.slice(0, middle); // items on the left side
  const right = arr.slice(middle); // items on the right side
  return merge(
    mergeSort(left),
    mergeSort(right)
  );
}

// compare the arrays item by item and return the concatenated result
function merge (left, right) {
  let result = [];
  let indexLeft = 0;
  let indexRight = 0;
  while (indexLeft < left.length && indexRight < right.length) {
    if (left[indexLeft] < right[indexRight]) {
      result.push(left[indexLeft]);
      indexLeft++;
    } else {
      result.push(right[indexRight]);
      indexRight++;
    }
  }
  return result.concat(left.slice(indexLeft)).concat(right.slice(indexRight));
}
function ReplaceNewLines(text){
	return text.replace(/\n/gm, ";;");
}
function strip(number) {
    return (parseFloat(number).toPrecision(3));
}
function split(text){
	return matches = text.match(/.+\n{1}/gm);
}
function splitWords(text){
	return matches = text.match(/.+\,{1}/gm);
}
function ignoreNumbers(words){
	return words.replace(/\d+/gm, "");
}
function ignoreWords(words,w){
	return words.replace(new RegExp(w,"gm"), "");
}
function cleanWord(words,b,w){
	if(b){
		if(w.length>0)
			return ignoreWords(ignoreNumbers(words),w).replace(/(\%|\s|\*|\\|\/|\-|\—|\u2014|\_|\u00bf|\¿|\?|\u00a1|\¡|\!|\"|\u201c|\“|\”|\u201d|\u2026|\,|\.|\;|\:|\{|\}|\(|\)|\[\d*|\]|\<|\>|\u00ab|\«|\»|\u00bb)/gm, "");
		else
			return ignoreNumbers(words).replace(/(\%|\s|\*|\\|\/|\-|\—|\u2014|\_|\u00bf|\¿|\?|\u00a1|\¡|\!|\"|\u201c|\“|\”|\u201d|\u2026|\,|\.|\;|\:|\{|\}|\(|\)|\[\d*|\]|\<|\>|\u00ab|\«|\»|\u00bb)/gm, "");
	}
	else{
		if(w.length>0)
			return ignoreWords(words,w).replace(/(\%|\s|\*|\\|\/|\-|\—|\u2014|\_|\u00bf|\¿|\?|\u00a1|\¡|\!|\"|\u201c|\“|\”|\u201d|\u2026|\,|\.|\;|\:|\{|\}|\(|\)|\[\d*|\]|\<|\>|\u00ab|\«|\»|\u00bb)/gm, "");
		else
			return words.replace(/(\%|\s|\*|\\|\/|\-|\—|\u2014|\_|\u00bf|\¿|\?|\u00a1|\¡|\!|\"|\u201c|\“|\”|\u201d|\u2026|\,|\.|\;|\:|\{|\}|\(|\)|\[\d*|\]|\<|\>|\u00ab|\«|\»|\u00bb)/gm, "");
	}
}
function mapReduce(arr,b,w){
	var hashmap = {};
	var count = 0;
	var count2 = 0;
	arr.forEach(function(element) {
		var matches = element.match(/\S+\s{1}/gm);

		if(matches != null){
			matches.forEach(function(elem) {			
				var k = cleanWord(elem.toLowerCase(),b,w);
				if(k.length > 0){
					count++;
					if(k in hashmap)
						hashmap[k]++;
					else{
						count2++;
						hashmap[k]=1;
					}
				}
			});
		}		
	});
	return [hashmap,count,count2];
}

function categorizeByNumber(dict){
	var d = {};
	var list = [];
	
	for (var key in dict) {		
		if(dict[key] in d){
			d[dict[key]].push(key)
		}
		else{
			d[dict[key]]=[key];
			list.push(dict[key]);
		}
	}
	return [d,list];
}

function appendDOM(k,v,w){
	var tr = document.createElement("tr");
	var td = document.createElement("td");
	var textCont = document.createTextNode(k);
	td.appendChild(textCont);
	tr.appendChild(td);
	
  	td = document.createElement("td");
  	td.colSpan = "2";
  	textCont = document.createTextNode(String(v));
  	td.appendChild(textCont);
  	tr.appendChild(td);

   	td = document.createElement("td");
   	textCont = document.createTextNode(String(strip(100*v/w))+" %");
   	td.appendChild(textCont);
   	tr.appendChild(td);
	
	return tr;
}

var allWords ={};
var nW = 0;

	    var openFile = function(event) {
        var input = event.target;
		var elem = document.getElementById("output");
		elem.remove();

		var body = document.getElementById("container"); 
		var div = document.createElement("div");
		div.id = "output";
		body.appendChild(div);

		var w = String(document.getElementById("palabras").value);
		console.log(w);

		var b = String(document.getElementById("numeros").value)=="2"?true:false;
		console.log(b);

        var reader = new FileReader();
        reader.onload = function(){
          var text = reader.result;
          var m=mapReduce(split(text),b,w);
          var words = nW = m[1];
          var hashmap = allWords = m[0];

          //Node
          var node = document.getElementById('output');
          var ord = document.getElementById('orden').value;
          var p = document.createElement("p");
          var textCont = document.createTextNode("Total de palabras: "+String(words));
          p.appendChild(textCont);
          node.appendChild(p);

          p = document.createElement("p");
          textCont = document.createTextNode("# de palabras diferentes: "+String(m[2]));
          p.appendChild(textCont);
          node.appendChild(p);

		  //Table          
          var table = document.createElement("table");
          table.style="width:30em";
          var tr = document.createElement("tr");
          var th = document.createElement("th");
          var td = document.createElement("td");
          var bold = document.createElement("bold");

          textCont = document.createTextNode("Palabra");
          th.appendChild(textCont);
          tr.appendChild(th);

          th = document.createElement("th");
          textCont = document.createTextNode("# veces");
          th.colSpan = "2";
          th.appendChild(textCont);
          tr.appendChild(th);

          th = document.createElement("th");
          textCont = document.createTextNode("Frecuencia");
          th.appendChild(textCont);
          tr.appendChild(th);
          table.appendChild(tr);

          if(ord=="1"){
	          for (var key in hashmap) {
	          	table.appendChild(appendDOM(key,hashmap[key],words));
	          }  
          }
          else{
          	//Sort
          	var c=categorizeByNumber(hashmap);
          	var newDict=c[0];
          	var list=c[1];
          	var listSorted=mergeSort(list);
          	
          	//Greater to Lower
          	if(ord==2)
          		listSorted=listSorted.reverse();

          	listSorted.forEach(function(number) {
	          	newDict[number].forEach(function(key) {
		          	table.appendChild(appendDOM(key,hashmap[key],words));
	          	});
          	});
          }
               
          	node.appendChild(table);  
          	document.getElementById("busqueda").style.display = "block";

          //console.log(reader.result.substring(0, 200));
        };
        reader.readAsText(input.files[0]);

      };
function search(){
	var key = String(document.getElementById("buscar").value).toLowerCase();
	var v = 0;
	var por = 0.0;
	if(key in allWords){
		v = allWords[key];
		por = String(strip(100*v/nW))+"%";
	}

	document.getElementById("veces").value=String(v);
	document.getElementById("porcentaje").value=por;
}

