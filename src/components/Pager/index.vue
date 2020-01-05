<template>
  <div class="pager" :class="{hide: hideIfOnePage && totalPage <= 1}">
    <span class="pager-nav prev" @click="onClickPage(currentPage - 1)" :class="{disabled: currentPage === 1}">
      <i class="pager-nav-icon iconfont icon-left"></i>
    </span>
    <template v-for="(page, index) in pages">
      <template v-if="page === currentPage">
        <span :key="index" class="pager-item current">{{page}}</span>
      </template>
      <template v-else-if="page === '...'">
        <i class="pager-separator iconfont icon-ellipsis" :key="index"></i>
      </template>
      <template v-else>
        <span :key="index" class="pager-item other" @click="onClickPage(page)">{{page}}</span>
      </template>
    </template>
    <span class="pager-nav next" @click="onClickPage(currentPage + 1)" :class="{disabled: currentPage === totalPage}">
      <i class="pager-nav-icon iconfont icon-right"></i>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Pager',
  props: {
    totalPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    },
    hideIfOnePage: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    pages () {
      let pages = [
        1,
        this.totalPage,
        this.currentPage,
        this.currentPage - 1,
        this.currentPage - 2,
        this.currentPage + 1,
        this.currentPage + 2
      ]
      let u = unique(pages.filter((n) => n >= 1 && n <= this.totalPage).sort((a, b) => a - b))
      let u2 = u.reduce((prev, current, index, array) => {
        prev.push(current)
        if (
          array[index + 1] !== undefined &&
          array[index + 1] - array[index] > 1
        ) {
          prev.push('...')
        }
        return prev
      }, [])
      return u2
    }
  },
  methods: {
    onClickPage (n) {
      if (n >= 1 && n <= this.totalPage) {
        this.$emit('update:currentPage', n)
      }
    }
  }
}

function unique (array) {
  // return [...new Set(array)]
  const object = []
  array.map(number => {
    object[number] = true
  })
  return Object.keys(object).map(s => parseInt(s, 10))
}
</script>

<style lang="scss" scoped>
.pager {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  user-select: none;
  &.hide {
    display: none;
  }
  .pager-separator {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    line-height: 26px;
    font-size: 20px;
    color: #4d4d4d;
    margin: 0 6px;
    cursor: default;
  }
  .pager-item {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background-color: #4d4d4d;
    border-radius: 2px;
    font-size: 12px;
    min-width: 20px;
    width: 20px;
    height: 26px;
    line-height: 26px;
    color: #fff;
    margin: 0 6px;
    cursor: pointer;
    &:hover {
      background-color: #5e5e5e
    }
    &.current {
      cursor: default;
      background-color: #88acdb;
    }
  }
  .pager-nav {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 28px;
    cursor: pointer;
    .pager-nav-icon {
      font-size: 20px;
      line-height: 26px;
      color: #4d4d4d;
    }
    &.disabled {
      cursor: default;
      .pager-nav-icon {
        color: darken(#eee, 20%);
      }
    }
  }
}
@media screen and (max-width: 800px) {
  .pager {
    .pager-nav {
      margin: 0 14px;
    }
  }
}
</style>
