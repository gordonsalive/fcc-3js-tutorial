import React from "react";

import { Hello } from "./components/Hello";
import { HelloClassy } from "./components/HelloClassy";

import * as THREE from "three";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Optional, black is default

// Add a cube to the scene
const geometry = new THREE.BoxGeometry(1.5, 1, 2); // width, height, depth
const material = new THREE.MeshLambertMaterial({ color: 0xfb8e00 });

const mesh = new THREE.Mesh(geometry, material);
mesh.position.set(0, 0, 0); // Optional, 0,0,0 is the default
scene.add(mesh);

// Set up lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
dirLight.position.set(10, 20, 0); // x, y, z
scene.add(dirLight);

// Perspective camera
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(
  45, // field of view in degrees
  aspect, // aspect ratio
  1, // near plane
  100 // far plane
);

// // Orthographic camera
// const width = 10;
// const height = width * (window.innerHeight / window.innerWidth);
// const camera = new THREE.OrthographicCamera(
//   width / -2, // left
//   width / 2, // right
//   height / 2, // top
//   height / -2, // bottom
//   1, // near
//   100 // far
// );

camera.position.set(4, 4, 4);
camera.lookAt(0, 0, 0);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

// Add it to HTML
document.body.appendChild(renderer.domElement);

// create a timer to rotate my geometry
let rotationalOffset = 0;
let cubeColour = {red: 0, green: 0.3, blue:0.6};
const rotateIt = () => {
  console.log(`rotating it ${rotationalOffset} ` + JSON.stringify(cubeColour));
  rotationalOffset += ((2*Math.PI)/360)/3;//radians
  mesh.rotation.x = rotationalOffset;
  mesh.rotation.y = 2* rotationalOffset;

  const incColour = (col, inc) => (col + inc > 1) ? 0 : col + inc;
  cubeColour.red = incColour(cubeColour.red, 0.001);
  cubeColour.green = incColour(cubeColour.green, 0.002);
  cubeColour.blue = incColour(cubeColour.blue, 0.003);

  material.color.setRGB(cubeColour.red, cubeColour.green, cubeColour.blue);
  renderer.render(scene, camera);
} 
setInterval(rotateIt, 25);

export default function QueryParamsExample() {
  return (
    <div>
      just say hello
      <Hello />
    </div>
  );
}
