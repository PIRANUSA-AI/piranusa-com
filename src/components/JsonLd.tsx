export function JsonLd({ data }: { data: object }) {
  // Escape `<` so a value containing `</script>` cannot break out of the tag.
  // JSON.stringify does not escape `<`/`>`, so this is required to prevent XSS.
  const json = JSON.stringify(data).replace(/</g, '\\u003c')

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
}
