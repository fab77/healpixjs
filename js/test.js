/**
 * 
 */

var norder = 3;
var nside = Math.pow(2, norder);
var healpix = new Healpix(nside);
var maxNPix = healpix.getNPix();

var vertexPosition = new Array();
var facesVec3Array;

var max_x = max_y = max_z = -1000;
var min_x = min_y = min_z = 1000;


for (i=0; i < maxNPix; i++){
	facesVec3Array = new Array();
	facesVec3Array = healpix.getBoundaries(i);
	for (j=0; j<4;j++){
		if (facesVec3Array[j].x < min_x){
			min_x = facesVec3Array[j].x;
		}
		if (facesVec3Array[j].x > max_x){
			max_x = facesVec3Array[j].x;
		}
		if (facesVec3Array[j].y < min_y){
			min_y = facesVec3Array[j].y;
		}
		if (facesVec3Array[j].y > max_y){
			max_y = facesVec3Array[j].y;
		}
		if (facesVec3Array[j].z < min_z){
			min_z = facesVec3Array[j].z;
		}
		if (facesVec3Array[j].z > max_z){
			max_z = facesVec3Array[j].z;
		}
	}
}
console.log ("min_x: "+min_x + " max_x: "+max_x);
console.log ("min_y: "+min_y + " max_y: "+max_y);
console.log ("min_z: "+min_z + " max_z: "+max_z);



//Vertex shader program
var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute vec4 a_Color;\n' +
  'uniform mat4 u_ProjMatrix;\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_Position = u_ProjMatrix * a_Position;\n' +
  '  v_Color = a_Color;\n' +
  '}\n';

// Fragment shader program
var FSHADER_SOURCE =
  '#ifdef GL_ES\n' +
  'precision mediump float;\n' +
  '#endif\n' +
  'varying vec4 v_Color;\n' +
  'void main() {\n' +
  '  gl_FragColor = v_Color;\n' +
  '}\n';

