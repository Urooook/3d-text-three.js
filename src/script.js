import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import gsap from 'gsap'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()
gui.hide()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('textures/matcaps/8.png')

const objects = []

const fontLoader = new THREE.FontLoader()
fontLoader.load(
    'fonts/helvetiker_regular.typeface.json',
    (font) => {
       const textGeometry = new THREE.TextBufferGeometry(
           'I love my mom', {
               font,
               size: 0.5,
               height: 0.2,
               curveSegments: 12,
               bevelEnabled: true,
               bevelThickness: 0.03,
               bevelSize: 0.02,
               bevelOffset: 0,
               bevelSegments: 5
           }
       )
       textGeometry.center()

       const material = new THREE.MeshMatcapMaterial({matcap: matcapTexture})
       //const material = new THREE.MeshNormalMaterial()
       //material.wireframe = true
       const text = new THREE.Mesh(textGeometry, material)
       scene.add(text)

       const donutGeometry = new THREE.TorusBufferGeometry(0.3, 0.2, 20, 45)
       const boxGeometry = new THREE.BoxBufferGeometry(0.5, 0.5, 0.5)

       for(let i = 0; i<150; i++){
         
        const donut = new THREE.Mesh(donutGeometry, material)
        scene.add(donut)
        objects.push(donut)
        donut.position.x = 1.5 + (Math.random() - 0.5) * 11
        donut.position.y = 1.5 + (Math.random() - 0.5) * 11
        donut.position.z = 1.5 + (Math.random() - 0.5) * 11

        donut.rotation.x = Math.random() * Math.PI
        donut.rotation.y = Math.random() * Math.PI

        const scale = Math.random()
        donut.scale.set(scale, scale, scale)
    }

    for(let i = 0; i<150; i++){
         
        const box = new THREE.Mesh(boxGeometry, material)
        scene.add(box)
        objects.push(box)
        box.position.x = 0.5 + (Math.random() - 0.5) * 11
        box.position.y = 0.5 + (Math.random() - 0.5) * 11
        box.position.z = 0.5 + (Math.random() - 0.5) * 11

        box.rotation.x = Math.random() * Math.PI
        box.rotation.y = Math.random() * Math.PI

        const scale = Math.random()
        box.scale.set(scale, scale, scale)
    }
    }
)

/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxBufferGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -15
camera.position.y = 35
camera.position.z = 50
scene.add(camera)

gsap.to(camera.position, {
    duration: 2,
    //delay: 1,
    x: 1,
    y: 0,
    z: 3
} )

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    for(let i =0; i<objects.length; i++){
        objects[i].rotation.x += 0.005
        objects[i].rotation.y += 0.005
        objects[i].rotation.z += 0.005
    }
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()