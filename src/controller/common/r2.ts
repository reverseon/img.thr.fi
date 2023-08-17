
const getRandomAvailableKey = async (bucket: R2Bucket, filename: string) => {
    const MAX_CHAR = 40;
    let namewithoutext = filename.split('.')[0];
    if (namewithoutext.length === 0) {
        namewithoutext = 'image';
    }
    if (namewithoutext.length > MAX_CHAR) {
        namewithoutext = namewithoutext.slice(0, MAX_CHAR);
    }
    // convert space and other special characters to '-'
    namewithoutext = namewithoutext.replace(/[^a-zA-Z0-9]/g, '-');
    const ext = filename.split('.')[1];
    let unixtime = Math.floor(Date.now() / 1000);
    let key = namewithoutext + '-' + unixtime + '.' + ext;
    while (await bucket.get(key)) {
        unixtime++;
        key = namewithoutext + '-' + unixtime + '.' + ext;
    }
    return key;
}

const contentTypeMapping: (ext: string) => string = (ext) => {
    switch (ext) {
        case 'pjp':
        case 'pjpeg':
        case 'jpg':
        case 'jpeg':
        case 'jfif':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        case 'gif':
            return 'image/gif';
    }
    return 'application/octet-stream';
}

export {
    getRandomAvailableKey,
    contentTypeMapping
}