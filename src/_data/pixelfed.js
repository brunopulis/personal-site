import EleventyFetch from '@11ty/eleventy-fetch';

export default async function () {
  try {
    const username = 'brunopulis';
    const instance = 'brunopulis.com';

    const account = await EleventyFetch(
      `https://${instance}/api/v1/accounts/lookup?acct=${username}`,
      { duration: '1d', type: 'json' }
    );

    const posts = await EleventyFetch(
      `https://${instance}/api/v1/accounts/${account.id}/statuses?only_media=true&limit=12`,
      { duration: '1d', type: 'json' }
    );

    const allPhotos = [];
    posts.forEach(post => {
      post.media_attachments
        .filter(m => m.type === 'image')
        .forEach(m => {
          allPhotos.push({
            postUrl: post.url,
            preview: m.preview_url,
            url: m.url,
            alt: m.description || '',
            width: m.meta?.original?.width || null,
            height: m.meta?.original?.height || null,
          });
        });
    });

    return allPhotos;
  } catch (error) {
    console.warn('[pixelfed] Erro ao buscar fotos:', error.message);
    return [];
  }
}
