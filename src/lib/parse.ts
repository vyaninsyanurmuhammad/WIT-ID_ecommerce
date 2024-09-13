export const parseImages = (images: string[]): string[] => {
  return images
    .map(
      (image) =>
        image
          .replace(/[\[\]\"\s]/g, "") // Remove brackets, quotes, and extra spaces
          .split(","), // Split by commas in case there are multiple URLs
    )
    .flat(); // Flatten the resulting array if it has nested arrays
};
