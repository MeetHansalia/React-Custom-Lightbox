# ReactImageVideoLightbox

ReactImageVideoLightbox is a React component that displays a lightbox to view images and videos. It supports image , navigation, video autoplay, and thumbnail previews. This component is useful for creating a gallery or media viewer within your React application.

## Installation

To install the component, run the following command:

```sh
npm install react-image-video-lightbox
```

or

```sh
yarn add react-image-video-lightbox
```

## Dependencies

- React 16.8+ (for hooks support)

## Component Props

| Prop Name              | Type      | Default Value | Description                                                                                                                                                                 |
| ---------------------- | --------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `startIndex`           | number    | `0`           | The index of the first media item (image/video) to be displayed when the lightbox opens.                                                                                    |
| `data`                 | array     | `[]`          | An array of objects representing the media resources (images/videos). Each object should have a `type` ('photo' or 'video') and `url` (media URL), and optionally `altTag`. |
| `showResourceCount`    | boolean   | `false`       | If `true`, displays the current image/video index and total count (e.g., '1 / 5').                                                                                          |
| `onCloseCallback`      | function  | `null`        | Callback function to be called when the lightbox is closed.                                                                                                                 |
| `onNavigationCallback` | function  | `null`        | Callback function to be called when navigating (next/previous) between items.                                                                                               |
| `showThumbnails`       | boolean   | `false`       | If `true`, shows thumbnails of all media items for navigation.                                                                                                              |
| `enableAutoPlay`       | boolean   | `false`       | If `true`, automatically starts video playback when the video is displayed.                                                                                                 |
| `imageWidth`           | number    | `100%`        | Maximum width for image resources.                                                                                                                                          |
| `imageHeight`          | number    | `100%`        | Maximum height for image resources.                                                                                                                                         |
| `videoWidth`           | number    | `100%`        | Width of the video player.                                                                                                                                                  |
| `videoHeight`          | number    | `100%`        | Height of the video player.                                                                                                                                                 |
| `customCloseIcon`      | ReactNode | `null`        | Custom close icon to replace the default close button.                                                                                                                      |
| `customLeftArrowIcon`  | ReactNode | `null`        | Custom left arrow icon for navigation.                                                                                                                                      |
| `customRightArrowIcon` | ReactNode | `null`        | Custom right arrow icon for navigation.                                                                                                                                     |

## Example Usage

```jsx
import React from "react";
import ReactImageVideoLightbox from "react-image-video-lightbox";

const mediaData = [
  { type: "photo", url: "https://example.com/image1.jpg", altTag: "Image 1" },
  { type: "video", url: "https://example.com/video1.mp4" },
  { type: "photo", url: "https://example.com/image2.jpg", altTag: "Image 2" },
];

const YourComponent = () => {
  const handleClose = () => {
    console.log("Lightbox closed");
  };

  const handleNavigation = (index) => {
    console.log(`Navigated to item at index ${index}`);
  };

  return (
    <ReactImageVideoLightbox
      startIndex={0}
      data={mediaData}
      showResourceCount={true}
      onCloseCallback={handleClose}
      onNavigationCallback={handleNavigation}
      showThumbnails={true}
      enableAutoPlay={true}
      imageWidth={800}
      imageHeight={600}
      videoWidth={800}
      videoHeight={450}
      customCloseIcon={<svg>...</svg>} // Optional custom close icon
      customLeftArrowIcon={<svg>...</svg>} // Optional custom left arrow icon
      customRightArrowIcon={<svg>...</svg>} // Optional custom right arrow icon
    />
  );
};

export default YourComponent;
```

## Features

- **Image and Video Display**: Displays images and videos based on the `data` prop.
- **Navigation**: Users can navigate through media items using left and right arrows.
- **Thumbnails**: Optionally shows a scrollable row of thumbnails.
- **Loading Spinner**: A spinner is shown while the media is loading.
- **Escape Key Close**: Pressing the Escape key closes the lightbox.
- **AutoPlay**: Videos can be auto-played by setting `enableAutoPlay` to `true`.

## Notes

- Ensure the `data` array contains at least one media item of type `'photo'` or `'video'`.
- The `video` elements respect the autoPlay behavior based on the `enableAutoPlay` prop.
- Thumbnails are optional and can be toggled with the `showThumbnails` prop.
- The `onNavigationCallback` is called every time the user navigates to a different media item.

## License

MIT License. See `LICENSE` file for details.
