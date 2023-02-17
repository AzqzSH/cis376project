import { FontAwesome } from '@expo/vector-icons';
import React, { ComponentProps } from 'react';
import { Icon as IconType } from '@expo/vector-icons/build/createIconSet';

interface IconProps<
	I extends IconType<any, any>,
	N extends keyof I['glyphMap']
> {
	as: I;
	name: N;
}

export default function Icon<
	I extends IconType<any, any>,
	N extends keyof I['glyphMap']
>({
	as,
	name,
	...props
}: IconProps<I, N> & Omit<ComponentProps<typeof FontAwesome>, 'name'>) {
	const Component = as as any;

	return <Component name={name} {...props} />;
}
