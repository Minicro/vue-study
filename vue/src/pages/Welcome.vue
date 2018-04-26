<template>
      <Carousel autoplay v-model="value2" loop>
          <CarouselItem>
              <div class="demo-carousel">頑張れ</div>
          </CarouselItem>
          <CarouselItem>
              <div class="demo-carousel">頑張れ</div>
          </CarouselItem>
          <CarouselItem>
              <div class="demo-carousel">love　you!</div>
          </CarouselItem>
          <CarouselItem>
              <div class="demo-carousel">*^_^*~~~~</div>
          </CarouselItem>
      </Carousel>
</template>

<script>
export default {
  data() {
    return {
      value2: 0
    };
  },
  methods: {
  }
};
</script>

<style>
.ivu-table .demo-table-info-row td {
  background-color: #2db7f5;
  color: #fff;
}
.ivu-table .demo-table-error-row td {
  background-color: #ff6600;
  color: #fff;
}
.demo-carousel {
text-align:center;
height: 200px;
line-height: 200px;
font-size: 20px;

}
</style>
