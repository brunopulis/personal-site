export const renderTransforms = (content, page, baseUrl) => {
  if (typeof content !== 'string') {
    return '';
  }
  return `<![CDATA[${content}]]>`;
};
