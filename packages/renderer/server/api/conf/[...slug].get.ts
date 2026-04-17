export default defineEventHandler((event) => {
  return {
    msg: `get${event.context.params?.slug}`,
  }
})
