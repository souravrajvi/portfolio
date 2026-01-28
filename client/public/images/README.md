# Image Upload Folders

This folder structure is for storing images for your portfolio. Simply add your images here and reference them in the storage configuration.

## Folder Structure

- **books/** - Book cover images for your book recommendations
- **projects/** - Screenshots or thumbnails for your projects
- **music/** - Album artwork for music recommendations

## How to Use

1. Add your images to the appropriate folder:
   - Book cover: `books/on-the-road.jpg`
   - Project screenshot: `projects/netflix-gpt.jpg`
   - Music album: `music/album-name.jpg`

2. Update the image URL in `server/storage.ts`:
   ```typescript
   imageUrl: "/images/books/on-the-road.jpg"
   // or
   imageUrl: "/images/projects/netflix-gpt.jpg"
   ```

3. The images will automatically be served from the public folder

## Supported Formats

- JPG/JPEG
- PNG
- WebP
- GIF

## Image Guidelines

- **Book covers**: 300x400px (3:4 aspect ratio)
- **Project thumbnails**: 400x300px (4:3 aspect ratio)
- **Music albums**: 300x300px (1:1 aspect ratio)

## Example

After adding `client/public/images/books/on-the-road.jpg`, update storage.ts:

```typescript
{
  id: 1,
  title: "On the Road",
  author: "Jack Kerouac",
  genre: "Novel",
  note: "",
  imageUrl: "/images/books/on-the-road.jpg",  // <- Use this format
  order: 1,
}
```
