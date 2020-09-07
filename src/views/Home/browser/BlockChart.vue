<template>
  <div id="blockChart">

  </div>
</template>

<script>
  import echarts from 'echarts';
  import { colors } from '@/config';
  import { getRandomColor, regExpTemplate } from '@/utils/utilTools';
  import { formatDate } from '@/utils/utilTools';
  import dayjs from 'dayjs';
  import utc from "dayjs/plugin/utc";
  dayjs.extend(utc);
  let myChart;
  export default {
    name: "BlockChart",
    created() {
      this.rate = 1;
      this.selectedKey = "";
      this.locale = localStorage.getItem('lang') || 'zh';
      this.axisLabelColor = "#272829";
      this.regStr = "<div><div>矿工ID: ${miner_id}</div><div>高度: ${height}</div><div>出块时间: ${block_time}</div><div style='word-wrap: break-word;width:280px;'>区块哈希: ${cid}</div><div>选票数量: ${tick_count}</div></div>";
    },
    mounted() {
      myChart = echarts.init(document.getElementById('blockChart'));
      window.addEventListener("resize", myChart.resize);
      this.getChartData();
    },
    methods: {
      reload() {
        this.getChartData();
      },
      async getChartData() {
        const end_time = Math.floor(new Date().getTime() / 1000);
        let res = await this.$http.get('/api/v1/info/block_won',{
          end_time,
          start_time: end_time - 1800
        });
        let series = [];
        let legendData = [];
        let maxBlockCount = 0;
        res.data.miner.forEach(({ miner, percent, ticket_percent }, index) => {
          let seriesItem = [];
          res.data.tipset.forEach(item => {
            const miners = item.tipset.map(tip => tip.miner_id);
            if (item.tipset.length > maxBlockCount) {
              maxBlockCount = item.tipset.length;
            }
            if (item.tipset.length === 0) {
              seriesItem.push({
                value: 0,
                height: item.height
              });
            } else {
              const block = item.tipset.filter(tip => tip.miner_id === miner)[0];
              seriesItem.push({
                value: miners.includes(miner) ? 1 : 0,
                height: item.height,
                block,
                miner,
                label: {
                  show:
                    miners.includes(miner) &&
                    block &&
                    block.tick_count > 1 &&
                    !this.isMobile,
                  fontSize: 12 * this.rate,
                  position: "inside",
                  formatter() {
                    return block.tick_count;
                  }
                }
              });
            }
          });
          let color;
          if (colors[index]) {
            color = colors[index].item;
          } else {
            color = getRandomColor();
          }
          series.push({
            type: "bar",
            data: seriesItem,
            name: miner,
            stack: "bar",
            barCategoryGap: "40%",
            barMaxWidth: 20,
            color
          });

          legendData.push({
            name: miner,
            color,
            percent: Number(percent).toFixed(2),
            tickPercent: Number(ticket_percent).toFixed(2)
          });
        });
        this.series = Object.freeze(series);
        this.legendData = Object.freeze(legendData);
        this.maxBlockCount = maxBlockCount;
        this.renderChart();
      },
      renderChart() {
        /*if (this.loading && typeof this.loading.close) {
            this.loading.close();
        }*/
        const vm = this;
        let xData = [];
        if (this.series.length > 0) {
          xData = this.series[0].data.map(item => item.height);
        }
        const series = this.series;
        const rate = this.rate;
        const selected = {};
        const legendData = this.legendData;
        const color = this.theme === "light" ? "black" : "white";
        const show = this.legendData.length === 0;
        const tooltipShow = !this.isMobile;
        let titleText = "chart.blocksWonTitle";
        const before = dayjs.utc().isBefore(dayjs.utc("2020-05-14 22:10"));
        if (before) {
          let currentLocale = localStorage.getItem('lang') || 'zh';
          titleText =
            currentLocale === "en"
              ? "Waiting For Filecoin Testnet Phase 2"
              : `敬请期待F`;
        }
        legendData.forEach(item => {
          if (!this.selectedKey) {
            selected[item.name] = true;
          } else {
            selected[item.name] = item.name === this.selectedKey;
          }
        });
        const option = {
          title: {
            text: "算力排行榜",
            left: "center"
          },
          tooltip: {
            trigger: "item",
            showContent: true ,
            position: [20,20],
            formatter(p) {
              const {
                miner_id,
                cid,
                block_time,
                height,
                tick_count
              } = p.data.block;
              return regExpTemplate(vm.regStr, {
                miner_id,
                cid: cid.replace(/(.{12}).*(.{12})$/, "$1...$2"),
                block_time: vm.getFormatTime(block_time),
                height,
                tick_count
              });
            },
            show: tooltipShow
          },
          xAxis: {
            type: "category",
            data: xData,
            axisLine: {
              show: false,
              lineStyle: {
                color
              },
              textStyle: {
                fontSize: 12 * rate
              }
            },
            inverse: true,
            axisTick: {
              show: false
            },
            axisLabel: {
              fontSize: 10 * this.rate,
              color: this.axisLabelColor
            }
          },
          yAxis: {
            type: "value",
            minInterval: 1,
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color
              }
            },
            axisLabel: {
              fontSize: 10 * this.rate,
              color: this.axisLabelColor
            }
          },
          grid: {
            left: 25 * rate,
            top: 50 * rate,
            bottom: 40 * rate,
            right: 25 * rate
          },
          legend: {
            legendData,
            show: false,
            selected
          },
          series: series
        };
        const nullOption = {
          title: {
            text: titleText,
            left: "center",
            top: "center",
            textStyle: {
              color
            },
            show
          }
        };
        if (this.isMobile) {
          option.grid = {
            top: 20 * rate,
            right: 40 * rate,
            left: 40 * rate,
            bottom: 30 * rate
          };
        }
        if (this.maxBlockCount < 3) {
          option.yAxis.max = this.maxBlockCount + 2;
        }
        myChart.setOption(show ? nullOption : option);
      },
      getFormatTime(time) {
        /*const formatStr = this.locale === 'en'
          ? "MMM Do YYYY HH:mm:ss (UTCZ)"
          : "YYYY-MM-DD HH:mm:ss (UTCZ)";*/
        /*const formatStr = "YYYY-MM-DD HH:mm:ss (UTCZ)";
        return dayjs(time * 1000).format(formatStr);*/
        if (!time) {
          return "";
        }
        return formatDate(time * 1000, "yyyy-MM-dd hh:mm:ss")
      }
    }
  }
</script>

<style lang="scss" scoped>
  #blockChart{
    height: 246px;
    text-align: left;
    flex: 1;
    background-color: #fff;
    padding-top: 16px;
  }
</style>