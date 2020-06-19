import ColorThief from 'colorthief';

const colorThief = new ColorThief();

export const fixName = (name) => name[0].toUpperCase() + name.slice(1);

export const getPaletteColors = (image) => {
    const colors = colorThief.getPalette(image);
    let rgbaColors = [];

    colors.forEach(i => {
        let rgba = `rgba(${i[0]}, ${i[1]}, ${i[2]}, 1)`;

        rgbaColors.push(rgba);
    })

    return rgbaColors;
}

export const getDominantColor = (image) => {
    const color = colorThief.getColor(image);
    let rgbaColor = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`;

    return rgbaColor;
}