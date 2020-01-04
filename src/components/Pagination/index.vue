<template>
  <div class="pagination" :class="{hide: hideIfOnePage && totalPage <= 1}">
    <span class="gulu-pager-nav prev" @click="onClickPage(currentPage - 1)" :class="{disabled: currentPage === 1}">
      <!-- <g-icon name="left"></g-icon> -->
      &lt;
    </span>
    <template v-for="(page, index) in pages">
      <template v-if="page === currentPage">
        <span :key="index" class="gulu-pager-item current">{{page}}</span>
      </template>
      <template v-else-if="page === '...'">
        <!-- <g-icon name="dots" :key="index" class="gulu-pager-separator"></g-icon> -->
        ...
      </template>
      <template v-else>
        <span :key="index" class="gulu-pager-item other" @click="onClickPage(page)">{{page}}</span>
      </template>
    </template>
    <span class="gulu-pager-nav next" @click="onClickPage(currentPage + 1)" :class="{disabled: currentPage === totalPage}">
      <!-- <g-icon name="right"></g-icon> -->
      &gt;
    </span>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
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
.gulu-pager {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  $width: 20px;
  $height: 20px;
  $font-size: 12px;
  $border-radius: 4px;
  $grey: #eee;
  $blue: #4a90e2;
  user-select: none;
  &.hide {
    display: none;
  }
  &-separator {
    width: $width;
    font-size: $font-size;
    border: none;
    cursor: default;
  }
  &-item {
    border: 1px solid #e1e1e1;
    border-radius: $border-radius;
    padding: 0 4px;
    font-size: $font-size;
    min-width: $width;
    height: $height;
    margin: 0 4px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &.current, &:hover {
      border-color: $blue;
    }
    &.current {
      cursor: default;
    }
  }
  &-nav {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    background: $grey;
    height: $height;
    width: $width;
    border-radius: $border-radius;
    font-size: $font-size;
    margin: 0 4px;
    cursor: pointer;
    &.disabled {
      cursor: default;
      svg {
        fill: darken($grey, 30%);
      }
    }
  }
}
</style>
