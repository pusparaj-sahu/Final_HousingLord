import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
  dataset: import.meta.env.VITE_SANITY_DATASET,
  apiVersion: '2024-03-19',
  useCdn: true,
  token: import.meta.env.VITE_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);

export const createInterest = async (userId: string, propertyId: string) => {
  try {
    const interest = await client.create({
      _type: 'interest',
      user: {
        _type: 'reference',
        _ref: userId,
      },
      property: {
        _type: 'reference',
        _ref: propertyId,
      },
      status: 'pending',
    });

    // Update the property's interests array
    await client
      .patch(propertyId)
      .setIfMissing({ interests: [] })
      .insert('after', 'interests[-1]', [{
        _type: 'reference',
        _ref: interest._id,
      }])
      .commit();

    // Update the user's interests array
    await client
      .patch(userId)
      .setIfMissing({ interests: [] })
      .insert('after', 'interests[-1]', [{
        _type: 'reference',
        _ref: interest._id,
      }])
      .commit();

    // Notify backend to send email
    try {
      await fetch('/api/notify-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId, userId }),
      });
    } catch (notifyError) {
      console.error('Failed to notify backend for email:', notifyError);
    }

    return interest;
  } catch (error) {
    console.error('Error creating interest:', error);
    throw error;
  }
};

export const checkExistingInterest = async (userId: string, propertyId: string) => {
  const query = `*[_type == "interest" && user._ref == $userId && property._ref == $propertyId][0]`;
  return await client.fetch(query, { userId, propertyId });
};

export const getPropertyInterests = async (propertyId: string) => {
  const query = `*[_type == "interest" && property._ref == $propertyId]{
    _id,
    status,
    createdAt,
    user->{
      _id,
      name,
      email,
      phone,
      profileImage
    }
  }`;
  return await client.fetch(query, { propertyId });
}; 