// src/dummyData.ts
export const dummyData = Array.from({length: 100}, (_, index) => ({
    id: index + 1,
    message: `Message ${index + 1}`,
    timestamp: new Date().toISOString(),
}));