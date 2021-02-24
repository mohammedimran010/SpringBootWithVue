<template>
     <div class="alert alert-danger" role="alert" v-if="hasError">
         Something went wrong :-(
      </div>
</template>
<script>
export default {
  props: ["hasError"]
}
</script>