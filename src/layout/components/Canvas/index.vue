<template>
  <canvas ref="canvas" class="app-canvas" :class="{show: toolbar.opened}"></canvas>
</template>

<script>
import {
  mapState
} from 'vuex'

class Circle {
  constructor (width, height) {
    this.initCircle(width, height)
  }

  initCircle (width, height) {
    this.pos = {}
    this.pos.x = Math.random() * width
    this.pos.y = height + Math.random() * 100
    this.alpha = 0.1 + Math.random() * 0.3
    this.scale = 0.1 + Math.random() * 0.3
    this.velocity = Math.random()
  }

  drawCircle (ctx, width, height) {
    if (this.alpha <= 0) {
      this.initCircle(width, height)
    }
    this.pos.y -= this.velocity
    this.alpha -= 0.0005
    ctx.beginPath()
    ctx.arc(this.pos.x, this.pos.y, this.scale * 10, 0, 2 * Math.PI, false)
    ctx.fillStyle = 'rgba(255,255,255,' + this.alpha + ')'
    ctx.fill()
  }
}

export default {
  name: 'AppCanvas',
  computed: {
    ...mapState({
      toolbar: state => state.app.toolbar
    })
  },
  data () {
    return {
      width: 0,
      height: 0,
      canvas: null,
      ctx: null,
      circles: [],
      isDrawCircles: true
    }
  },
  methods: {
    initCanvas () {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.canvas = this.$refs.canvas
      this.canvas.width = this.width
      this.canvas.height = this.height
      this.ctx = this.canvas.getContext('2d')
    },
    initCircles () {
      for (var x = 0; x < this.width * 0.5; x++) {
        this.circles.push(new Circle(this.width, this.height))
      }
    },
    initAnimate () {
      if (this.isDrawCircles) {
        this.ctx.clearRect(0, 0, this.width, this.height)
        for (var i in this.circles) {
          this.circles[i].drawCircle(this.ctx, this.width, this.height)
        }
      }
      requestAnimationFrame(this.initAnimate)
    },
    scrollCheck () {
      if (document.body.scrollTop > this.height) {
        this.isDrawCircles = false
      } else {
        this.isDrawCircles = true
      }
    },
    resize () {
      this.width = window.innerWidth
      this.height = window.innerHeight
      this.canvas.width = this.width
      this.canvas.height = this.height
    }
  },
  mounted () {
    this.initCanvas()
    this.initCircles()
    this.initAnimate()
    // window.addEventListener('scroll', this.scrollCheck)
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    // window.removeEventListener('scroll', this.scrollCheck)
    window.removeEventListener('resize', this.resize)
  }
}
</script>

<style lang="scss" scoped>
.app-canvas {
  display: none;
  &.show {
    display: block;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
}
</style>
