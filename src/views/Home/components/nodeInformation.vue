<template>
  <div class="nodeInformation">
    <div class="nodeInformation-centent">
      <div class="nodeInformation-text">
        节点信息
      </div>
      <div class="nodeInformation-list">
        <div class="nodeInformation-list-t">
          <div class="nodeInformation-list-centent">
            <p class="nodeInformation-list-titile">节点ID</p>
            <p>2770</p>
            <p>2770</p>
            <p>2770</p>
          </div>
          <div class="nodeInformation-list-centent">
            <p class="nodeInformation-list-titile">有效算力</p>
            <p>152458p</p>
            <p>152458p</p>
            <p>152458p</p>
          </div>
          <div class="nodeInformation-list-centent">
            <p class="nodeInformation-list-titile">24小时挖矿收益</p>
            <p>74441FIL</p>
            <p>74441FIL</p>
            <p>74441FIL</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nodeInformation {
  padding: 10px;
  .nodeInformation-centent {
    background: #fff;
    border-radius: 8px;
    padding: 12px;
    .nodeInformation-text {
      color: #333333ff;
      font-weight: 400;
    }
    .nodeInformation-list {
      padding: 15px 0;
      .nodeInformation-list-t {
        display: flex;
        justify-content: space-around;
        .nodeInformation-list-centent {
          flex-grow: 1;
          line-height: 27px;
          text-align: center;
          .nodeInformation-list-titile {
            border-bottom: 1px solid #ebebebff;
            color: #666666ff;
          }
        }
      }
    }
  }
}
</style>
