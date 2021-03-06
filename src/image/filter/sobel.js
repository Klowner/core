import Image from '../image';
import convolution from '../operator/convolution';
import {GRADIENT_X, GRADIENT_Y} from '../../util/kernels';

/**
 * @memberof Image
 * @instance
 * @returns {Image}
 */

export default function sobelFilter(options = {}) {
	let {
		kernelX = GRADIENT_X,
		kernelY = GRADIENT_Y,
		border = 'copy',
		channels
	} = options;

	this.checkProcessable('sobelFilter', {
		bitDepth: [8, 16]
	});

	let gX = convolution.call(this, kernelX, {
		channels: channels,
		border: border,
		bitDepth: 32
	});

	let gY = convolution.call(this, kernelY, {
		channels: channels,
		border: border,
		bitDepth: 32
	});

	return gX.hypotenuse(gY, {bitDepth: this.bitDepth, channels: channels});
}
