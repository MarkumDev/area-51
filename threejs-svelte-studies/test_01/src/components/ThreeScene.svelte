<script lang="ts">
  import { onMount } from "svelte";
  import { Box3 } from "three";

  let container: HTMLDivElement;

  onMount(async () => {
    const THREE = await import("three");

    console.log("Three.js carregado - REVISION:", THREE.REVISION);

    const width = container.clientWidth;
    const height = container.clientHeight;

    console.log(width, height);

    // Primeiro passo é criar uma cena
    const scene = new THREE.Scene();
    // Segundo passo é criar a camera
    const camera = new THREE.PerspectiveCamera(
      50, // Campo de visão
      width / height, // Proporção
      0.1, // Plano próximo
      2000 // Plano distante
    );

    camera.position.set(0, 5, 5);
    camera.lookAt(0, 0, 0);

    // Terceiro passo é criar o renderer e anexar ao DOM
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Criando uma luz
    const light = new THREE.PointLight(0xffffff, 50);
    light.position.set(0, 0, 10);
    // scene.add(light);

    const sunLight = new THREE.DirectionalLight(0xffffff, 1.5);
    sunLight.position.set(5, 10, 5);
    scene.add(sunLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    sunLight.castShadow = true;
    renderer.shadowMap.enabled = true;

    const groundGeo = new THREE.PlaneGeometry(10, 10);
    const groundMat = new THREE.MeshBasicMaterial({ color: 0x8b4513 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    const groundBox = new THREE.Box3().setFromObject(ground);
    const groundSize = new THREE.Vector3();
    groundBox.getSize(groundSize);

    scene.background = new THREE.Color(0x87ceeb);

    // Criando um cubo e adicionando na cena
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff99 });

    for (let i = 1; i <= 5; i++) {
      const cube = new THREE.Mesh(geometry, material);
      const cubeBox = new Box3().setFromObject(cube);
      const cubeSize = new THREE.Vector3();
      cubeBox.getSize(cubeSize);

      const randomPosX = Math.random() * groundSize.x - groundSize.x / 2;
      const randomPosZ = Math.random() * groundSize.z - groundSize.z / 2;
      cube.position.x = randomPosX;
      cube.position.z = randomPosZ;
      cube.position.y = 0.5;
      scene.add(cube);
    }

    function animate() {
      renderer.render(scene, camera);
      //   cube.rotation.y += 0.01;
      requestAnimationFrame(animate);
    }

    animate();
  });
</script>

<div bind:this={container}></div>

<style>
  div {
    width: 100dvw;
    height: 100dvh;
  }
</style>
