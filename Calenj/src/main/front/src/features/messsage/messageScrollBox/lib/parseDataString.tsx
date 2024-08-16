export const parseDataString = (str: string) => {

    const regex = /\[\[(.*?)\],\[(.*?)\]\]/g;
    let match;
    const result: GridData[] = [];

    while ((match = regex.exec(str)) !== null) {
        const id = match[1].replace(/[\[\]]/g, '');  // 대괄호 제거
        const filename = match[2].replace(/[\[\]]/g, '');  // 대괄호 제거
        const extension = filename.substring(filename.lastIndexOf('.') + 1) === "jpg" ? "jpeg" : filename.substring(filename.lastIndexOf('.') + 1);

        result.push({
            id: id,
            filename: filename,
            extension: extension,
        });
    }
    return result;
};
