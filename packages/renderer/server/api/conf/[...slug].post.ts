export default defineEventHandler((event) => {
  return {
    msg: `post${event.context.params?.slug}`,
  }
})
