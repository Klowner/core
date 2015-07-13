'use strict';

import IJ from '../../ij';

import percentile from './percentile';


/*
Creation of binary mask is based on the determination of a threshold
You may either choose among the provided algorithm or just specify a threshold value
If the algorithm is a number, it is the threshold value
 */


export default function mask(algorithm = 127, {
        useAlpha = true
    } = {}) {
    this.checkProcessable('mask', {
        components: 1,
        bitDepth: [8]
    });

    let threshold=0;

    if (! isNaN(algorithm)) {
        threshold=algorithm<<0;
    } else {
        let histogram=this.getHistogram();
        switch (algorithm.toLowerCase()) {
            case 'percentile':
                threshold=percentile(histogram);
                break;
            default:
                throw new Error('mask transform unknown algorithm: '+algorithm);
        }
    }

    let newImage = IJ.createFrom(this, {
            kind: 'BINARY'
        }
    );

    var ptr=0;
    if (this.alpha && useAlpha) {
        for (let i = 0; i < this.data.length; i += this.channels) {
            if ((this.data[i]*this.data[i+1]/this.maxValue)>=threshold) {
                newImage.setBit(ptr++);
            }
        }
    } else {
        for (let i = 0; i < this.data.length; i += this.channels) {
            if (this.data[i]>=threshold) {
                newImage.setBit(ptr++);
            }
        }
    }

    return newImage;
}
