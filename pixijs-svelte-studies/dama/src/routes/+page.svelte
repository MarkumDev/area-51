<script lang="ts">
  import "normalize.css";
  import { onMount } from "svelte";
  import { drawBoard, initPixiApplication } from "../ts/pixijs/core";

  let container: HTMLElement;

  onMount(async () => {
    if (container) {
      await initPixiApplication(container);

      drawBoard();
    } else {
      console.error("div do pixi não foi carregada");
    }
  });
</script>

<main id="main-container">
  <header class="header-bar">header</header>
  <section class="main-section">
    <aside>asd, atu</aside>
    <main>
      <div class="pixi-container" bind:this={container}></div>
    </main>
  </section>
</main>

<style>
  #main-container {
    display: flex;
    height: 100dvh;
    flex-direction: column;
    overflow: hidden;
  }

  .header-bar {
    background-color: var(--dark-green);
    border-bottom: 0.1rem solid var(--moss-green);
    color: var(--font);
    font-weight: 600;
    font-family: sans-serif;
    font-size: large;
    padding: 0.3rem;
  }

  .main-section {
    display: grid;
    grid-template-columns: 1fr 4fr;
    flex: 1;
    min-height: 0;
  }

  .main-section aside {
    border-right: 0.1rem solid var(--moss-green);
    background-color: var(--dark-green);
  }

  .main-section main {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }

  .pixi-container {
    height: 90%;
    aspect-ratio: 1;
  }
</style>
