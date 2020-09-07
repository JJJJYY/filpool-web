<template>
  <div>
    <BlockInfo></BlockInfo>
    <div>
      <BlockChart></BlockChart>
      <MinerRank></MinerRank>
    </div>
  </div>
</template>

<script>
  import BlockInfo from './BlockInfo';
  import BlockChart from './BlockChart';
  import MinerRank from './MinerRank';

  export default {
    name: "Browser",
    components: {
      BlockInfo,
      BlockChart,
      MinerRank
    }
  }
</script>

<style scoped>

</style>