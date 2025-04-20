import { urlFor } from './sanityClient';

interface SanityImageAsset {
  _ref?: string;
  _id?: string;
  url?: string;
}

interface SanityImage {
  asset: SanityImageAsset;
  _type?: string;
}

export const getImageUrl = (image: SanityImage | null | undefined): string => {
  try {
    if (!image) return '/placeholder-property.jpg';
    
    // If the asset has a direct URL, use it
    if (image.asset?.url) {
      return image.asset.url;
    }
    
    // Otherwise, use urlFor to generate the URL
    if (image.asset?._ref || image.asset?._id) {
      return urlFor(image);
    }

    return '/placeholder-property.jpg';
  } catch (error) {
    console.error('Error generating image URL:', error);
    return '/placeholder-property.jpg';
  }
};

export const getThumbnailUrl = (image: SanityImage | null | undefined): string => {
  try {
    if (!image) return '/placeholder-property.jpg';
    
    // If the asset has a direct URL, modify it for thumbnail
    if (image.asset?.url) {
      return image.asset.url + '?w=200&h=200&fit=crop&q=60';
    }
    
    // Otherwise, use urlFor to generate the thumbnail URL
    if (image.asset?._ref || image.asset?._id) {
      return urlFor(image)
        .width(200)
        .height(200)
        .fit('crop')
        .quality(60)
        .url();
    }

    return '/placeholder-property.jpg';
  } catch (error) {
    console.error('Error generating thumbnail URL:', error);
    return '/placeholder-property.jpg';
  }
}; 