import React, { useCallback, useEffect } from 'react';
import { Image, ImageProps, ImageSourcePropType } from 'react-native';

import shortHash from 'shorthash2';

import * as FileSystem from 'expo-file-system';

interface FastImageProps extends Omit<ImageProps, 'source' | 'src'> {
	uri: string;
}

const FastImage: React.FC<FastImageProps> = ({ uri, ...rest }) => {
	const [image, setImage] = React.useState<ImageSourcePropType>(
		require('@/assets/images/dummy.png')
	);

	const loadImage = useCallback(async () => {
		const name = shortHash(uri);

		const path = `${FileSystem.cacheDirectory}${name}`;
		const image = await FileSystem.getInfoAsync(path);

		if (!image.exists) {
			try {
				const newImage = await FileSystem.downloadAsync(uri, path);

				if (newImage.status === 200) {
					setImage({ uri: newImage.uri });
				}
			} catch (error) {
				console.log(error);
			}
		} else {
			setImage({ uri: image.uri });
		}
	}, [uri]);

	useEffect(() => {
		loadImage();
	}, [uri]);

	return <Image source={image} {...rest} />;
};

export default FastImage;
