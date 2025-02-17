<!--
  (c) 2023, Center for Computational Thinking and Design at Aarhus University and contributors
 
  SPDX-License-Identifier: MIT
 -->

<style>
  .fade {
    background: linear-gradient(-150deg, rgb(167, 204, 248), rgb(120, 255, 237));
    width: 80rem;
    height: 25rem;
    top: -10rem;
    left: -20rem;
    transform: rotate(-22deg);
    position: absolute;
    z-index: -1;
  }
  .inset-shadow {
    box-shadow: inset 0 0 10px #0000006e;
  }

  .box-helper1 {
    position: absolute;
    height: 2rem;
    width: 2.5rem;
    background-color: white;
    top: -2rem;
    right: -2rem;
  }

  .box-helper2 {
    position: absolute;
    height: 1.7rem;
    width: 2.5rem;
    background-color: white;
    bottom: -14.5rem;
    left: -2rem;
  }

  .box {
    background: white;
    position: absolute;
    z-index: 10;
    bottom: 0;
    right: 0;
    width: 30rem;
    height: 15rem;
    border-radius: 1rem 0 0 0;
    padding: 1rem;
    box-shadow: 0 0 10px #0000006e;
  }
</style>

<script lang="ts">
  import { fly } from 'svelte/transition';
  import { FilterType, determineFilter } from '../../script/datafunctions';
  import FilterGraph from './FilterGraph.svelte';
  import { gestures } from '../../script/stores/mlStore';
  import FilterInspectionGesture from './FilterInspectionGesture.svelte';

  export let filter: FilterType | undefined;
  export let onClose: () => void;

  function getColor(index: number): string {
    const colors = [
      '#f9808e',
      '#80f98e',
      '#808ef9',
      '#80dfff',
      '#df80ff',
      '#ffdf80',
      '#ff3333',
      '#33ff33',
      '#3333ff',
    ];
    return colors[index % colors.length];
  }

  $: filterStrategy = filter === undefined ? undefined : determineFilter(filter);
  $: filterName = filterStrategy?.getText()?.name ?? '';
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
  transition:fly
  class="absolute bg-blend-darken w-screen h-screen z-1000 bg-black/50 flex justify-center items-center">
  <div on:click|stopPropagation class="w-full h-full overflow-hidden relative p-6">
    <!-- TODO: Fix hardcoded color -->
    <div class="fade" />
    <div class="bg-white -m-16 w-1000 h-1000 absolute" style="z-index:-2;" />
    <!-- TITLE of block -->
    <p class="text-lg mb-2 font-semibold">
      {filterName}
    </p>

    <!-- CLOSE BUTTON -->
    <div class="absolute right-4 top-4">
      <button
        class="hover:bg-gray-100 rounded outline-transparent w-8"
        on:click={onClose}>
        <i
          class="fas fa-plus text-lg text-gray-600 hover:text-gray-800 duration-75"
          style="transform: rotate(45deg);" />
      </button>
    </div>
    <div style="height: calc(100vh - 5rem); width: calc(100vw - 3rem);">
      <div class="box">
        {#if filter !== undefined}
          <FilterGraph {filter} legendPosition="right" aspectRatio={undefined} />
        {/if}
        <div class="relative">
          <div class="box-helper1" />
          <div class="box-helper2" />
        </div>
      </div>
      <div
        class="overflow-y-auto h-full bg-gray-100 relative inset-shadow p-7 rounded-md">
        <!-- Display all gestures -->
        {#each $gestures as gesture, i}
          <div class="flex">
            <FilterInspectionGesture {gesture} {filter} color={getColor(i)} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
