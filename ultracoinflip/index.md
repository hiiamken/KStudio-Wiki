---
layout: page
---

<script setup>
import { onMounted } from 'vue'
import { useRouter, withBase } from 'vitepress'

onMounted(() => {
  const router = useRouter()
  router.go(withBase('/ultracoinflip/guide/getting-started'))
})
</script>
