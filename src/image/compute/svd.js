import {DC} from 'ml-matrix';

/**
 * TODO would be suprised if this stuff works
 * @memberof Image
 * @instance
 */


export default function getSVD() {
    this.checkProcessable('getSVD', {
        bitDepth: [1]
    });

    return DC.SVD(this.points);
}
